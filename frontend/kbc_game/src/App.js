import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import './App.css';
import { fetchQuestions } from './api';

function App() {
    const [playerName, setPlayerName] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [resultMessage, setResultMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleJoinNow = async () => {
        setIsLoading(true);
        if (playerName.trim() === '') {
            setResultMessage('Please enter a participant name');
            setIsLoading(false);
            return;
        }
        try {
            const questionsData = await fetchQuestions();
            if (questionsData.length > 0) {
                setQuestions(questionsData);
                setIsJoined(true);
                setResultMessage('');
            } else {
                setResultMessage('No questions found. Please check if the backend is running?');
            }
        } catch (err) {
            setResultMessage('Failed to load questions. Is the backend running?');
        }
        setIsLoading(false);
    };

    const handleAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct_option) {
            setResultMessage('Congratulations!! Correct Answer');
        } else {
            setResultMessage('Sorry!! Better luck next time');
        }
        
        setTimeout(() => {
            setResultMessage(''); 
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setIsJoined(false);
                setResultMessage('Thank you for participating in the game!');
                setPlayerName('');
            }
        }, 2000);
    };

    const renderQuestion = () => {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            const { question_text, option_a, option_b, option_c, option_d } = questions[currentQuestionIndex];
            return (
                <div className="question-container">
                    <h2>{question_text}</h2>
                    <div className="options">
                    <div className="option-row">
                        <label>
                            <button type="button" className="option-button" onClick={() => handleAnswer('A')}>
                                {option_a}
                            </button>
                        </label>
                    </div>
                    <div className="option-row">
                        <label>
                            <button type="button" className="option-button" onClick={() => handleAnswer('B')}>
                                {option_b}
                            </button>
                        </label>
                    </div>
                    <div className="option-row">
                        <label>
                            <button type="button" className="option-button" onClick={() => handleAnswer('C')}>
                                {option_c}
                            </button>
                        </label>
                    </div>
                    <div className="option-row">
                        <label>
                            <button type="button" className="option-button" onClick={() => handleAnswer('D')}>
                                {option_d}
                            </button>
                        </label>
                    </div>
                </div>
                    {resultMessage && <p className="result-message">{resultMessage}</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="App">
            {!isJoined ? (
                <div className="join-section">
                    <QRCodeCanvas value={window.location.href} />
                    <h1>Join the Quiz Game</h1>
                    <p>Scan the QR code to join the game on your mobile device</p>
                    <input
                        type="text"
                        placeholder="Enter participant name"
                        value={playerName}
                        onChange={(event) => setPlayerName(event.target.value)}
                    />
                    <button onClick={handleJoinNow} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Join Now'}
                    </button>
                    {resultMessage && <p className="error">{resultMessage}</p>}
                </div>
            ) : (
                <div className="quiz-section">
                    <h1>Welcome to the quiz game, {playerName}</h1>
                    {isLoading ? (
                        <p>Loading questions... Please check if the backend is running?</p>
                    ) : (
                        renderQuestion()
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
