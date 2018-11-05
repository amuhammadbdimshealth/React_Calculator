import React from 'react';
import './OperationButton.css'

const OperationButton = (props) => {
    return (
        <button className="operation-btn"
            onClick={props.onClick}>
            {props.display}
        </button>

    );
};

export default OperationButton;