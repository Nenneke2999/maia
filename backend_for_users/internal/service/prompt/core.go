package prompt

import (
	"context"
	"crypto/sha1"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net"

	"github.com/google/uuid"

	"coffeeface/internal/model"
	"coffeeface/pb"
	"coffeeface/pkg/logger"
)

type Service interface {
	CreateSession(ctx context.Context, request *CreateSessionRequest) (*model.Session, error)

	CreatePrompt(ctx context.Context, request *CreatePromptRequest) (string, error)
}

type ServiceImpl struct {
	Logger  *logger.Logger
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

	return session, nil
}

type CreatePromptRequest struct {
	UserID    string
	SessionID string
	Text      string
}

func (s *ServiceImpl) CreatePrompt(ctx context.Context, request *CreatePromptRequest) (string, error) {
	result, err := s.generatePrompt(ctx, request.Text)
	if err != nil {
		return "", fmt.Errorf("generate prompt: %w", err)
	}

	return result, nil
}

func (s *ServiceImpl) generatePrompt(ctx context.Context, text string) (string, error) {
	response, err := s.PyClient.GetPrompt(ctx, &pb.GetPromptRequest{
		Text: text,
	})
	if err != nil {
		return "", err
	}

	return response.Prompt, nil
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
