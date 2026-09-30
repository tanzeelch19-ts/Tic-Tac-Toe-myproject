import { useCallback, useEffect, useReducer } from 'react';
import { EMPTY_BOARD, getResult, otherPlayer } from '../utils/gameLogic';

const STORE_KEY = 'ttt:scores';
const ZERO_SCORES = { X: 0, O: 0, draws: 0 };

/* ---------- Score persistence (optional; the game works without storage) ---------- */

function loadScores() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    const valid = saved && ['X', 'O', 'draws'].every((k) => Number.isInteger(saved[k]) && saved[k] >= 0);
    if (valid) return saved;
  } catch {
    /* storage unavailable or corrupted: fall through to defaults */
  }
  return ZERO_SCORES;
}

/* ---------- Reducer ---------- */

function init() {
  return {
    board: EMPTY_BOARD,
    turn: 'X',
    starter: 'X', // alternates after every finished round
    result: { status: 'playing' },
    scores: loadScores(),
  };
}

function startRound(state, starter) {
  return { ...state, board: EMPTY_BOARD, turn: starter, starter, result: { status: 'playing' } };
}

function reducer(state, action) {
  switch (action.type) {
    case 'PLAY': {
      const { index } = action;
      if (state.result.status !== 'playing' || state.board[index]) return state;

      const board = state.board.map((cell, i) => (i === index ? state.turn : cell));
      const result = getResult(board);

      let scores = state.scores;
      if (result.status === 'win') scores = { ...scores, [result.winner]: scores[result.winner] + 1 };
      if (result.status === 'draw') scores = { ...scores, draws: scores.draws + 1 };

      return {
        ...state,
        board,
        result,
        scores,
        turn: result.status === 'playing' ? otherPlayer(state.turn) : state.turn,
      };
    }

    case 'RESTART': {
      // Restarting mid-round keeps the same starter; after a finished round the other player starts.
      const starter = state.result.status === 'playing' ? state.starter : otherPlayer(state.starter);
      return startRound(state, starter);
    }

    case 'RESET_SCORES':
      return { ...startRound(state, 'X'), scores: ZERO_SCORES };

    default:
      return state;
  }
}

/* ---------- Hook ---------- */

export default function useTicTacToe() {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state.scores));
    } catch {
      /* ignore */
    }
  }, [state.scores]);

  const play = useCallback((index) => dispatch({ type: 'PLAY', index }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);
  const resetScores = useCallback(() => dispatch({ type: 'RESET_SCORES' }), []);

  // Whose column is highlighted in the scoreboard: the player on move, or the winner.
  const activePlayer =
    state.result.status === 'playing' ? state.turn : state.result.status === 'win' ? state.result.winner : null;

  return { ...state, activePlayer, play, restart, resetScores };
}