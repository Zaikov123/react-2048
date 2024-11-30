import React, { useContext, useEffect, useState } from "react";
import {
  addTile,
  boardEquality,
  boardInit,
  isGameOver,
} from "../utils/gameLogic";
import { Board as BoardType } from "../types/boardType";
import { Tile as TileType } from "../types/tileType";
import { Tile } from "./Tile";
import Modal from "./Modal";
import GameOver from "./GameOver";
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  determineMoveClass,
} from "../utils/moveLogic";
import { getScore } from "../utils/scoreLogic";
import { scoreManager } from "../state/scoreManager";

const Board: React.FC = () => {
  const [board, setBoard] = useState(boardInit());
  const [isOver, setIsOver] = useState(false);
  const [tileState, setTileState] = useState<{ [id: string]: string }>({});
  // const { score, updateScore } = useScore();

  const handleRestart = () => {
    setBoard(boardInit());
    setIsOver(false);
    // updateScore(-score);
    scoreManager.updateScore(-getScore);
  };

  const logBoard = (board: BoardType): void => {
    console.log("------------------------");
    board.grid.forEach((row: TileType[]) => {
      console.log(row.map((tile: TileType) => tile.value).join(" "));
    });
    console.log("------------------------");
    board.grid.forEach((row: TileType[]) => {
      console.log(row.map((tile: TileType) => tile.id).join(" "));
    });
    console.log("------------------------");
  };

  const handleMove = (moveSide: (board: BoardType) => BoardType) => {
    setTimeout(() => {
      setBoard((prevBoard) => {
        const newBoard = moveSide(prevBoard);

        if (boardEquality(prevBoard, newBoard)) return prevBoard;

        const newTileState = { ...tileState };

        newBoard.grid.forEach((row, rowIndex) => {
          row.forEach((tile, colIndex) => {
            const moveClass = `scale-90 ${determineMoveClass(prevBoard, newBoard, tile.id)}`;
            if (moveClass) {
              newTileState[tile.id] = moveClass;
              setTileState(newTileState);
            }
          });
        });

        const newBoardWithTile = addTile(newBoard);
        if (isGameOver(newBoardWithTile)) {
          setIsOver(true);
        }

        return newBoardWithTile;
      });
    }, 50);
  };

  useEffect(() => {
    scoreManager.updateScore(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          handleMove(moveUp);
          break;
        case "ArrowDown":
          handleMove(moveDown);
          break;
        case "ArrowLeft":
          handleMove(moveLeft);
          break;
        case "ArrowRight":
          handleMove(moveRight);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, []);

  useEffect(() => {
    // logBoard(board);
  }, [board]);

  return (
    <div className="container bg-slate-300 flex justify-center flex-col align-middle h-screen">
      <h1 className="text-2xl font-bold text-center text-white bg-blue-400 p-2 rounded-lg">
        Your Score: {scoreManager.getScore()}
      </h1>
      <div className="p-4 bg-slate-600 h-fit w-fit m-auto overflow-hidden">
        {board.grid.map((row: any[], rowIndex: React.Key) => (
          <div key={rowIndex} className="flex">
            {row.map((tile) => (
              <Tile
                key={tile.id}
                id={tile.id}
                value={tile.value}
                state={tileState[tile.id]}
              />
            ))}
          </div>
        ))}
      </div>
      {isOver && (
        <Modal title="Game Over">
          <GameOver onRestart={handleRestart} />
        </Modal>
      )}
    </div>
  );
};

export default Board;
