gen-py:
	python3 -m grpc_tools.protoc -I. --python_out=./py --pyi_out=./py --grpc_python_out=./py ./proto/prompt.proto

gen-go:
	protoc --go_out=. --go-grpc_out=. ./proto/prompt.proto

run-py:
	python3 ./py/server.py

run-go:
	go run ./cmd/main.go

ex-model-request:
	grpcurl -plaintext -d '{"text": "Придумай 5 рифм к слову Денис"}' localhost:6767 pb.PromptService.GetPrompt


.PHONY: run-py run-go gen-py gen-go