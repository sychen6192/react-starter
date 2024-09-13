import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import UnitControl from './components/UnitControl';
import CardFooter from './components/CardFooter';
import UnitConverter from './components/UnitConverter';

library.add(fab, fas, far);
function App() {
  const [inputValue, setInputValue] = useState(0);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <div className="container">
      <div className="card-header">Network Speed Converter</div>
      <div className="card-body">
        <UnitControl />
        <UnitConverter inputValue={inputValue} handleInputChange={handleInputChange} />
      </div>
      <CardFooter inputValue={inputValue}/>
    </div>
  );
}

export default App;
