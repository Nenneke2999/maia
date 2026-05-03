package app

import (
	"fmt"
	"net/http"

	"coffeeface/cmd/config"
	"coffeeface/internal/service/prompt"
	"coffeeface/pkg/logger"
	"coffeeface/pkg/server"
)

func Run(cfg *config.Config) error {
	l := logger.NewLogger(cfg.Logger.Level)

	s, err := server.NewHTTPServer(l, &prompt.ServiceImpl{
		Logger:       l,
		LocalStorage: make(map[string][]map[string]string),
	})
	if err != nil {
		return fmt.Errorf("new http server: %w", err)
	}

	l.Info("Server starting on " + fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port))
	err = http.ListenAndServe(fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port), s.Router())
	if err != nil {
		return fmt.Errorf("listen and serve http server: %w", err)
	}

	return nil
}
