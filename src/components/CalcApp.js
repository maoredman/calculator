import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'OP',
      prevnumber: 0,
      currentnumber: 0,
      prevoperator: '',
      display: 0,
      reset: true,
    };
    this.clickNumber = this.clickNumber.bind(this);
    this.clickOperator = this.clickOperator.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({ mode: 'OP', prevnumber: 0, currentnumber: 0, prevoperator: '', display: 0, reset: true });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  clickNumber(clickednumber) {
    if (this.state.mode === 'OP') {
      if (this.state.reset) {
        this.setState({ prevnumber: clickednumber });
      }
      this.setState({ currentnumber: clickednumber, mode: 'NUM', display: clickednumber });
    } else if (this.state.mode === 'NUM') {
      const newCurrentNumber = this.state.currentnumber * 10 + clickednumber;
      if (this.state.reset) {
        this.setState({ prevnumber: newCurrentNumber });
      }
      this.setState({ currentnumber: newCurrentNumber, display: newCurrentNumber });
    } else if (this.state.mode === 'RESULT') {
      this.resetState();
      this.setState({ currentnumber: clickednumber, prevnumber: clickednumber, mode: 'NUM', display: clickednumber });
    }
  }

  clickOperator(operator) {
    let usedToBeReset = false;
    if (this.state.reset) {
      this.setState({ reset: false });
      usedToBeReset = true;
    }

    if (operator === '=') { // operator === '='
      if (this.state.mode === 'OP') {
        this.setState({ prevoperator: operator });
      } else if (this.state.mode === 'NUM') {
        let newPrevNumber = this.calculate(this.state.prevnumber, this.state.prevoperator, this.state.currentnumber);
        if (usedToBeReset) {
          newPrevNumber = this.state.prevnumber;
        }
        this.setState({
          prevnumber: newPrevNumber,
          mode: 'RESULT',
          display: newPrevNumber,
        });
      } else if (this.state.mode === 'RESULT') {
        const newPrevNumber = this.calculate(this.state.prevnumber, this.state.prevoperator, this.state.currentnumber);
        this.setState({
          prevnumber: newPrevNumber,
          display: newPrevNumber,
        });
      }
    } else { // operator !== '='
        if (this.state.mode === 'OP') {
          this.setState({ prevoperator: operator });
        } else if (this.state.mode === 'NUM') {
          let newPrevNumber = this.calculate(this.state.prevnumber, this.state.prevoperator, this.state.currentnumber);
          if (usedToBeReset) {
            newPrevNumber = this.state.prevnumber;
          }
          this.setState({
            prevnumber: newPrevNumber,
            mode: 'OP',
            currentnumber: 0,
            display: newPrevNumber,
            prevoperator: operator,
          });
        } else if (this.state.mode === 'RESULT') {
          this.setState({ currentnumber: 0, mode: 'OP', prevoperator: operator });
        }
    }
  }

  calculate(num1, operator, num2) {
    switch (operator) {
      case 'x':
        return num1 * num2;
      case '/':
        return num1 / num2;
      case '-':
        return num1 - num2;
      case '+':
        return num1 + num2;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="calc-app">
        <h1 className="title">Ye Old Math Machine</h1>
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.clickOperator('/')}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.clickNumber(7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.clickNumber(8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.clickNumber(9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.clickOperator('x')}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.clickNumber(4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.clickNumber(5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.clickNumber(6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.clickOperator('-')}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.clickNumber(1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.clickNumber(2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.clickNumber(3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.clickOperator('+')}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick={() => this.clickNumber(0)}>0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.clickOperator('=')}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
