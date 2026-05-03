import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, GenerationConfig, logging as lg

import warnings
import logging


DEFAULT_MESSAGE_TEMPLATE = "<s>{role}\n{content}</s>\n"
DEFAULT_SYSTEM_PROMPT = "Ты — ruGPT-3.5, русскоязычный автоматический ассистент. Ты разговариваешь с людьми и помогаешь им в финансовой и банковской среде."

model_path = "models/ruGPT-3.5-13B_8bit"


warnings.filterwarnings("ignore")
lg.set_verbosity(logging.CRITICAL)


class Conversation:
    def __init__(
        self,
        message_template=DEFAULT_MESSAGE_TEMPLATE,
        system_prompt=DEFAULT_SYSTEM_PROMPT,
        start_token_id=2,
        bot_token_id=46787,
    ):
        self.message_template = message_template
        self.start_token_id = start_token_id
        self.bot_token_id = bot_token_id
        self.messages = [{"role": "system", "content": system_prompt}]

    def add_user_message(self, message):
        self.messages.append({"role": "user", "content": message})

    def get_prompt(self, tokenizer):
        final_text = ""
        for message in self.messages:
            message_text = self.message_template.format(**message)
            final_text += message_text
        final_text += tokenizer.decode([self.start_token_id, self.bot_token_id])
        return final_text.strip()


def load_model():
    logging.info("external ruGPT model loading")

    model = AutoModelForCausalLM.from_pretrained(
        model_path, load_in_8bit=True, torch_dtype=torch.float16, device_map="auto"
    )
    model.eval()

    return (
        model,
        AutoTokenizer.from_pretrained(model_path, use_fast=False),
        GenerationConfig.from_pretrained(model_path),
    )


def generate(model, tokenizer, prompt, generation_config):
    data = tokenizer(prompt, return_tensors="pt")
    data = {k: v.to(model.device) for k, v in data.items()}
    output_ids = model.generate(**data, generation_config=generation_config)[0]
    output_ids = output_ids[len(data["input_ids"][0]) :]
    output = tokenizer.decode(output_ids, skip_special_tokens=True)

    return output.strip()


def get_prompt(model, tokenizer, generation_config, text):
    logging.info("external ruGPT model prompting")

    conversation = Conversation()
    conversation.add_user_message(text)

    system_prompt = conversation.get_prompt(tokenizer)

    output = generate(
        model=model,
        tokenizer=tokenizer,
        prompt=system_prompt,
        generation_config=generation_config,
    )

    return output[3:]
