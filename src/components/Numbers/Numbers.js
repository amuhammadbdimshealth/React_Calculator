import React from 'react';
import Number from './Number/Number'

const Numbers = (props) => {
    const numbers = props.numbers;
    return (
        numbers.map(number => {
            return (
                <Number
                    key={number}
                    value={number}
                    onClick={props.onClick} />
            );
        })
    );
};

export default Numbers;