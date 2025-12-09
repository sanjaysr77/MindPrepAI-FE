import React from "react";

export const ResumeAnalyzer: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <iframe
        src="https://ai-resume-analyzer-ebon.vercel.app/"
        title="AI Resume Analyzer"
        className="w-full h-full border-0"
      />
    </div>
  );
};
