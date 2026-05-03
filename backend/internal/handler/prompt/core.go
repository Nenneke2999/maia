package prompt

import (
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"

	"coffeeface/internal/model"
	"coffeeface/internal/service/prompt"
	"coffeeface/pkg/logger"
)

const (
	SessionID = "session_id"
)

type Handler struct {
	Logger  *logger.Logger
	Service prompt.Service
}

func (h *Handler) CreateSession(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	userIP, err := parseUserIP(r.Body)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	session, err := h.Service.CreateSession(r.Context(), &prompt.CreateSessionRequest{
		UserIP: userIP,
	})
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	result, _ := json.Marshal(map[string]string{
		"session_id": session.ID,
		"user_id":    session.UserID,
	})
	_, err = w.Write(result)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}

func (h *Handler) GetSession(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	session, err := parseJsonBody[model.Session](r.Body)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	prompts, err := h.Service.GetSession(r.Context(), &model.Session{
		ID:     session.ID,
		UserID: session.UserID,
	})
	if err != nil {
		if strings.Contains(err.Error(), "validate") {
			h.Logger.Error(err.Error())
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		} else {
			h.Logger.Error(err.Error())
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}

	_, err = w.Write(prompts)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}

func (h *Handler) CreatePrompt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	sessionID := chi.URLParam(r, SessionID)
	promptRequest, err := parseJsonBody[CreatePromptRequest](r.Body)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	resultPrompt, err := h.Service.CreatePrompt(r.Context(), &prompt.CreatePromptRequest{
		UserID:     promptRequest.UserID,
		SessionID:  sessionID,
		Text:       promptRequest.Text,
		IsInternal: promptRequest.IsInternal,
	})
	if err != nil {
		if strings.Contains(err.Error(), "validate") {
			h.Logger.Error(err.Error())
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		} else {
			h.Logger.Error(err.Error())
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}

	result, _ := json.Marshal(map[string]string{
		"result": resultPrompt,
	})
	_, err = w.Write(result)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	userData, err := parseJsonBody[model.UserData](r.Body)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	user, err := h.Service.GetUser(r.Context(), userData)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	result, _ := json.Marshal(map[string]string{
		"full_name":  user.FullName,
		"sex":        user.Sex,
		"birth":      user.Birth,
		"profession": user.Profession,
		"salary":     fmt.Sprint(user.Salary),
		"kids":       fmt.Sprint(user.Kids),
	})
	_, err = w.Write(result)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}

func parseUserIP(body io.Reader) (*net.IP, error) {
	b, err := io.ReadAll(body)
	if err != nil {
		return nil, err
	}
	userIP := net.IP(b)

	return &userIP, nil
}

type CreatePromptRequest struct {
	UserID     string `json:"user_id"`
	Text       string `json:"text"`
	IsInternal bool   `json:"is_internal"`
}

func parseJsonBody[T any](body io.Reader) (*T, error) {
	b, err := io.ReadAll(body)
	if err != nil {
		return nil, err
	}

	var request T
	err = json.Unmarshal(b, &request)
	if err != nil {
		return nil, err
	}

	return &request, nil
}
