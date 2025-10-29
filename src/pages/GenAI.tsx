import { useState, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

export function GenAI() {
  const location = useLocation();
  const state = location.state as { data?: any };

  const data = state?.data;
  const role = data?.role || "Unknown Role";
  const questions: string[] = data?.questions || [];

  if (!data || !questions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl text-white mb-4">
          No questions found. Please go back and try again.
        </h2>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [allScores, setAllScores] = useState<number[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const sessionId = useMemo(() => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer("");
      setScore(null);
      setFeedback(null);
    }
  };

  // 🎙️ Start or Stop Recording
  const handleRecord = async () => {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      await sendToBackend(audioBlob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const sendToBackend = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.webm");
      formData.append("question", questions[currentIndex]);
      formData.append("index", String(currentIndex));
      formData.append("role", role);
      formData.append("sessionId", sessionId);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/v1/genai/role/answer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        }
      );

      const { transcript, score: s, feedback: f } = response.data;
      setAnswer(transcript);
      setScore(s);
      setFeedback(f);
      setAllScores(prev => {
        const copy = [...prev];
        copy[currentIndex] = s;
        return copy;
      });
    } catch (err) {
      console.error("Backend Evaluation Error:", err);
    }
  };

  const handleFinish = async () => {
    try {
      if (allScores.length !== 3) return;
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      const res = await axios.post(
        `${BACKEND_URL}/v1/genai/role/finish`,
        { role, scores: allScores, sessionId },
        { headers: { token } }
      );
      // Optionally show a toast or summary; the server returns total
      const total = res.data?.total as number;
      // Keep UI minimal
      alert(`Interview complete. Final score: ${total}/50`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-2xl md:text-3xl text-white font-bold mb-6 text-center">
        {role} Quiz
      </h1>

      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xl w-full mb-6 text-center">
        <p className="text-lg md:text-xl">{questions[currentIndex]}</p>
      </div>

      <button
        onClick={handleRecord}
        className={`px-4 py-2 rounded-lg font-bold mb-4 ${
          recording ? "bg-red-600" : "bg-green-500"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {answer && (
        <div className="bg-gray-800 text-white p-4 rounded-lg w-full max-w-xl text-center">
          <p className="text-sm italic mb-2">Your Answer:</p>
          <p className="font-semibold">{answer}</p>
        </div>
      )}

      {score !== null && (
        <div className="bg-gray-700 text-white p-4 rounded-lg w-full max-w-xl text-center mt-4">
          <p className="font-semibold">Score: {score}</p>
          {feedback && <p className="text-sm opacity-80 mt-1">{feedback}</p>}
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-lg font-bold bg-white text-black hover:bg-gray-200`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className={`px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700`}
          >
            Finish & Save
          </button>
        )}
      </div>

      <p className="text-white mt-4">
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
}
