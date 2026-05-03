-- +goose Up
-- +goose StatementBegin
CREATE TABLE chat_table
(
    session_id TEXT NOT NULL,
    s3_url     TEXT,
    created_at BIGINT,
    PRIMARY KEY (s3_url),
    FOREIGN KEY(session_id) REFERENCES user_table(session_id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE chat_table;
-- +goose StatementEnd
