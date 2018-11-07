import React, { Component } from 'react';
import Calculator from './container/Calculator/Calculator'

import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
          <Calculator 
            numbers={NUMBERS}
            operationBtns = {OPERATION_BTNS}
            />
      </div>
    );
  }
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const OPERATION_BTNS = [
  { operation: 'Add', display: '+' },
  { operation: 'Subtract', display: '-' },
  { operation: 'Divide', display: '÷' },
  { operation: 'Multiply', display: 'x' },
  { operation: 'Evaluate', display: '=' }
]


export default App;
