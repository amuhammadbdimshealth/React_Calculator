import React, { Component } from 'react';


import './Calculator.css'
import Display from '../../components/Display/Display'
import ClearButton from '../../components/ClearButton/ClearButton'
import OperationButtons from '../../components/OperationButtons/OperationButtons'
import Numbers from '../../components/Numbers/Numbers'


class Calculator extends Component {
    state = {
        operandOne: [], //100
        operandTwo: [], //200
        selectedOperation: "", //Add, Subtract, ... 
        selectedChainedOperation: "",       
        doEvaluate: false,
        resultHistory: []
    }

    operationFunctions = {
        Add: (num1, num2) => num1 + num2,
        Subtract: (num1, num2) => num1 - num2,
        Multiply: (num1, num2) => num1 * num2,
        Divide: (num1, num2) => num1 / num2
    }


    componentDidUpdate() {
        // once evaluation is done switch off the doEvaluation 
        const resultHistoryLastIndex = this.state.resultHistory.length - 1;

        if (this.state.doEvaluate) {
            const clearState = {
                ...this.state,
                operandOne: this.state.resultHistory[resultHistoryLastIndex].toString().split(''),
                operandTwo: [],
                selectedOperation: this.state.selectedChainedOperation,
                selectedChainedOperation: "",
                doEvaluate: false
            };

            this.setState(() => { return clearState });
        }
        // also clear the operands and selected state
    }

    handleClickNumber = (value) => {
        //check if operandOne already exists from previous history        
        const hasCalculationtHistory = this.state.resultHistory.length ? true : false;
              
        if (!this.state.selectedOperation) { //if no operation is selected yet
            const operandOne = hasCalculationtHistory ? [] : this.state.operandOne;
            operandOne.push(value);
            this.setState({
                operandOne: operandOne,
                doEvaluate: false,
                resultHistory: []
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
        const clearState = {
            ...this.state,
            operandOne: [],
            operandTwo: [],
            selectedOperation: "",
            selectedChainedOperation: "",            
            doEvaluate: false,
            display: "0",
            resultHistory: []
        }
        this.setState(() => { return clearState });
    }

    handleClickOperation = (operation) => { //Add, Subtract, Divide, Multiply, Evaluate

        const operandOne = Number.parseFloat(this.state.operandOne.join(''));
        const operandTwo = Number.parseFloat(this.state.operandTwo.join(''));
        const hasClickedEqualTo = (operation === "Evaluate");
        const hasOperandTwo = operandTwo ? true : false;        
        //override if Evaluate clicked
        const calculationType = this.state.selectedOperation;

        if (!operandOne || (!hasOperandTwo && hasClickedEqualTo)) return;
        if (hasOperandTwo) { //evaluate if operandTwo exists and cliked any Operation
            const result = this.operationFunctions[calculationType](operandOne, operandTwo)
            const resultHistory = [...this.state.resultHistory];
            resultHistory.push(result);
            let selectedChainedOperation = "";
            if (!hasClickedEqualTo) {
                selectedChainedOperation = operation;
            }
            this.setState({
                doEvaluate: true,
                resultHistory: resultHistory,
                selectedChainedOperation: selectedChainedOperation
            })
            return;
        }
        this.setState({
            selectedOperation: operation, //never set selected operation as "=".Set only (+ - / x)
            doEvaluate: false
        })
    }

    populateDisplayWith() {
        let displayContent = "0";
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
                    } else displayContent = operandOne
                }

            } 
        }

        return displayContent;
    }

    render() {
        const displayContent = this.populateDisplayWith();


        return (
            <div className='calculator'>
                <Display
                    toDisplayNumber={displayContent}
                    toDisplayOperation={this.state.selectedOperation}
                />
                <div className='button-container'>
                    <div className='numpad'>
                        <ClearButton onClick={this.clearDisplay} />
                        <Numbers
                            numbers={this.props.numbers}
                            onClick={this.handleClickNumber}
                        />
                    </div>
                    <OperationButtons
                        operationButtons={this.props.operationBtns}
                        onClick={this.handleClickOperation}
                    />
                </div>

            </div>
        );
    }

}


export default Calculator;