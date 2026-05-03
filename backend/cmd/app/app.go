package app

import (
	"context"
	"fmt"
	"net/http"

	"google.golang.org/grpc"

	"coffeeface/cmd/config"
	"coffeeface/internal/service/prompt"
	"coffeeface/internal/storage/postgres"
	"coffeeface/internal/storage/s3"
	"coffeeface/pb"
	"coffeeface/pkg/logger"
	"coffeeface/pkg/server"
)

func Run(cfg *config.Config) error {
	ctx := context.Background()
	l := logger.NewLogger(cfg.Logger.Level)

	grpcPy, err := grpc.Dial(
		fmt.Sprintf("%s:%d", cfg.Model.Host, cfg.Model.Port),
		grpc.WithInsecure(),
		grpc.WithBlock(),
	)
	if err != nil {
		return fmt.Errorf("connect to python server on %s:%d: %w", cfg.Model.Host, cfg.Model.Port, err)
	}
	defer grpcPy.Close()

	pyClient := pb.NewPromptServiceClient(grpcPy)

	storage, err := postgres.NewStorage(ctx, cfg.Database)
	if err != nil {
		return fmt.Errorf("new storage: %w", err)
	}
	defer func() {
		storage.Close()
		l.Info(fmt.Sprintf("close connection to '%s' database on port %d", cfg.Database.Name, cfg.Database.Port))
	}()
	l.Info(fmt.Sprintf("connect to '%s' database on port %d", cfg.Database.Name, cfg.Database.Port))

	objectStorage, err := s3.NewObjectStorage(ctx, cfg.ObjectStorage)
	if err != nil {
		return fmt.Errorf("new object storage: %w", err)
	}
	l.Info(fmt.Sprintf("connect to s3 object storage"))

	s, err := server.NewHTTPServer(l, &prompt.ServiceImpl{
		Logger:        l,
		Storage:       storage,
		ObjectStorage: objectStorage,

		PyClient: pyClient,
	})
	if err != nil {
		return fmt.Errorf("new http server: %w", err)
	}
	err = http.ListenAndServe(fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port), s.Router())
	if err != nil {
		return fmt.Errorf("listen and serve http server: %w", err)
	}

	return nil
}
