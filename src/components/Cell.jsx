import Glyph from './Glyph';

const WIN_BG = { X: 'bg-x', O: 'bg-o' };

/**
 * One key of the board. Empty tiles sit raised; played tiles are pressed down.
 * winOrder: 0-2 = position in the winning line (drives the staggered bounce), -1 = not part of it.
 */
export default function Cell({ index, value, disabled, winOrder, dimmed, previewPlayer, onPlay, onKeyDown, buttonRef }) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const isWin = winOrder >= 0;

  const tile = isWin
    ? `${WIN_BG[value]} translate-y-[3px] shadow-[0_2px_0_0_var(--edge)] animate-win`
    : value
      ? 'bg-tile translate-y-[3px] shadow-[0_2px_0_0_var(--edge)]'
      : 'bg-tile shadow-[0_5px_0_0_var(--edge)]' +
        (disabled ? '' : ' group-hover:-translate-y-px group-active:translate-y-[3px] group-active:shadow-[0_2px_0_0_var(--edge)]');

  return (
    <button
      type="button"
      ref={buttonRef}
      className="group relative m-0 cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none [-webkit-tap-highlight-color:transparent] aria-disabled:cursor-default"
      // aria-disabled (not `disabled`) keeps the cell focusable, so keyboard focus is never lost
      aria-disabled={disabled}
      aria-label={`Row ${row}, column ${col}, ${value ?? 'empty'}`}
      onClick={() => onPlay(index)}
      onKeyDown={(e) => onKeyDown(e, index)}
    >
      <span
        className={
          'absolute inset-[6px] rounded-2xl border-2 border-edge transition duration-150 ' +
          'group-focus-visible:outline-3 group-focus-visible:outline-offset-2 group-focus-visible:outline-x ' +
          tile
        }
        style={isWin ? { animationDelay: `${winOrder * 110 + 150}ms` } : undefined}
      />

      {/* Faint preview of the current player's mark on hover / keyboard focus */}
      <span
        className={
          'pointer-events-none absolute inset-[24%] block opacity-0 transition-opacity duration-100 ' +
          (disabled ? '' : 'group-hover:opacity-25 group-focus-visible:opacity-25')
        }
      >
        {previewPlayer && <Glyph player={previewPlayer} />}
      </span>

      <span
        className={
          'pointer-events-none absolute inset-[24%] block transition-opacity duration-300 ' +
          (value ? 'translate-y-[3px] animate-pop ' : '') +
          (dimmed ? 'opacity-35' : '')
        }
      >
        {value && <Glyph player={value} animate solid={isWin} />}
      </span>
    </button>
  );
}