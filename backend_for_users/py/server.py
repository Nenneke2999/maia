from concurrent.futures import ThreadPoolExecutor
from grpc_reflection.v1alpha import reflection
from models.ruGPT_3_5_lora_q5 import load_model, get_prompt

import grpc
import proto.prompt_pb2 as pb
import proto.prompt_pb2_grpc as grpc_pb
import logging


port = 6767


class PromptServer(grpc_pb.PromptServiceServicer):
    def GetPrompt(self, request, context):
        logging.info("request: %s", request.text)

        # ruGPT-3.5-lora-q5
        prompt = get_prompt(ruGPT, g_config, request.text)

        return pb.GetPromptResponse(prompt=prompt)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    ruGPT, g_config = load_model()

    server = grpc.server(ThreadPoolExecutor())
    grpc_pb.add_PromptServiceServicer_to_server(PromptServer(), server)
    SERVICE_NAMES = (
        pb.DESCRIPTOR.services_by_name["PromptService"].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)

    server.add_insecure_port(f"[::]:{port}")
    server.start()

    logging.info("server ready on port %r", port)
    server.wait_for_termination()
