import React from 'react';

const Review = ({ score, restartQuiz }) => {
  const handleRestartQuiz = () => {
    restartQuiz();
  };

  return (
    <div className="review">
      <h1>Quiz Review</h1>
      <p>Your score: {score} / 10</p>
      <button onClick={handleRestartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Review;
