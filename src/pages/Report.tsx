import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import { BACKEND_URL } from "../config/config";

type ScoreEntry = {
  category: string;
  score: number;
  sessionId?: string;
  createdAt: string;
  type: "role" | "company" | "subject";
};

type AttemptSummary = {
  total: number;
  correct: number;
  accuracy: number;
};

type SubjectAttempt = {
  subject: string;
  correctCount: number;
  totalCount: number;
};

type ReportResponse = {
  scores: ScoreEntry[];
  subjectBars: { subject: string; averageScore: number }[];
  attempts: AttemptSummary;
};

type SubjectAttemptsResponse = {
  subjectAttempts: SubjectAttempt[];
};

const palette = ["#7C3AED", "#06B6D4", "#F59E0B", "#10B981", "#3B82F6", "#EF4444"];

const EmptyState = ({ message }: { message: string }) => (
  <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white">
    {message}
  </div>
);

function buildBarData(items: ScoreEntry[]) {
  return items.map((item) => ({
    name: item.category,
    Score: item.score,
  }));
}

function buildTimelineData(groups: ScoreEntry[]) {
  return [...groups]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((item, idx) => ({
      name: `${idx + 1}. ${item.category}`,
      score: item.score,
      date: new Date(item.createdAt).toLocaleDateString(),
    }));
}

function calcAverageByType(items: ScoreEntry[], type: ScoreEntry["type"]) {
  const filtered = items.filter((i) => i.type === type);
  if (!filtered.length) return 0;
  return Math.round(filtered.reduce((sum, item) => sum + item.score, 0) / filtered.length);
}

