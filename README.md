# Candidate Interview Summary Generator

Candidate Interview Summary Generator is an AI-powered full-stack web application that converts interview transcripts into structured candidate evaluation summaries. It helps recruiters, HR teams, and interviewers quickly understand a candidate's performance by generating a concise summary, identifying skills discussed, highlighting strengths, and listing areas for improvement.

## Features

- Paste interview transcripts directly into the web app
- Generate AI-powered interview summaries
- Extract technical skills discussed during the interview
- Identify candidate strengths
- Suggest areas for improvement
- Clean and responsive React user interface
- FastAPI backend for handling API requests
- Groq AI integration using `llama-3.3-70b-versatile`
- Error handling for empty input, backend issues, and invalid responses

## Tech Stack

Frontend: React.js, Vite, Tailwind CSS, Axios, Framer Motion, React Icons

Backend: Python, FastAPI, Pydantic, Uvicorn, python-dotenv

AI: Groq API, `llama-3.3-70b-versatile`

## Project Structure

candidate-summary-generator/
├── backend/
│   ├── app.py
│   ├── groq_service.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md

## Installation

Clone the repository:

git clone https://github.com/your-username/candidate-summary-generator.git
cd candidate-summary-generator

## Backend Setup

Go to the backend folder:
cd backend

Create a virtual environment:
python -m venv .venv

Activate the virtual environment:
.venv\Scripts\activate

For macOS/Linux:
source .venv/bin/activate

Install backend dependencies:
pip install -r requirements.txt

Create a `.env` file inside the `backend` folder:

env
GROQ_API_KEY=your_actual_groq_api_key
FRONTEND_ORIGIN=http://localhost:5173


Run the backend server:
uvicorn app:app --reload

The backend will run at:
http://localhost:8000

## Frontend Setup

Open a new terminal and go to the frontend folder:
cd frontend

Install frontend dependencies:
npm install

Run the frontend development server:
npm run dev

The frontend will run at:
http://localhost:5173

## API Documentation

### Health Check

Endpoint:

http
GET /health


Response:

json
{
  "status": "ok"
}


### Generate Candidate Summary

Endpoint:

http
POST /generate-summary

Request body:

json
{
  "transcript": "Paste interview transcript here..."
}


Response:

json
{
  "summary": "Candidate demonstrated strong technical knowledge and explained project experience clearly.",
  "skills_discussed": ["Python", "React", "SQL"],
  "strengths": ["Clear communication", "Good problem-solving ability"],
  "areas_for_improvement": ["Advanced database optimization"]
}


## How It Works

The user pastes an interview transcript into the frontend. The React application sends the transcript to the FastAPI backend through the `/generate-summary` endpoint. The backend sends the transcript to the Groq AI model with instructions to return structured JSON. The response is normalized by the backend and sent back to the frontend. The frontend then displays the generated summary, skills, strengths, and improvement areas in separate result cards.

## Environment Variables

Backend environment variables should be placed in:

text
backend/.env


Required variables:

env
GROQ_API_KEY=your_actual_groq_api_key
FRONTEND_ORIGIN=http://localhost:5173


Optional frontend variable:

env
VITE_API_URL=http://localhost:8000


If `VITE_API_URL` is not provided, the frontend uses `http://localhost:8000` by default.

## Available Scripts

Frontend scripts:

bash
npm run dev

Starts the frontend development server.

bash
npm run build


Builds the frontend for production.

bash
npm run preview


Previews the production build.

bash
npm run lint

Runs ESLint.

Backend command:

bash
uvicorn app:app --reload


Starts the FastAPI backend server.

## Use Cases

- Recruiters summarizing candidate interviews
- HR teams reviewing interview transcripts
- Interviewers preparing structured feedback
- Students learning AI-powered full-stack application development
- Developers building practical React and FastAPI projects

## Future Enhancements

- Upload interview transcripts as PDF, DOCX, or TXT files
- Export generated summaries as PDF
- Save previous interview summaries
- Add user authentication
- Add candidate scoring or rating
- Support multiple AI models
- Add interview role or job description input for more targeted summaries

## Conclusion

Candidate Interview Summary Generator simplifies the process of reviewing interview transcripts by using AI to produce organized and useful candidate insights. It combines a modern React frontend, a FastAPI backend, and Groq AI to deliver fast and structured interview analysis.
