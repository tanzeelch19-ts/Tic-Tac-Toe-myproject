import { useRef } from 'react';
import Cell from './Cell';

const ARROW_KEYS = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

export default function Board({ board, turn, result, onPlay }) {
  const cellRefs = useRef([]);
  const playing = result.status === 'playing';
  const winLine = result.status === 'win' ? result.line : null;

  // Arrow keys move focus between cells (Enter / Space place a mark natively via the button)
  const handleKeyDown = (e, index) => {
    const delta = ARROW_KEYS[e.key];
    if (!delta) return;
    e.preventDefault();
    const col = (index % 3) + delta[0];
    const row = Math.floor(index / 3) + delta[1];
    if (col < 0 || col > 2 || row < 0 || row > 2) return;
    cellRefs.current[row * 3 + col]?.focus();
  };

  return (
    <div className="mx-auto aspect-square w-[min(100%,420px,56svh)] rounded-[28px] border-2 border-edge bg-panel p-1.5 shadow-[0_6px_0_0_var(--edge)]">
      <div className="grid size-full grid-cols-3 grid-rows-3" role="group" aria-label="Game board">
        {board.map((value, i) => (
          <Cell
            key={i}
            index={i}
            value={value}
            disabled={!playing || Boolean(value)}
            winOrder={winLine ? winLine.indexOf(i) : -1}
            dimmed={Boolean(winLine) && !winLine.includes(i)}
            previewPlayer={!value && playing ? turn : null}
            onPlay={onPlay}
            onKeyDown={handleKeyDown}
            buttonRef={(el) => {
              cellRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}