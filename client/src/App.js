import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome <code>to Beefreal, the best web application to start beef with your enemies!</code> 
        </p>
        <a
          className="App-link"
          href="localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign in!
        </a>
      </header>
    </div>
  );
}

export default App;
