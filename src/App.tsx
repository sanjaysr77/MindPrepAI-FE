import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { HomePage } from "./pages/HomePage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import { QuizPage } from "./pages/QuizPage";
import { Report } from "./pages/Report";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/:subject" element={<QuizPage />} />
          <Route path="/personalizedreport" element={<Report />} />
        </Routes>
      </Layout>
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App;
