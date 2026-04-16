import "./App.css";
import "./navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Quiz from "./pages/Quiz.jsx";
import { useState } from "react";
import SelectQuiz from "./components/quizSelect.jsx";
import DifficultyPage from "./components/quizDifficulty.jsx";
import QuizCard from "./components/quizcard.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [category, setCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [questionAmount, setQuestionAmount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profille" element={<Profile />} />
          <Route path="/Quiz" element={<Quiz />}>
            <Route
              path="/Quiz/"
              element={<SelectQuiz setCategory={setCategory} />}
            />
            <Route
              path="/Quiz/selectDifficulty"
              element={
                <DifficultyPage
                  setSelectedDifficulty={setSelectedDifficulty}
                  setQuestionAmount={setQuestionAmount}
                />
              }
            />
            <Route
              path="/Quiz/quizCard"
              element={
                <QuizCard
                  questionAmount={questionAmount}
                  category={category}
                  selectedDifficulty={selectedDifficulty}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
