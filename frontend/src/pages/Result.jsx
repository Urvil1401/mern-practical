import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, results } = location.state || { score: 0, results: [] };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "95vh",
      color: "white"
    }}>
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Your Score: {score}/10</h2>

      <div style={{
        width: "90%",
        maxWidth: "600px",
        background: "white",
        color: "#333",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Results</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((res, index) => (
            <li key={index} style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>{res.question}</span>
              <span style={{ color: res.isCorrect ? "green" : "red" }}>
                {res.userAnswer} {res.isCorrect ? "✔" : "✘"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/game-start")} style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "18px",
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        Go to Home
      </button>
    </div>
  );
};

export default Result;
