import React, { useState } from 'react';


function Square({value, onClick, isWin}) {
    return (
      <button className="square" onClick={onClick}
      style={{backgroundColor: isWin? 'red': ''}}
      >
        {value}
      </button>
    );
  }

  export default Square