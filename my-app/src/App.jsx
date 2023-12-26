import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/Landing";
import TodoPage from "./pages/Todo";
import LoginPage from "./pages/Login";
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage isLogin = {false} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todoPage" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
