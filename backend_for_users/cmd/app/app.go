package app

import (
	"fmt"
	"net/http"

	"google.golang.org/grpc"

	"coffeeface/cmd/config"
	"coffeeface/internal/service/prompt"
	"coffeeface/pb"
	"coffeeface/pkg/logger"
	"coffeeface/pkg/server"
)

func Run(cfg *config.Config) error {
	l := logger.NewLogger(cfg.Logger.Level)

	grpcPy, err := grpc.Dial(
		fmt.Sprintf("%s:%d", "localhost", 6767),
		grpc.WithInsecure(),
		grpc.WithBlock(),
	)
	if err != nil {
		return fmt.Errorf("connect to python server: %w", err)
	}
	defer grpcPy.Close()

	pyClient := pb.NewPromptServiceClient(grpcPy)

	l.Info("connect to grpc python server")

	s, err := server.NewHTTPServer(l, &prompt.ServiceImpl{
		Logger:   l,
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
