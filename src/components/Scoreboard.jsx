import Glyph from './Glyph';

// Whoever is on move (or won) gets their column filled with their colour.
const ACTIVE = { X: 'bg-x text-on-accent', O: 'bg-o text-on-accent', D: '' };

function PlayerScore({ id, label, score, active }) {
  return (
    <div
      className={
        'grid justify-items-center gap-1.5 px-2 pt-3 pb-3.5 transition-colors duration-200 not-first:border-l-2 not-first:border-edge ' +
        (active ? ACTIVE[id] : 'text-ink')
      }
    >
      <div className={'flex items-center gap-1.5 text-[.85rem] font-medium ' + (active ? '' : 'text-muted')}>
        {id !== 'D' && <Glyph player={id} chip solid={active} />}
        <span>{label}</span>
      </div>
      <div className="font-display text-[1.9rem] leading-none font-bold tabular-nums">{score}</div>
    </div>
  );
}

export default function Scoreboard({ scores, activePlayer }) {
  return (
    <section
      className="grid grid-cols-3 overflow-hidden rounded-2xl border-2 border-edge bg-panel shadow-[0_5px_0_0_var(--edge)]"
      aria-label="Scoreboard"
    >
      <PlayerScore id="X" label="Player X" score={scores.X} active={activePlayer === 'X'} />
      <PlayerScore id="D" label="Draws" score={scores.draws} active={false} />
      <PlayerScore id="O" label="Player O" score={scores.O} active={activePlayer === 'O'} />
    </section>
  );
}