import React from 'react';
import OperationButton from './OperationButton/OperationButton'
import './OperationButtons.css'


const OperationButtons = (props) => {
    
    return (
        <div className='operations'>
            {
                props.operationButtons.map(operationBtn => {
                    const operation = operationBtn.operation;
                    return <OperationButton
                        key={operationBtn.operation}                        
                        display={operationBtn.display}
                        onClick={props.onClick.bind(this,operation)}
                    />
                })
            }
        </div>
    );
};

export default OperationButtons;