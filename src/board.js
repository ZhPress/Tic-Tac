import React, { useState } from 'react';
import Square from "./square";
  
  function Board (props) {
    
       const [isWin, setIsWin] = useState(Array(9).fill(false))
    
       function renderSquare(i) {
      return <Square 
      isWin = {isWin[i]}
      value={props.squares[i]}
      onClick={() => props.onClick(i)}/>;
    }
    function win(combo) {
        if (combo) {
		let copy = Object.assign([], isWin);
		copy.map(item => item = true);
		setIsWin(copy)  
        }
        return (isWin, console.log(isWin))
      }
        return (
        <div>
        <p>{win(props.combo)}</p>
          <div className="status"></div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
    }

    export default Board