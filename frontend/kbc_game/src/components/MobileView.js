import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../api';
import '../styles/MobileView.css';

const MobileView = () => {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(null);

  useEffect(() => {
    if (joined) {
      fetchQuestions()
        .then((res) => {
          setQuestions(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [joined]);

  const handleJoin = () => {
    if (name) {
      setJoined(true);
    }
  };

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
      setShowResult('Correct answer! Success!');
    } else {
      setShowResult('Sorry, wrong answer!');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(null);
      } else {
        setShowResult('Thank you for participating!');
      }
    }, 2000);
  };

  return (
    <div className="mobile-view">
      {!joined ? (
        <>
          <h1>Enter your name to join:</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleJoin}>Start Quiz</button>
        </>
      ) : questions.length > 0 ? (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {['A', 'B', 'C', 'D'].map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(option)}>
                {questions[currentQuestion][`option${option}`]}
              </button>
            ))}
          </div>
          {showResult && <p>{showResult}</p>}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default MobileView;
