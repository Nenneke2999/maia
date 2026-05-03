-- +goose Up
-- +goose StatementBegin
CREATE TABLE user_table
(
    id          TEXT NOT NULL,
    session_id  TEXT,
    PRIMARY KEY (session_id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE user_table;
-- +goose StatementEnd