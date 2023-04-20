import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Review from './components/Review';

function App() {
  const [quizState, setQuizState] = useState('home');
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      {quizState === 'home' && (
        <Home
          startQuiz={() => setQuizState('quiz')}
          setCategory={setCategory}
          setDifficulty={setDifficulty}
        />
      )}
      {quizState === 'quiz' && (
        <Quiz
          endQuiz={(score) => {
            setScore(score);
            setQuizState('review');
          }}
          category={category}
          difficulty={difficulty}
        />
      )}
      {quizState === 'review' && (
        <Review
          score={score}
          restartQuiz={() => {
            setQuizState('home');
            setScore(0);
          }}
        />
      )}
    </div>
  );
}

export default App;
