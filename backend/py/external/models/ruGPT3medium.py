from transformers import (
    AutoModelWithLMHead,
    AutoTokenizer,
    GPT2Tokenizer,
    GPT2LMHeadModel,
    logging as lg,
)

import torch
import warnings
import logging


checkpoint_path = "models/prompt_data_model_ruGPTmedium/essays"

warnings.filterwarnings("ignore")
lg.set_verbosity(logging.CRITICAL)


def load_model():
    logging.info("external ruGPTmedium model loading")

    return (
        GPT2LMHeadModel.from_pretrained(checkpoint_path),
        GPT2Tokenizer.from_pretrained(checkpoint_path)
    )


def get_prompt(model, tokenizer, text):
    logging.info("external ruGPTmedium model prompting")

    input_text = tokenizer.encode(text, return_tensors="pt")

    output = model.generate(
        input_text.cuda(),
        max_length=250,
        repetition_penalty=1.15,
        do_sample=True,
        top_k=30,
        top_p=0.9,
        temperature=0.2,
        num_beams=1,
        no_repeat_ngram_size=15
    )

    return tokenizer.decode(output[0][len(input_text[0])+1:])
