from transformers import GPT2LMHeadModel, GPT2Tokenizer, logging as lg

import torch
import warnings
import logging


device = "cuda" if torch.cuda.is_available() else "cpu"
model_path = "models/finetune_rugpt_text_prompt_batch_4_gradient_accumulation_step_4_epoch_10_new_last_05-10-23"

warnings.filterwarnings("ignore")
lg.set_verbosity(logging.CRITICAL)


def load_prompt_model():
    logging.info("internal ruGPT model loading")

    tokenizer = GPT2Tokenizer.from_pretrained(model_path)
    tokenizer.add_special_tokens({'bos_token': '<s>', 'eos_token': '</s>', 'pad_token': '<pad>'})
    model = GPT2LMHeadModel.from_pretrained(model_path)

    model.to(device)
    model.eval()

    return model, tokenizer


def get_prompt(model, tokenizer, text):
    logging.info("internal ruGPT model prompting")

    text = text + '#'
    encoded_prompt = tokenizer.encode(text, add_special_tokens=False, return_tensors="pt").to(device)

    pad_token_id = tokenizer.encode('<pad>', add_special_tokens=False)[0]

    output_sequences = model.generate(
        input_ids=encoded_prompt,
        max_length=200,
        repetition_penalty=1.15,
        do_sample=True,
        top_k=30,
        top_p=0.9,
        temperature=0.2,
        num_beams=1,
        no_repeat_ngram_size=15,
        pad_token_id=pad_token_id
    )

    stop_token = '</s>'
    output_sequences = output_sequences.tolist()

    text = tokenizer.decode(output_sequences[0], clean_up_tokenization_spaces=True)
    if stop_token in text:
        text = text[: text.find(stop_token)]

    text = text[text.index('#')+1:].strip().replace('\u0301', '').split('\u2010')

    return ' '.join(text[::-1])
