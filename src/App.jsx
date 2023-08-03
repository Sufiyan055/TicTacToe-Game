import { useState } from 'react';
import './styles.scss';
import Board from './components/Board';
import { calculateWinner } from './winner';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);
  // instead of creating another useState we created variable for necxt player because code rerender and rerender helps this below value to update easily.
  // next player value is derived from state

  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? 'X' : '0';
  const statusMessage = winner
    ? `winner is ${winner}`
    : `nextPlayer is ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    //if x or 0 is already present on the clicked position than don't add x or 0. || if the winner found than also return.
    if (squares[clickedPosition] || winner) {
      return;
    }
    setSquares(currentSquares => {
      return currentSquares.map((sqaureValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : '0';
        }
        return sqaureValue;
      });
    });
    //toggle activity if ==> x or 0
    setIsXNext(currentIsNext => !currentIsNext);
  };

  return (
    <div className="app">
      {/* message ==> next turn */}
      <h2>{statusMessage}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}
//Props are used to connect the message ==> (abhi kaun hai X or 0) or board.js

export default App;
