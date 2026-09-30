import Glyph from './Glyph';

const TEXT = { X: 'text-x', O: 'text-o' };

/** Live status line. role="status" makes screen readers announce every change. */
export default function Status({ turn, result }) {
  let content;

  if (result.status === 'playing') {
    content = (
      <>
        <Glyph player={turn} chip className="size-[1.5em]" />
        <span>
          <b className={TEXT[turn]}>{turn}</b> to play
        </span>
      </>
    );
  } else if (result.status === 'win') {
    content = (
      <>
        <Glyph player={result.winner} chip className="size-[1.5em]" />
        <span>
          <b className={TEXT[result.winner]}>{result.winner}</b> wins this round
        </span>
      </>
    );
  } else {
    content = <span>Draw. Nobody wins this round.</span>;
  }

  return (
    <p
      // key restarts the pop animation each time the message changes
      key={result.status + turn}
      className="m-0 flex min-h-[2.4em] animate-pop items-center justify-center gap-2.5 text-center font-display text-[1.05rem] font-medium"
      role="status"
      aria-live="polite"
    >
      {content}
    </p>
  );
}