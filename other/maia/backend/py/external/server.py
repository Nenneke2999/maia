from concurrent.futures import ThreadPoolExecutor
from grpc_reflection.v1alpha import reflection
from models.ruGPT3medium import load_model, get_prompt

import grpc
import proto.prompt_pb2 as pb
import proto.prompt_pb2_grpc as grpc_pb
import logging


port = 6768


class PromptServer(grpc_pb.PromptServiceServicer):
    def CorrectInternalPrompt(self, request, context):
        logging.info(
            "correct internal prompt in %d external model: %s",
            request.model_number,
            request.internal_prompt,
        )

        # Request to external ruGPTmedium model
        if request.model_number == 1:
            prompt = get_prompt(
                ruGPTmedium_model, ruGPTmedium_tokenizer, request.internal_prompt
            )
        # elif request.model_number == 2:
        #     prompt = get_aft_prompt(
        #         aft_model, aft_tokenizer, request.internal_prompt
        #     )
        else:
            prompt = ""

        return pb.CorrectInternalPromptResponse(prompt=prompt)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    # ruGPTmedium model
    ruGPTmedium_model, ruGPTmedium_tokenizer = load_model()
    ruGPTmedium_model.cuda()

    server = grpc.server(ThreadPoolExecutor())
    grpc_pb.add_PromptServiceServicer_to_server(PromptServer(), server)
    SERVICE_NAMES = (
        pb.DESCRIPTOR.services_by_name["PromptService"].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)

    server.add_insecure_port(f"[::]:{port}")
    server.start()

    logging.info("external server ready on port %r", port)
    server.wait_for_termination()
