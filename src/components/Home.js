import React from 'react';

const Home = ({ startQuiz, setCategory, setDifficulty }) => {
  const handleStartQuiz = () => {
    startQuiz();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className="home">
      <h1>Quiz App</h1>
      <div>
        <label htmlFor="category">Category: </label>
        <select id="category" onChange={handleCategoryChange}>
          <option value="9">General Knowledge</option>
          <option value="18">Computers</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty: </label>
        <select id="difficulty" onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default Home;
