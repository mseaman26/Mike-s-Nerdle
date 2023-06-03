
import './App.css';
import MainPage from './components/MainPage'
import { GuessesProvider } from './utils/guessesContext'

function App() {
  return (
    <GuessesProvider>
      <MainPage></MainPage>
    </GuessesProvider>
    
  );
}

export default App;
