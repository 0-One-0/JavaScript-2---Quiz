import "./App.css";
import "./navbar.css";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Layout from "./Layout.jsx";
import Quiz from "./pages/Quiz.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/Quiz" element={<Quiz/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
