import React from 'react';
import './Number.css'

const Number = (props) => {
    const value = props.value;
    return (
        <button className='number-btn'
            onClick={() => { props.onClick(value) }}>
            {props.value}

        </button>
    );
};

export default Number;