import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function GenAI() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { data?: any }; // your navigate() passes { data: response.data }

  const data = state?.data;
  const role = data?.role || "Unknown Role";
  const questions: string[] = data?.questions || [];

  if (!data || !questions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl text-white mb-4">
          No questions found. Please go back and try again.
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-black font-bold p-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-2xl md:text-3xl text-white font-bold mb-6 text-center">
        {role} Quiz
      </h1>

      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xl w-full mb-6 text-center">
        <p className="text-lg md:text-xl">{questions[currentIndex]}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg font-bold ${
            currentIndex === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className={`px-4 py-2 rounded-lg font-bold ${
            currentIndex === questions.length - 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>

      <p className="text-white mt-4">
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
}
