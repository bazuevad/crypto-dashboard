import './App.css';
import NewsFeed from './components/NewsFeed.js';
import CurrencyConverter from './components/CurrencyConverter.js';
function App() {
  return (
    <div className="app">
      <NewsFeed></NewsFeed>
      <CurrencyConverter></CurrencyConverter>
    </div>
  );
}

export default App;
