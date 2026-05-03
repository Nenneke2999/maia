package server

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	handler "coffeeface/internal/handler/prompt"
	"coffeeface/internal/service/prompt"
	"coffeeface/pkg/logger"
)

type HTTPServer struct {
	router *chi.Mux
}

func NewHTTPServer(l *logger.Logger, service prompt.Service) (*HTTPServer, error) {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	h := &handler.Handler{
		Logger:  l,
		Service: service,
	}

	r.Post("/session/create", h.CreateSession)

	r.Post(fmt.Sprintf("/chat/{%s}", handler.SessionID), h.CreatePrompt)

	return &HTTPServer{router: r}, nil
}

func (h *HTTPServer) Router() chi.Router {
	return h.router
}
