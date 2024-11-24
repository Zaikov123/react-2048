import { scoreManager } from "../state/scoreManager";
import { Board } from "../types/boardType";
import { Tile } from "../types/tileType";
import { createTile, findTileCoordinates } from "./gameLogic";
import { cloneDeep, isNull } from "lodash";

const merge = (array: Tile[]): Tile[] => {
  const result = array
    .map((tile) => ({ ...tile }))
    .filter((tile) => tile.value !== 0);

  for (let i = 0; i < result.length - 1; i++) {
    if (result[i].value === result[i + 1].value) {
      result[i].value *= 2;
      scoreManager.updateScore(result[i].value);
      result.splice(i + 1, 1);
      i--;
    }
  }

  while (result.length < array.length) {
    result.push(createTile(0));
  }
  return result;
};

export const moveUp = (board: Board,): Board => {
  const newBoard = cloneDeep(board);

  for (let col = 0; col < newBoard.grid[0].length; col++) {
    const column = newBoard.grid.map((row) => row[col]);
    const mergedColumn = merge(column);
    for (let row = 0; row < newBoard.grid.length; row++) {
      newBoard.grid[row][col] = mergedColumn[row];
    }
  }

  return newBoard;
};

export const moveDown = (board: Board) => {
  const newBoard = cloneDeep(board);

  for (let col = 0; col < board.grid[0].length; col++) {
    const column = board.grid.map((row) => row[col]).reverse();
    const mergedColumn = merge(column).reverse();
    for (let row = 0; row < board.grid.length; row++) {
      newBoard.grid[row][col] = mergedColumn[row];
    }
  }

  return newBoard;
};

export const moveLeft = (board: Board) => {
  const newBoard = cloneDeep(board);

  for (let row = 0; row < newBoard.grid.length; row++) {
    const mergedRow = merge(newBoard.grid[row]);
    newBoard.grid[row] = mergedRow;
  }

  return newBoard;
};

export const moveRight = (board: Board) => {
  const newBoard = cloneDeep(board);

  for (let row = 0; row < newBoard.grid.length; row++) {
    const mergedRow = merge(newBoard.grid[row].reverse()).reverse();
    newBoard.grid[row] = mergedRow;
  }

  return newBoard;
};

export const determineMoveClass = (
  prevBoard: Board,
  actualBoard: Board,
  tileId: string
): string => {
  const oldCoords = findTileCoordinates(prevBoard, tileId);
  const newCoords = findTileCoordinates(actualBoard, tileId);

  if (!isNull(oldCoords) && !isNull(newCoords)) {
    const [oldRow, oldCol] = oldCoords;
    const [newRow, newCol] = newCoords;

    const translateClass = `translate-${
      calculateTranslateDistance(prevBoard, actualBoard, tileId) * 16
    }`;
    if (oldRow < newRow) {
      return `-translate-y-${translateClass}`;
    }
    if (oldRow > newRow) {
      return `translate-y-${translateClass}`;
    }
    if (oldCol < newCol) {
      return `-translate-x-${translateClass}`;
    }
    if (oldCol > newCol) {
      return `translate-x-${translateClass}`;
    }
  }
  return "";
};

export const calculateTranslateDistance = (
  prevBoard: Board,
  actualBoard: Board,
  tileId: string
): number => {
  const oldCoords = findTileCoordinates(prevBoard, tileId);
  const newCoords = findTileCoordinates(actualBoard, tileId);

  if (!isNull(oldCoords) && !isNull(newCoords)) {
    const [oldRow, oldCol] = oldCoords;
    const [newRow, newCol] = newCoords;

    if (oldRow !== newRow) {
      return Math.abs(newRow - oldRow);
    }
    if (oldCol !== newCol) {
      return Math.abs(newCol - oldCol);
    }
  }
  return 0;
};
