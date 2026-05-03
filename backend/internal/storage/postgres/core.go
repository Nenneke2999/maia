package postgres

import (
	"context"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5/pgxpool"

	"coffeeface/cmd/config"
	"coffeeface/internal/model"
	"coffeeface/internal/storage"
)

type Storage struct {
	storage *pgxpool.Pool
}

func NewStorage(ctx context.Context, config config.DatabaseConfig) (*Storage, error) {
	conn, err := pgxpool.New(
		ctx,
		fmt.Sprintf("postgres://%s:%s@%s:%d/%s",
			config.User, config.Password, config.Host, config.Port, config.Name),
	)
	if err != nil {
		return nil, fmt.Errorf("connect to database: %w", err)
	}

	return &Storage{storage: conn}, nil
}

func (s *Storage) CreateSession(ctx context.Context, request *storage.CreateSessionRequest) error {
	sql, args := sq.Insert(userTable).
		Columns(userTableFields...).
		Values(request.UserID, request.ID).
		PlaceholderFormat(sq.Dollar).
		MustSql()

	_, err := s.storage.Exec(ctx, sql, args...)
	if err != nil {
		return fmt.Errorf("create session: %w", err)
	}

	return nil
}

func (s *Storage) GetSessions(ctx context.Context, request *storage.GetSessionRequest) ([]*model.Session, error) {
	sql, args := sq.Select(userTableFields...).
		From(userTable).
		Where(sq.And{
			sq.Eq{tableField(userTable, fieldID): request.UserID},
			sq.Eq{tableField(userTable, fieldSessionID): request.SessionID},
		},
		).PlaceholderFormat(sq.Dollar).
		MustSql()

	rows, err := s.storage.Query(ctx, sql, args...)
	if err != nil {
		return nil, fmt.Errorf("select session: %w", err)
	}
	defer rows.Close()

	var sessions []*model.Session
	for rows.Next() {
		var session model.Session
		err = rows.Scan(&session.ID, &session.UserID)
		if err != nil {
			return nil, fmt.Errorf("scan rows: %w", err)
		}
		sessions = append(sessions, &session)
	}

	return sessions, nil
}

func (s *Storage) SaveS3URL(ctx context.Context, request *storage.SaveS3URLRequest) error {
	sql, args := sq.Insert(chatTable).
		Columns(chatTableFields...).
		Values(
			request.SessionID,
			generateS3URL(request.Bucket, request.SessionID, request.CreatedAt),
			request.CreatedAt).
		PlaceholderFormat(sq.Dollar).
		MustSql()

	_, err := s.storage.Exec(ctx, sql, args...)
	if err != nil {
		return fmt.Errorf("create session: %w", err)
	}

	return nil
}

func (s *Storage) GetS3URLs(ctx context.Context, session *model.Session) ([]string, error) {
	sql, args := sq.Select(fieldS3URL).
		From(chatTable).
		Where(sq.Eq{fieldSessionID: session.ID}).
		PlaceholderFormat(sq.Dollar).
		MustSql()

	rows, err := s.storage.Query(ctx, sql, args...)
	if err != nil {
		return nil, fmt.Errorf("get s3 urls: %w", err)
	}
	defer rows.Close()

	var s3URLs []string
	for rows.Next() {
		var s3URL string
		err = rows.Scan(&s3URL)
		if err != nil {
			return nil, fmt.Errorf("scan rows: %w", err)
		}
		s3URLs = append(s3URLs, s3URL)
	}

	return s3URLs, nil
}

func (s *Storage) GetUser(ctx context.Context, userData *model.UserData) (*model.User, error) {
	sql, args := sq.Select(fieldFullName, fieldSex, fieldBirth,
		fieldProfession, fieldSalary, fieldKids).
		From(customersTable).
		Where(sq.Eq{fieldSNILS: fmt.Sprint(userData.ClientSNILS)}).
		PlaceholderFormat(sq.Dollar).
		MustSql()

	rows, err := s.storage.Query(ctx, sql, args...)
	if err != nil {
		return nil, fmt.Errorf("get user: %w", err)
	}
	defer rows.Close()

	var users []*model.User
	for rows.Next() {
		var user model.User
		err = rows.Scan(&user.FullName, &user.Sex, &user.Birth, &user.Profession, &user.Salary, &user.Kids)
		if err != nil {
			return nil, fmt.Errorf("scan rows: %w", err)
		}
		users = append(users, &user)
	}
	if len(users) != 1 {
		return nil, fmt.Errorf("incorrect users count: expected 1, actual: %d", len(users))
	}

	return users[0], nil
}

func (s *Storage) Close() {
	s.storage.Close()
}

// https://storage.yandexcloud.net/<имя_бакета>/<ключ_объекта>
func generateS3URL(bucket, folder, key string) string {
	return "https://storage.yandexcloud.net/" + bucket + "/" + folder + "/" + key + ".json"
}
