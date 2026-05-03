package storage

import (
	"context"

	"coffeeface/internal/model"
)

type Storage interface {
	CreateSession(ctx context.Context, request *CreateSessionRequest) error
	GetSessions(ctx context.Context, request *GetSessionRequest) ([]*model.Session, error)

	SaveS3URL(ctx context.Context, request *SaveS3URLRequest) error
	GetS3URLs(ctx context.Context, session *model.Session) ([]string, error)

	GetUser(ctx context.Context, userData *model.UserData) (*model.User, error)
}

type ObjectStorage interface {
	GetBucket() string

	SavePrompt(ctx context.Context, request *SavePromptRequest) error
	GetPrompts(ctx context.Context, s3URLs []string) ([]byte, error)
}

type CreateSessionRequest struct {
	ID     string
	UserID string
}

type GetSessionRequest struct {
	SessionID string
	UserID    string
}

type SaveS3URLRequest struct {
	SessionID string
	Bucket    string
	CreatedAt string
}

type SavePromptRequest struct {
	SessionID string
	Body      []byte
	CreatedAt string
}
