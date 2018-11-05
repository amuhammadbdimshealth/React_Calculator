import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Calculator.css'
import Display from '../../components/Display/Display'
import ClearButton from '../../components/ClearButton/ClearButton'
import OperationButtons from '../../components/OperationButtons/OperationButtons'
import Numbers from '../../components/Numbers/Numbers'


class Calculator extends Component {
    state = {
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        operandOne: [], //100
        operandTwo: [], //200
        selectedOperation: "", //Add, Subtract, ...
        display: "0", //300
        operationBtns: [
            { operation: 'Add', display: '+' },
            { operation: 'Subtract', display: '-' },
            { operation: 'Divide', display: '÷' },
            { operation: 'Multiply', display: 'x' },
            { operation: 'Evaluate', display: '=' }
        ],
        doEvaluate: false
    }

    operationFunctions = {
        Add: (num1, num2) => num1 + num2,
        Subtract: (num1, num2) => num1 - num2,
        Multiply: (num1, num2) => num1 * num2,
        Divide: (num1, num2) => num1 / num2
    }

    handleClickNumber = (value) => {
        if (!this.state.selectedOperation) { //if no operation is selected yet
            const operandOne = this.state.operandOne;
            operandOne.push(value);
            this.setState({
                operandOne: operandOne,
                doEvaluate: false
            })
        } else {
            const operandTwo = this.state.operandTwo;
            operandTwo.push(value);
            this.setState({
                operandTwo: operandTwo,
                doEvaluate: false
            })
        }

    }

    clearDisplay = () => {
        console.log("Clear")
        const clearState = { ...this.state };
        clearState.operandOne = [];
        clearState.operandTwo = [];
        clearState.selectedOperation = "";
        clearState.display = "0";
        clearState.doEvaluate = false;

        this.setState(() => { return clearState });
    }

    handleClickOperation = (operation) => {
        // this.operationFunctions[operation]();
        if (operation == "Evaluate") {
            this.setState({
                doEvaluate: true
            })
            return;
        }
        this.setState({
            selectedOperation: operation,
            doEvaluate: false
        })
    }

    populateDisplayWith() {
        let displayContent;
        const isOperationSelected = this.state.selectedOperation ? true : false;
        const operandOne = Number.parseFloat(this.state.operandOne.join(''));
        const operandTwo = Number.parseFloat(this.state.operandTwo.join(''));
        const doEvaluate = this.state.doEvaluate;

        if (doEvaluate) { //evaluate operation
            const operation = this.state.selectedOperation;
            displayContent = this.operationFunctions[operation](operandOne, operandTwo);

        } else {
            if (operandOne) {
                if (!isOperationSelected) {
                    displayContent = operandOne;
                } else {
                    if (operandTwo) {
                        displayContent = operandTwo;
                    } else displayContent = this.state.selectedOperation
                }

            } else displayContent = this.state.display;
        }

        return displayContent;
    }

    render() {
        const displayContent = this.populateDisplayWith();


        return (
            <div className='calculator'>

                <Display toDisplay={displayContent} />

                <div className='button-container'>
                    <div className='numpad'>
                        <ClearButton onClick={this.clearDisplay} />
                        <Numbers
                            numbers={this.state.numbers}
                            onClick={this.handleClickNumber}
                        />
                    </div>
                    <OperationButtons
                        operationButtons={this.state.operationBtns}
                        onClick={this.handleClickOperation}
                    />
                </div>

            </div>
        );
    }

}


export default Calculator;