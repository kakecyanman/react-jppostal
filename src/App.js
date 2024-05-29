import React from 'react';
import ReactDOM from 'react-dom';
import Postal from './Postal';
import Roulette from './Roulette';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>郵便番号ルーレット</div>
      </header>

      <Roulette />
      <Postal />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
