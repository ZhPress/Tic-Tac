import React, { useState } from 'react';
import ReactDOM  from 'react-dom/client';
import './index.css';
import Board from './board';


class Game extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      isRevers: false,
      Numb: [],
     };
  }

  handleClick(i) {
    const Cross = [11, 12, 13, 21, 22, 23, 31, 32, 33];
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
      return;
    } 
    squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      //Numb: this.state.Numb.push(Cross[i])
      })
    }

    jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    let isWin = Array(9).fill(false);
    const history = this.state.history;
    const Numb = this.state.Numb;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //this.setState({Numb: Numb.push(this.state.n)})

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' +  move + '# ': //+ Numb[move]
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[3];
      isWin = isWin.map((item, index) => {
      return (index === winner[0] || index === winner[1] || index === winner[2]?
      item = true: item)
      })
    } else if (this.state.stepNumber < 9) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else {
      status = 'Friendship WIN)))'
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            isWin={isWin}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol style={{flexDirection: this.state.isRevers? 'column-reverse': 'column'}}
          >{moves}</ol>
          <button onClick={() => {this.setState({isRevers: !this.state.isRevers})}}
          >{this.state.isRevers? 'Norm oder': 'Reverse'}</button>
        </div>
       </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      lines[i].push(squares[a]);
      return (lines[i]);
    }
  }
  return null;
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
