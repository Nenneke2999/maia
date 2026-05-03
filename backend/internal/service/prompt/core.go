package prompt

import (
	"context"
	"crypto/sha1"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net"
	"time"

	"github.com/google/uuid"

	"coffeeface/cmd/config"
	"coffeeface/internal/model"
	"coffeeface/internal/storage"
	"coffeeface/pb"
	"coffeeface/pkg/logger"
)

type Service interface {
	CreateSession(ctx context.Context, request *CreateSessionRequest) (*model.Session, error)
	GetSession(ctx context.Context, session *model.Session) ([]byte, error)

	CreatePrompt(ctx context.Context, request *CreatePromptRequest) (string, error)

	GetUser(ctx context.Context, userData *model.UserData) (*model.User, error)
}

type ServiceImpl struct {
	Logger        *logger.Logger
	Storage       storage.Storage
	ObjectStorage storage.ObjectStorage

	Model    config.ModelConfig
	PyClient pb.PromptServiceClient
}

type CreateSessionRequest struct {
	UserIP *net.IP
}

func (s *ServiceImpl) CreateSession(ctx context.Context, request *CreateSessionRequest) (*model.Session, error) {
	session, err := generateSession(request.UserIP)
	if err != nil {
		return nil, fmt.Errorf("generate session: %w", err)
	}

	err = s.Storage.CreateSession(ctx, &storage.CreateSessionRequest{
		ID:     session.ID,
		UserID: session.UserID,
	})
	if err != nil {
		return nil, fmt.Errorf("save session: %w", err)
	}

	return session, nil
}

func (s *ServiceImpl) GetSession(ctx context.Context, session *model.Session) ([]byte, error) {
	sessions, err := s.Storage.GetSessions(ctx, &storage.GetSessionRequest{
		SessionID: session.ID,
		UserID:    session.UserID,
	})
	if err != nil || len(sessions) != 1 {
		return nil, fmt.Errorf("validate session (count sessions: %d, sessionID: %s, userID: %s): %w", len(sessions), session.ID, session.UserID, err)
	}

	S3URLs, err := s.Storage.GetS3URLs(ctx, session)
	if err != nil || len(sessions) != 1 {
		return nil, fmt.Errorf("get s3 urls: %w", err)
	}

	prompts, err := s.ObjectStorage.GetPrompts(ctx, S3URLs)
	if err != nil {
		return nil, fmt.Errorf("get prompts: %w", err)
	}

	return prompts, nil
}

type CreatePromptRequest struct {
	UserID     string
	SessionID  string
	Text       string
	IsInternal bool
}

func (s *ServiceImpl) CreatePrompt(ctx context.Context, request *CreatePromptRequest) (string, error) {
	sessions, err := s.Storage.GetSessions(ctx, &storage.GetSessionRequest{
		SessionID: request.SessionID,
		UserID:    request.UserID,
	})
	if err != nil || len(sessions) != 1 {
		return "", fmt.Errorf("validate session (sessionID: %s, userID: %s): %w", request.SessionID, request.UserID, err)
	}

	result, err := s.generatePrompt(ctx, request.Text, request.IsInternal)
	if err != nil {
		return "", fmt.Errorf("generate prompt: %w", err)
	}

	resultJSON, err := resultToJSON(request.Text, result)
	if err != nil {
		return "", fmt.Errorf("convert result to json: %w", err)
	}

	now := fmt.Sprintf("%d", time.Now().Unix())
	err = s.ObjectStorage.SavePrompt(ctx, &storage.SavePromptRequest{
		SessionID: request.SessionID,
		Body:      resultJSON,
		CreatedAt: now,
	})
	if err != nil {
		return "", fmt.Errorf("save result in object storage: %w", err)
	}

	err = s.Storage.SaveS3URL(ctx, &storage.SaveS3URLRequest{
		SessionID: request.SessionID,
		Bucket:    s.ObjectStorage.GetBucket(),
		CreatedAt: now,
	})
	if err != nil {
		return "", fmt.Errorf("save result in storage: %w", err)
	}

	return result, nil
}

func (s *ServiceImpl) GetUser(ctx context.Context, userData *model.UserData) (*model.User, error) {
	return s.Storage.GetUser(ctx, userData)
}

func (s *ServiceImpl) generatePrompt(ctx context.Context, text string, isInternal bool) (string, error) {
	if isInternal {
		response, err := s.PyClient.GetPrompt(ctx, &pb.GetPromptRequest{
			Text: text,
		})
		if err != nil {
			return "", err
		}

		return response.Prompt, nil
	}

	correctedPrompt, err := s.PyClient.CorrectInternalPrompt(ctx, &pb.CorrectInternalPromptRequest{
		InternalPrompt: text,
		ModelNumber:    1,
	})

	return correctedPrompt.Prompt, err
}

func resultToJSON(request, response string) ([]byte, error) {
	j := map[string]string{
		"request":  request,
		"response": response,
	}
	return json.Marshal(j)
}

func generateSession(ip *net.IP) (*model.Session, error) {
	h := sha1.New()
	h.Write(*ip)
	userID := base64.URLEncoding.EncodeToString(h.Sum(nil))
	sessionID, err := uuid.NewUUID()
	if err != nil {
		return nil, fmt.Errorf("create new session id: %w", err)
	}

	return &model.Session{
		ID:     sessionID.String(),
		UserID: userID,
	}, nil
}
