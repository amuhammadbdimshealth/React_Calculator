import React from 'react';
import './ClearButton.css'

const ClearButton = (props) => {
    return (
        <button
            className='clear-btn'
            onClick={props.onClick}>
            Clear
        </button>
    );
};

export default ClearButton;