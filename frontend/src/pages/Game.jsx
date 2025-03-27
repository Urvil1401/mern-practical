import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const operators = ["+", "-", "x", "/"];

const generateQuestion = () => {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let operator = operators[Math.floor(Math.random() * operators.length)];

  let correctAnswer;
  switch (operator) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "x": correctAnswer = num1 * num2; break;
    case "/": correctAnswer = num2 !== 0 ? (num1 / num2).toFixed(1) : 0; break;
    default: break;
  }

  let answers = [correctAnswer, Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
  answers.sort(() => Math.random() - 0.5);

  return { num1, num2, operator, correctAnswer, answers };
};

const Game = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let generatedQuestions = [];
    while (generatedQuestions.length < 10) {
      let question = generateQuestion();
      if (!generatedQuestions.some(q => q.num1 === question.num1 && q.operator === question.operator && q.num2 === question.num2)) {
        generatedQuestions.push(question);
      }
    }
    setQuestions(generatedQuestions);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      handleNextQuestion(null);
    }
  }, [timer]);

  const handleNextQuestion = (selectedAnswer) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setResults([...results, { 
      question: `${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2}`, 
      userAnswer: selectedAnswer ?? "No Answer", 
      isCorrect 
    }]);
    
    if (isCorrect) setScore(score + 1);

    if (currentIndex < 9) {
      setCurrentIndex(currentIndex + 1);
      setTimer(30);
    } else {
      navigate("/result", { state: { score, results } });
    }
  };

  if (!user || questions.length === 0) return <h2 style={styles.loading}>Loading...</h2>;

  const currentQuestion = questions[currentIndex];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Question {currentIndex + 1} / 10</h2>
      <h3 style={styles.timer}>Time Left: {timer}s</h3>

      <div style={styles.questionContainer}>
        <input type="text" value={currentQuestion.num1} disabled style={styles.input} />
        <input type="text" value={currentQuestion.operator} disabled style={styles.input} />
        <input type="text" value={currentQuestion.num2} disabled style={styles.input} />
      </div>

      <div style={styles.buttonContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <button key={index} style={styles.button} onClick={() => handleNextQuestion(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  timer: {
    fontSize: "18px",
    color: "red",
    marginBottom: "20px",
  },
  questionContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "50px",
    height: "40px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  button: {
    width: "100px",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  loading: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Game;
