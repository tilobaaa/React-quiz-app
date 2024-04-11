import QuizApi from './Components/QuizApi';
import './App.css';
import ScoreProvider from './store/ScoreProvider';

function App() {
  return <ScoreProvider>
    <QuizApi/>
    </ScoreProvider>
  
}

export default App;
