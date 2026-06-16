import json
import os
import re
from typing import Any

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

MODEL_NAME = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """You are an expert HR interviewer.

Analyze the interview transcript.

Return ONLY valid JSON.

{
"summary":"",
"skills_discussed":[],
"strengths":[],
"areas_for_improvement":[]
}

Rules:
* Extract technical skills
* Identify strengths
* Identify improvement areas
* Ignore filler words
* Ignore repetitive answers
* Keep summary concise
* Return JSON only
"""


class GroqServiceError(Exception):
    """Raised when the AI summary cannot be generated or parsed."""


def _extract_json_object(content: str) -> dict[str, Any]:
    cleaned = content.strip()

    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
        if not match:
            raise GroqServiceError("AI response did not contain valid JSON.")

        try:
            parsed = json.loads(match.group(0))
        except json.JSONDecodeError as exc:
            raise GroqServiceError("AI response JSON could not be parsed.") from exc

    if not isinstance(parsed, dict):
        raise GroqServiceError("AI response JSON must be an object.")

    return parsed


def _normalize_string_list(value: Any) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]

    if isinstance(value, str) and value.strip():
        return [value.strip()]

    return []


def _normalize_summary_payload(payload: dict[str, Any]) -> dict[str, Any]:
    summary = payload.get("summary", "")
    if not isinstance(summary, str):
        summary = str(summary)

    normalized = {
        "summary": summary.strip(),
        "skills_discussed": _normalize_string_list(payload.get("skills_discussed", [])),
        "strengths": _normalize_string_list(payload.get("strengths", [])),
        "areas_for_improvement": _normalize_string_list(
            payload.get("areas_for_improvement", [])
        ),
    }

    if not any(normalized.values()):
        raise GroqServiceError("AI response was empty.")

    return normalized


def generate_candidate_summary(transcript: str) -> dict[str, Any]:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key or api_key == "your_groq_api_key_here":
        raise GroqServiceError("GROQ_API_KEY is not configured.")

    client = Groq(api_key=api_key)

    try:
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": transcript},
            ],
            temperature=0.2,
            max_tokens=900,
            response_format={"type": "json_object"},
        )
    except Exception as exc:
        raise GroqServiceError("Failed to generate summary with Groq API.") from exc

    content = completion.choices[0].message.content if completion.choices else ""
    if not content:
        raise GroqServiceError("Groq returned an empty response.")

    return _normalize_summary_payload(_extract_json_object(content))
