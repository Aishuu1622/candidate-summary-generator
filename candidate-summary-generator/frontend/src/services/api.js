import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 60000,
});

export async function generateSummary(transcript) {
  const { data } = await api.post("/generate-summary", { transcript });
  return data;
}
