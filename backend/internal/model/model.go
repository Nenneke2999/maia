package model

type Session struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
}

type UserData struct {
	UserID      string `json:"user_id"`
	ClientSNILS int    `json:"client_snils"`
}

type User struct {
	FullName   string `json:"full_name"`
	Sex        string `json:"sex"`
	Birth      string `json:"birth"`
	Profession string `json:"profession"`
	Salary     int    `json:"salary"`
	Kids       int    `json:"kids"`
}