import logo from './TrixelIcon.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Brennan's Blitzstrike-themed React demo.
        </p>
        <a
          className="App-link"
          href="https://store.steampowered.com/app/3654000/Blitzstrike/#:~:text=Blitzstrike%20on%20Steam.%20Blitzstrike%20is%20a%20fast%2Dpaced,with%20her%20greatest%20threat%20yet.%20All%20Reviews:"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out Blitzstrike!
        </a>
      </header>
    </div>
  );
}

export default App;
