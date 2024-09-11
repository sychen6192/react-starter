import logo from './logo.svg';
import './App.css';
import { React, useState } from 'react'; 
import UnitControl from './components/UnitControl';
import CardFooter from './components/CardFooter';

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
        <div className="converter">
          <div className="flex-1">
            <div className="converter-title">Set</div>
            <input type="number" className="input-number" onChange={(e) => handleInputChange(e)} min="0" />
          </div>
          <span className="angle-icon fa-2x" style={{ marginTop: 30 }}>
            <i className="fas fa-angle-right" ></i>
          </span>
          <div className="text-right flex-1">
            <div className="converter-title">Show</div>
            <input type="text" className="input-number text-right" value={inputValue/8} />
          </div>
        </div>
      </div>
      <CardFooter inputValue={inputValue}/>
    </div>
  );
}

export default App;
