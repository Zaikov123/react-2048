import { Board } from "../types/boardType";
import { Tile } from "../types/tileType";
import { cloneDeep } from "lodash";
import { moveUp, moveDown, moveLeft, moveRight } from "./moveLogic";

const ROWS = 4;
const COLS = 4;

export const createTile = (value: number): Tile => ({
  id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  value,
});

export const boardInit = () => {
  const board: Board = {
    grid: Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => createTile(0))
      ),
  };

  return addTile(addTile(board));
};

export const addTile = (board: Board): Board => {
  const newBoard = cloneDeep(board);

  const randTile = Math.random() > 0.7 ? 4 : 2;

  let added = false;
  while (!added) {
    const randRow = Math.floor(Math.random() * ROWS);
    const randCol = Math.floor(Math.random() * COLS);

    if (newBoard.grid[randRow][randCol].value === 0) {
      const createdTile = createTile(randTile);
      newBoard.grid[randRow][randCol] = createdTile;

     
      
      added = true;
    }
  }

  return newBoard;
};

export const isGameOver = (board: Board): boolean => {
  if (
      boardEquality(moveDown(board), board) 
      && boardEquality(moveUp(board), board)
      && boardEquality(moveRight(board), board)
      && boardEquality(moveLeft(board), board)
    )
    {
      return true
    }
    return false;
};

export const boardEquality = (board1: Board, board2: Board) => {
  if (board1.grid.length !== board2.grid.length) return false;

  for (let i = 0; i < board1.grid.length; i++) {
    if (board1.grid[i].length !== board2.grid[i].length) return false;

    for (let j = 0; j < board1.grid[i].length; j++) {
      if (board1.grid[i][j].value !== board2.grid[i][j].value) return false;
    }
  }

  return true;
};

export const findTileCoordinates = (
  board: Board,
  id: string
): [number, number] | null => {
  for (let row = 0; row < board.grid.length; row++) {
    for (let col = 0; col < board.grid[row].length; col++) {
      if (board.grid[row][col].id === id) {
        return [row, col];
      }
    }
  }
  return null;
};

