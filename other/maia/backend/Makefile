PORT_FORWARD=5432

DB_HOST=127.0.0.1
DB_NAME=prompts
DB_PASS=admin
DB_USER=postgres

LOCAL_DB_DSN="postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(PORT_FORWARD)/$(DB_NAME)"

#gen:
#	protoc --go_out=plugins=grpc:pb --go_opt=paths=source_relative wine_varieties.proto

#run-db:
#	docker run --detach -p 5432:80 -e 'POSTGRES_PASSWORD=postgres' postgres:latest

#migrations-create-example:
#	goose -dir migrations create add_some_column sql

#py-grpc-example:
#	grpcurl --plaintext -d '{\"text\": \"How are you?\", \"lang\": \"ru\", \"instruction\": \"Answer on this\"}' 84.201.142.34:6767 pb.PromptService.GetPrompt

#ssh-vm:
#	ssh -i .\id_ed25519 coffeeface@158.160.81.182

#cp-py:
#	scp -i .\id_ed25519 .\backend\py\server.py coffeeface@84.201.142.34:/home/coffeeface/coffeeface-solved-the-problem/backend/py
#	scp -i .\id_ed25519 .\backend\py\proto\prompt_pb2.py .\backend\py\proto\prompt_pb2_grpc.py .\backend\py\proto\prompt_pb2.pyi coffeeface@84.201.142.34:/home/coffeeface/py/proto
#	scp -i .\id_ed25519 .\backend\py\models\ygpt.py coffeeface@84.201.142.34:/home/coffeeface/py/models

gen-py:
	python3 -m grpc_tools.protoc -I. --python_out=./py/internal --pyi_out=./py/internal --grpc_python_out=./py/internal ./proto/prompt.proto
	python3 -m grpc_tools.protoc -I. --python_out=./py/external --pyi_out=./py/external --grpc_python_out=./py/external ./proto/prompt.proto

gen-go:
	protoc --go_out=. --go-grpc_out=. ./proto/prompt.proto

migrations-up:
	goose -dir migrations postgres $(LOCAL_DB_DSN) up

migrations-down:
	goose -dir migrations postgres $(LOCAL_DB_DSN) down

run-ext-py:
	python3 ./py/external/server.py

run-int-py:
	python3 ./py/internal/server.py

run-go:
	/usr/local/go/bin/go run ./cmd/main.go


ex-gen:
	python3 examples/generator/generator.py

ex-cp:
	psql -d prompts -U postgres -f ./examples/sql/copy_table.sql

# kill-port:
# 	sudo lsof -i -P -n | grep 4000

# ex-ex:
#	 grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй 5 промптов для языковой модели", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt

.PHONY: migrations-up migrations-down run-py run-ext-py run-int-py gen-py gen-go ex-gen ex-cp