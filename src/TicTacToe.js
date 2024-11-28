import React, { useState, useEffect } from "react";
import Board from "./Board";
import Square from "./Square";
import './css.css'

const defaultSquares = () => new Array(9).fill(null);

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

const TicTacToe = () => {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  useEffect(() => {
    if (!isMultiplayer) {
      const isComputerTurn =
        squares.filter((square) => square !== null).length % 2 === 1;
      const putComputerAt = (index) => {
        let newSquares = [...squares];
        newSquares[index] = "o";
        setSquares(newSquares);
      };
      if (isComputerTurn && !winner) {
        const emptyIndexes = squares
          .map((square, index) => (square === null ? index : null))
          .filter((val) => val !== null);

        const randonIndex =
          emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        putComputerAt(randonIndex);
      }
    }
    checkWinner();
  }, [squares, winner, isMultiplayer]);

  const checkWinner = () => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
     
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        break;
      }
    }
  };

  const handleSquareClick = (index) => {

    const currentPlayer = squares.filter((square) => square !== null).length % 2 === 0 ? 'x' : 'o';
    
    if (!squares[index] && !winner) {
      let newSquares = [...squares];
      newSquares[index] = currentPlayer;
      setSquares(newSquares);
    }
    const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;
    if (isPlayerTurn && !squares[index] && !winner) {
      let newSquares = [...squares];
      newSquares[index] = "x";
      setSquares(newSquares);
    }
    
  };


  const toggleMode = () => {
    setSquares(defaultSquares());
    setWinner(null);
    setIsMultiplayer((prev) => !prev);
  };

  const resetGame = () => {
    setSquares(defaultSquares());
    setWinner(null);
  };

  return (
    <main>
      <div><h1 className="heading">TIC-TAC-TOE</h1></div>
      <Board>
        {squares.map((square, index) => (
          <Square
            key={index}
            x={square === "x" ? 1 : 0}
            o={square === "o" ? 1 : 0}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </Board>
      <div>
        {winner && <div>Player {winner} wins!</div>}
        <button onClick={toggleMode} className="buttontoggle">
          {isMultiplayer ? "Single Player" : "Multiplayer"}
        </button>
        <button onClick={resetGame} className="button">Reset Game</button>
      </div>
    </main>
  );
};

export default TicTacToe;