export function Report() {
  const [data, setData] = useState<ReportResponse | null>(null);
  const [subjectAttempts, setSubjectAttempts] = useState<SubjectAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setData({
          scores: [],
          subjectBars: [],
          attempts: { total: 0, correct: 0, accuracy: 0 },
        });
        setLoading(false);
        return;
      }

      try {
        const [reportRes, attemptsRes] = await Promise.all([
          axios.get<ReportResponse>(
            `${BACKEND_URL}/v1/report/personalized`,
            { headers: { token } }
          ),
          axios.get<SubjectAttemptsResponse>(
            `${BACKEND_URL}/v1/report/subject-attempts`,
            { headers: { token } }
          ),
        ]);

        console.log("Report Response:", reportRes.data);
        console.log("Attempts Response:", attemptsRes.data);

        setData(reportRes.data);
        const attempts = attemptsRes.data.subjectAttempts || [];
        console.log("Processed Subject Attempts Data:", attempts);
        setSubjectAttempts(attempts);

        const subjects = attempts.map((item) => item.subject);
        console.log("Extracted Subjects:", subjects);
        setAllSubjects(subjects);
        setSelectedSubjects(subjects);
      } catch (err: any) {
        console.error("Report fetch failed:", err);
        console.error("Error details:", err.response?.data);
        setData({
          scores: [],
          subjectBars: [],
          attempts: { total: 0, correct: 0, accuracy: 0 },
        });
        setSubjectAttempts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const combinedTimeline = useMemo(() => {
    if (!data) return [];
    return buildTimelineData(data.scores);
  }, [data]);

  const donutData = useMemo(() => {
    if (!data) return [];
    return [
      { name: "Role", value: calcAverageByType(data.scores, "role") },
      { name: "Company", value: calcAverageByType(data.scores, "company") },
      { name: "Subject", value: calcAverageByType(data.scores, "subject") },
    ].filter((item) => item.value > 0);
  }, [data]);

  const filteredSubjectAttempts = useMemo(() => {
    if (selectedSubjects.length === 0) {
      return subjectAttempts;
    }
    return subjectAttempts.filter((subject) =>
      selectedSubjects.includes(subject.subject)
    );
  }, [subjectAttempts, selectedSubjects]);

  // Sync selectedSubjects with allSubjects when allSubjects changes
  useEffect(() => {
    if (allSubjects.length > 0 && selectedSubjects.length === 0) {
      setSelectedSubjects(allSubjects);
    }
  }, [allSubjects]);

  const subjectBars = data?.subjectBars ?? [];
  const subjectChartData = useMemo(
    () =>
      subjectBars.map((entry) => ({
        name: entry.subject,
        Score: entry.averageScore,
      })),
    [subjectBars]
  );

  const mockSubjectData = [
    { name: "Java", Score: 42 },
    { name: "DBMS", Score: 38 },
    { name: "OS", Score: 34 },
  ];

  function BarArea({
    data,
    label,
  }: {
    data: { name: string; Score: number }[];
    label?: string;
  }) {
    return (
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", color: "#fff" }}
              labelStyle={{ color: "#a5b4fc" }}
            />
            <Legend />
            <Bar dataKey="Score" fill="#06B6D4" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`bar-${entry.name}`} fill={palette[index % palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {label ? (
          <p className="mt-3 text-center text-white/60 text-sm">{label}</p>
        ) : null}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-black text-white">
        <div className="animate-pulse text-2xl font-semibold">Building your report...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">
            Personalized Insights
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Your Interview Performance Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Scores grouped by role, company, and subject with a quick accuracy snapshot.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-indigo-500/10">
            <p className="text-sm text-white/70">Attempts</p>
            <h3 className="text-4xl font-bold mt-2">{data.attempts.total}</h3>
            <p className="text-sm text-white/60 mt-1">Questions attempted</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-indigo-500/10">
            <p className="text-sm text-white/70">Correct Answers</p>
            <h3 className="text-4xl font-bold mt-2">{data.attempts.correct}</h3>
            <p className="text-sm text-white/60 mt-1">Across all attempts</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-indigo-500/80 via-fuchsia-500/70 to-cyan-500/80 p-5 text-white shadow-lg shadow-indigo-500/30">
            <p className="text-sm text-white/80">Accuracy</p>
            <h3 className="text-4xl font-bold mt-2">{data.attempts.accuracy}%</h3>
            <p className="text-sm text-white/70 mt-1">Overall precision</p>
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-indigo-500/15">
          <div className="mb-4">
            <p className="text-sm text-white/60">Averages</p>
            <h2 className="text-2xl font-bold">Type overview</h2>
          </div>
          {donutData.length === 0 ? (
            <EmptyState message="Scores will show here once you finish an interview." />
          ) : (
            <div className="grid grid-cols-3 gap-4 text-center">
              {donutData.map((item, idx) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                  style={{ borderColor: `${palette[idx % palette.length]}33` }}
                >
                  <p className="text-sm text-white/60">{item.name}</p>
                  <p className="text-3xl font-bold" style={{ color: palette[idx % palette.length] }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-indigo-500/15">
          <div className="mb-6">
            <p className="text-sm text-white/60">Subject Performance</p>
            <h2 className="text-2xl font-bold">Correct Answers by Subject</h2>
          </div>

          {subjectAttempts.length === 0 ? (
            <>
              <EmptyState message="No subject attempts recorded yet. Start answering questions to see your progress." />
              <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-200 text-sm">
                📊 Tip: Answer questions in the quiz to populate this chart with your performance data.
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label className="text-sm text-white/70 mb-3 block">Filter Subjects:</label>
                <div className="flex flex-wrap gap-2">
                  {allSubjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() =>
                        setSelectedSubjects((prev) =>
                          prev.includes(subject)
                            ? prev.filter((s) => s !== subject)
                            : [...prev, subject]
                        )
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedSubjects.includes(subject)
                          ? "bg-indigo-500 text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                {filteredSubjectAttempts.length > 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 w-full">
                    <h3 className="text-lg font-semibold mb-6 text-white">Correct Answers Per Subject</h3>
                    <div style={{ width: "100%", height: 400, display: "flex", justifyContent: "center" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={filteredSubjectAttempts}
                          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                          <XAxis
                            dataKey="subject"
                            stroke="#cbd5e1"
                            angle={-45}
                            textAnchor="end"
                            height={120}
                            interval={0}
                          />
                          <YAxis stroke="#cbd5e1" />
                          <Tooltip
                            contentStyle={{
                              background: "#0f172a",
                              border: "1px solid #1e293b",
                              color: "#fff",
                            }}
                            labelStyle={{ color: "#a5b4fc" }}
                            formatter={(value: any) => [value, "Correct Answers"]}
                          />
                          <Legend />
                          <Bar
                            dataKey="correctCount"
                            fill="#06B6D4"
                            radius={[8, 8, 0, 0]}
                            name="Correct Answers"
                          >
                            {filteredSubjectAttempts.map((entry, index) => (
                              <Cell
                                key={`cell-${entry.subject}`}
                                fill={palette[index % palette.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 text-white/70">
                    <p>No subjects selected. Click on a subject filter button above to display the chart.</p>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-6 text-white">Subject-wise Performance</h3>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSubjectAttempts.map((attempt, idx) => (
                      <div
                        key={attempt.subject}
                        className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all"
                        style={{ borderColor: `${palette[idx % palette.length]}33` }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4
                            className="text-lg font-semibold"
                            style={{ color: palette[idx % palette.length] }}
                          >
                            {attempt.subject}
                          </h4>
                          <div
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${palette[idx % palette.length]}20`,
                              color: palette[idx % palette.length]
                            }}
                          >
                            {attempt.totalCount > 0
                              ? Math.round((attempt.correctCount / attempt.totalCount) * 100)
                              : 0}
                            %
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/70">Questions Attempted:</span>
                            <span className="text-2xl font-bold text-white">
                              {attempt.totalCount}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${(attempt.totalCount / Math.max(...filteredSubjectAttempts.map(a => a.totalCount), 1)) * 100}%`,
                                backgroundColor: palette[idx % palette.length]
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-sm text-white/70">Correct Answers:</span>
                            <span
                              className="text-2xl font-bold"
                              style={{ color: palette[idx % palette.length] }}
                            >
                              {attempt.correctCount}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${(attempt.correctCount / Math.max(...filteredSubjectAttempts.map(a => a.correctCount), 1)) * 100}%`,
                                backgroundColor: palette[idx % palette.length]
                              }}
                            />
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="text-center">
                            <span className="text-white/60 text-sm">Accuracy</span>
                            <p className="text-3xl font-bold mt-1" style={{ color: palette[idx % palette.length] }}>
                              {attempt.totalCount > 0
                                ? Math.round((attempt.correctCount / attempt.totalCount) * 100)
                                : 0}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}