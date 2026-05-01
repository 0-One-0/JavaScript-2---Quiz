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
import SelectQuiz from "./components/quizSelect.jsx";
import DifficultyPage from "./components/quizDifficulty.jsx";
import QuizCard from "./components/quizcard.jsx";
import Profile from "./pages/Profile.jsx";
import QuizResult from "./components/QuizResult.jsx";
import QuizCategories from "./components/quizCategories.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HowToPlay from "./pages/HowToPlay.jsx";
import NotFound from "./pages/NotFound.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

function App() {
  gsap.registerPlugin(useGSAP, SplitText);
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
          <Route path="/" element={<FrontPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/Quiz" element={<Quiz />}>
            <Route
              path="/Quiz/"
              element={<SelectQuiz setCatArray={setCatArray} />}
            />
            <Route path="/Quiz/selectDifficulty" element={<DifficultyPage />} />
            <Route
              path="/Quiz/quizCard"
              element={
                <QuizCard
                  setScore={setScore}
                  quizArray={quizArray}
                  setQuizArray={setQuizArray}
                  replay={replay}
                  score={score}
                />
              }
            />
            <Route
              path="/Quiz/categories"
              element={<QuizCategories catArray={catArray} />}
            />
            <Route
              path="/Quiz/quizResult"
              element={
                <QuizResult
                  score={score}
                  setReplay={setReplay}
                  setScore={setScore}
                  questionAmount={quizArray.length}
                />
              }
            />
          </Route>
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/HowToPlay" element={<HowToPlay />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
