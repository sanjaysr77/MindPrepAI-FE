import { useLocation } from "react-router-dom";

export function QuizPage() {
  const location = useLocation();
  const { questions } = location.state as { questions: { _id: string; question: string; options: string[] }[] };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quiz</h1>
      {questions.map((q, idx) => (
        <div key={q._id} className="mb-6">
          <p className="font-semibold">{idx + 1}. {q.question}</p>
          <ul className="ml-4 list-disc">
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
