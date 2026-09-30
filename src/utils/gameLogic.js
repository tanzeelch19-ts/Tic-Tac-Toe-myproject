/**
 * Pure game logic. No React, no DOM, so it is trivial to unit test.
 * Board is an array of 9 cells: 'X' | 'O' | null (index 0 = top-left, 8 = bottom-right).
 */

export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export const EMPTY_BOARD = Object.freeze(Array(9).fill(null));

export const otherPlayer = (player) => (player === 'X' ? 'O' : 'X');

/**
 * @param {Array<'X'|'O'|null>} board
 * @returns {{status:'playing'} | {status:'draw'} | {status:'win', winner:'X'|'O', line:number[]}}
 */
export function getResult(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { status: 'win', winner: board[a], line };
    }
  }
  if (board.every(Boolean)) return { status: 'draw' };
  return { status: 'playing' };
}

/**
 * Coordinates (in a 300x300 viewBox) of the strike-through line for a winning line,
 * extended slightly past the outer marks.
 * @returns {[number, number, number, number]} x1, y1, x2, y2
 */
export function getStrikeCoords(line) {
  const center = (i) => [(i % 3) * 100 + 50, Math.floor(i / 3) * 100 + 50];
  const [x1, y1] = center(line[0]);
  const [x2, y2] = center(line[2]);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const pad = 30;
  return [x1 - ux * pad, y1 - uy * pad, x2 + ux * pad, y2 + uy * pad].map((n) => Number(n.toFixed(1)));
}