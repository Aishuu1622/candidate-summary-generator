# Candidate Interview Summary Generator

AI-powered web application that generates concise interview summaries from transcripts.

## Stack

- Frontend: React.js, Vite, Tailwind CSS, Axios, React Icons, Framer Motion
- Backend: Python FastAPI, Groq API, python-dotenv
- Model: `llama-3.3-70b-versatile`

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Update `backend/.env`:

```env
GROQ_API_KEY=your_actual_groq_api_key
FRONTEND_ORIGIN=http://localhost:5173
```

Run the API:

```bash
uvicorn app:app --reload
```

The backend runs on `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API

`POST /generate-summary`

Request:

```json
{
  "transcript": "Interview transcript text"
}
```

Response:

```json
{
  "summary": "Candidate demonstrated strong Python and Django knowledge.",
  "skills_discussed": ["Python", "Django", "SQL"],
  "strengths": ["Project Experience", "Technical Knowledge"],
  "areas_for_improvement": ["Advanced Database Concepts"]
}
```
