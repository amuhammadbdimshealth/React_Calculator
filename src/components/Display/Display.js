import React from 'react';
import ReactDOM from 'react-dom';
import './Display.css'

const display = (props) => {
    return (
        <div className='display'>
            <span>{props.toDisplay}</span>             
        </div>
    );
};

export default display;