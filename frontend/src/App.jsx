import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameStart from "./pages/GameStart";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game-start" element={<GameStart />} />
        <Route path="/play-game" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
