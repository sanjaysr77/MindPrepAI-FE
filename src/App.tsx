import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { HomePage } from "./pages/HomePage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import { QuizPage } from "./pages/QuizPage";
import { Report } from "./pages/Report";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { GenAI } from "./pages/GenAI";
import { CompanyAI } from "./pages/CompanyAI";
import { SubjectAI } from "./pages/SubjectAI";
import { ResumeAnalyzer } from "./pages/ResumeAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/:subject" element={<QuizPage />} />
            <Route path="/personalizedreport" element={<Report />} />
            <Route path ="/genai" element = {<GenAI />} />
            <Route path ="/company-ai" element = {<CompanyAI />} />
            <Route path ="/subject-ai" element = {<SubjectAI />} />
            <Route path ="/resume-analyzer" element = {<ResumeAnalyzer />} />
          </Route>
        </Routes>
      </Layout>
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App;
