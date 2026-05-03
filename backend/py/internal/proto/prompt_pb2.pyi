from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class GetPromptRequest(_message.Message):
    __slots__ = ["text"]
    TEXT_FIELD_NUMBER: _ClassVar[int]
    text: str
    def __init__(self, text: _Optional[str] = ...) -> None: ...

class CorrectInternalPromptRequest(_message.Message):
    __slots__ = ["internal_prompt", "model_number"]
    INTERNAL_PROMPT_FIELD_NUMBER: _ClassVar[int]
    MODEL_NUMBER_FIELD_NUMBER: _ClassVar[int]
    internal_prompt: str
    model_number: int
    def __init__(self, internal_prompt: _Optional[str] = ..., model_number: _Optional[int] = ...) -> None: ...

class GetPromptResponse(_message.Message):
    __slots__ = ["prompt"]
    PROMPT_FIELD_NUMBER: _ClassVar[int]
    prompt: str
    def __init__(self, prompt: _Optional[str] = ...) -> None: ...

class CorrectInternalPromptResponse(_message.Message):
    __slots__ = ["prompt"]
    PROMPT_FIELD_NUMBER: _ClassVar[int]
    prompt: str
    def __init__(self, prompt: _Optional[str] = ...) -> None: ...
