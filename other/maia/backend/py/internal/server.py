from concurrent.futures import ThreadPoolExecutor
from grpc_reflection.v1alpha import reflection
from models.ruGPT_3_5_13B_8bit import load_model, get_prompt

import grpc
import proto.prompt_pb2 as pb
import proto.prompt_pb2_grpc as grpc_pb
import logging


port = 6767


class GRPCClient(object):
    def __init__(self):
        self.host = "localhost"
        self.server_port = 6768

        self.channel = grpc.insecure_channel(
            "{}:{}".format(self.host, self.server_port)
        )

        self.stub = grpc_pb.PromptServiceStub(self.channel)

    def correct_prompt(self, internal_prompt, model_number):
        request = pb.CorrectInternalPromptRequest(
            internal_prompt=internal_prompt, model_number=model_number
        )
        return self.stub.CorrectInternalPrompt(request).prompt


class PromptServer(grpc_pb.PromptServiceServicer):
    def GetPrompt(self, request, context):
        logging.info("internal request: %s", request.text)

        return pb.GetPromptResponse(prompt=get_prompt(ruGPT_3_5, tokenizer, generation_config, request.text))

    def CorrectInternalPrompt(self, request, context):
        logging.info(
            "correct internal prompt in %d external model: %s",
            request.model_number,
            request.internal_prompt,
        )

        return pb.CorrectInternalPromptResponse(
            prompt=client.correct_prompt(request.internal_prompt, request.model_number)
        )


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    ruGPT_3_5, tokenizer, generation_config = load_model()

    logging.info("create connection to external model")
    client = GRPCClient()

    server = grpc.server(ThreadPoolExecutor())
    grpc_pb.add_PromptServiceServicer_to_server(PromptServer(), server)
    SERVICE_NAMES = (
        pb.DESCRIPTOR.services_by_name["PromptService"].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)

    server.add_insecure_port(f"[::]:{port}")
    server.start()

    logging.info("internal server ready on port %r", port)
    server.wait_for_termination()
