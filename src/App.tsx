import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { HomePage } from "./pages/HomePage";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path = "/" element = {<Navigate to = "/dashboard" />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/dashboard" element = {<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  )
}
export default App;