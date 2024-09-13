import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UnitConverter = ({ inputValue, handleInputChange }) => {
    return (
        <div className="converter">
          <div className="flex-1">
            <div className="converter-title">Set</div>
            <input type="number" className="input-number" onChange={(e) => handleInputChange(e)} min="0" />
          </div>
          <span className="angle-icon fa-2x" style={{ marginTop: 30 }}>
            <FontAwesomeIcon icon={['fas', 'angle-right']} />
          </span>
          <div className="text-right flex-1">
            <div className="converter-title">Show</div>
            <input type="text" className="input-number text-right" value={inputValue/8} />
          </div>
        </div>
    );
}

export default UnitConverter;