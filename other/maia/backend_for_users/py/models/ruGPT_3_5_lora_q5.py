from transformers import logging as lg
from llm_rs import AutoModel, GenerationConfig

import json
import warnings
import logging


content_dir = "/home/maia/git/maia/backend_for_users/py/models"
output_ggml_dir = content_dir + "/output_ggml"
model_file = output_ggml_dir + "/ruGPT-3.5-13B-lora-q5_0.bin"

warnings.filterwarnings("ignore")
lg.set_verbosity(logging.CRITICAL)


def load_model():
    logging.info("model loading")

    # with open(content_dir + "/generation_config.json", encoding="utf-8") as f:
    #     generation_config = json.load(f)

    # g_config = GenerationConfig()
    # g_config.top_p = generation_config["top_p"]
    # g_config.top_k = generation_config["top_k"]
    # g_config.repetition_penalty = generation_config["repetition_penalty"]
    # g_config.temperature = generation_config["temperature"]
    # g_config.max_new_tokens = generation_config["max_new_tokens"]

    # return (
    #     AutoModel.from_pretrained(
    #         output_ggml_dir,
    #         model_file=model_file,
    #     ),
    #     g_config,
    # )

    return "", ""


def get_prompt(model, g_config, text):
    logging.info("model prompting")

    # return model.generate(
    #     prompt=text, generation_config=g_config
    # ).text
    return "Hello!!!"