import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from groq_service import GroqServiceError, generate_candidate_summary

load_dotenv()

app = FastAPI(
    title="Candidate Interview Summary Generator API",
    version="1.0.0",
)

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SummaryRequest(BaseModel):
    transcript: str = Field(..., min_length=1)


class SummaryResponse(BaseModel):
    summary: str
    skills_discussed: list[str]
    strengths: list[str]
    areas_for_improvement: list[str]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/generate-summary", response_model=SummaryResponse)
def generate_summary(request: SummaryRequest) -> dict[str, object]:
    transcript = request.transcript.strip()

    if not transcript:
        raise HTTPException(status_code=400, detail="Transcript cannot be empty.")

    if len(transcript) > 120_000:
        raise HTTPException(
            status_code=413,
            detail="Transcript is too long. Please submit a shorter interview transcript.",
        )

    try:
        return generate_candidate_summary(transcript)
    except GroqServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
