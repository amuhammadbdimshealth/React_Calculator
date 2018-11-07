import React from 'react';
import ReactDOM from 'react-dom';
import './Display.css'

const display = (props) => {
    return (
        <div className='display'>
            <span className="operation">{props.toDisplayOperation}</span>
            <span className="number">{props.toDisplayNumber}</span>             
        </div>
    );
};

export default display;