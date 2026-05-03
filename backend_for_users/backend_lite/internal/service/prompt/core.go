package prompt

import (
	"context"
	"crypto/sha1"
	"encoding/base64"
	"fmt"
	"net"

	"github.com/google/uuid"

	"coffeeface/internal/model"
	"coffeeface/pkg/logger"
)

type Service interface {
	CreateSession(ctx context.Context, request *CreateSessionRequest) (*model.Session, error)
	GetSession(ctx context.Context, session *model.Session) ([]map[string]string, error)

	CreatePrompt(ctx context.Context, request *CreatePromptRequest) (string, error)
}

type ServiceImpl struct {
	Logger       *logger.Logger
	LocalStorage map[string][]map[string]string
}

type CreateSessionRequest struct {
	UserIP *net.IP
}

func (s *ServiceImpl) CreateSession(ctx context.Context, request *CreateSessionRequest) (*model.Session, error) {
	session, err := generateSession(request.UserIP)
	if err != nil {
		return nil, fmt.Errorf("generate session: %w", err)
	}

	if err != nil {
		return nil, fmt.Errorf("save session: %w", err)
	}

	s.LocalStorage[session.ID+session.UserID] = []map[string]string{}

	return session, nil
}

func (s *ServiceImpl) GetSession(ctx context.Context, session *model.Session) ([]map[string]string, error) {
	return s.LocalStorage[session.ID+session.UserID], nil
}

type CreatePromptRequest struct {
	UserID    string
	SessionID string
	Text      string
}

func (s *ServiceImpl) CreatePrompt(ctx context.Context, request *CreatePromptRequest) (string, error) {
	s.LocalStorage[request.SessionID+request.UserID] = append(s.LocalStorage[request.SessionID+request.UserID],
		map[string]string{
			"input":  request.Text,
			"output": "Hi, i`m output",
		})

	return "Hi, i`m output", nil
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
