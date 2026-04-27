import "./App.css";
import "./navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Quiz from "./pages/Quiz.jsx";
import { useState } from "react";
import SelectQuiz from "./components/QuizSelect.jsx";
import DifficultyPage from "./components/QuizDifficulty.jsx";
import QuizCard from "./components/Quizcard.jsx";
import QuizResult from "./components/QuizResult.jsx";
import QuizCategories from "./components/QuizCategories.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [score, setScore] = useState(0); //Keeps check of the correct answers from user.
  const [replay, setReplay] = useState(false);
  const [quizArray, setQuizArray] = useState([]);
  const [catArray, setCatArray] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        <Route element={<Layout />}>
          <Route path="/" element={<FrontPage/>} />
          <Route path="/Quiz" element={<Quiz />}>
            <Route
              path="/Quiz/"
              element={<SelectQuiz setCatArray={setCatArray} />}
            />
            <Route
              path="/Quiz/selectDifficulty"
              element={
                <DifficultyPage />
              }
            />
            <Route
              path="/Quiz/quizCard"
              element={
                <QuizCard
                  setScore={setScore}
                  quizArray={quizArray}
                  setQuizArray={setQuizArray}
                  replay ={replay}
                  score = {score}
                />
              }
            />
            <Route path="/Quiz/categories" element={<QuizCategories catArray={catArray}/>} />
            <Route
              path="/Quiz/quizResult"
              element={
                <QuizResult
                  score={score}
                  setReplay={setReplay}
                  setScore = {setScore}
                />
              }
            />
          </Route>
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
