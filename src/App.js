import React, { useState } from 'react';
import Postal from './Postal';
import Roulette from './Roulette';

// css
import './App.css';

const App = () => {

  const [postalCode, setPostalCode] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <div>郵便番号ルーレット</div>
      </header>

      <Roulette setPostalCode={setPostalCode} />
      <Postal postalCode={postalCode} />
    </div>
  );
}

export default App;
