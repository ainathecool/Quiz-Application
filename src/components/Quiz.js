import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffleArray } from '../utils/shuffle';
import Countdown from 'react-countdown';

const Quiz = ({ endQuiz, category, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      setQuestions(response.data.results);
      setLoading(false);
    };

    fetchQuestions();
  }, [category, difficulty]);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      setAnswers(
        shuffleArray([
          ...questions[currentQuestion].incorrect_answers,
          questions[currentQuestion].correct_answer,
        ])
      );
    }
  }, [questions, currentQuestion, loading]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);

  
    if (currentQuestion + 1 === questions.length) {
        endQuiz(score + 1);
      }
    };
  
    const renderer = ({ minutes, seconds, completed }) => {
      if (completed) {
        endQuiz(score);
        return <span>Time's up!</span>;
      } else {
        return (
          <span>
            Time remaining: {minutes}:{seconds}
          </span>
        );
      }
    };
  
    return (
      <div className="quiz">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h2>Question {currentQuestion + 1}/10</h2>
            <Countdown
              date={Date.now() + 30000}
              renderer={renderer}
              onComplete={() => endQuiz(score)}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: questions[currentQuestion].question,
              }}
            />
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>
                  <button onClick={() => handleAnswer(answer)}>
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };
  
  export default Quiz;
  
