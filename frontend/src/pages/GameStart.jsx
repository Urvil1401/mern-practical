import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GameStart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4"
    }}>
      <div style={{
        width: "500px",
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <h2>Welcome, {user?.firstName}!</h2>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone}</p>
        <button 
          onClick={() => navigate("/play-game")}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameStart;
