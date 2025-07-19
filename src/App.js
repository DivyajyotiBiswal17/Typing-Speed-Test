import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

const App = () => {
  const originalText = "The quick brown fox jumps over the lazy dog.";
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const calculateResults = useCallback(() => {
    const wordsTyped = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
    const minutes = 1; // Since timer is fixed at 60 seconds
    const calculatedWPM = Math.round(wordsTyped / minutes);

    let correctChars = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === originalText[i]) {
        correctChars++;
      }
    }

    const acc = (correctChars / text.length) * 100 || 0;
    setWpm(calculatedWPM);
    setAccuracy(Math.round(acc));
  }, [text, originalText]);

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      calculateResults();
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer, calculateResults]);

  const handleChange = (e) => {
    if (!isActive) setIsActive(true);
    setText(e.target.value);
  };

  const restartTest = () => {
    setText("");
    setTimer(60);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="container">
      <h1>Typing Speed Test</h1>
      <div id="text-display">{originalText}</div>
      <textarea
        id="text-input"
        value={text}
        onChange={handleChange}
        placeholder="Start typing here..."
        disabled={timer === 0}
      />
      <div className="info">
        <span id="timer">Time: {timer}s</span>
        <span id="wpm">WPM: {wpm}</span>
        <span id="accuracy">Accuracy: {accuracy}%</span>
      </div>
      <button id="restart" onClick={restartTest}>Restart</button>
    </div>
  );
};

export default App;


