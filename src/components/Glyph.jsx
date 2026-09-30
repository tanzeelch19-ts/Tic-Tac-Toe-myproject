// Ink-draw animation: plays when a mark mounts, i.e. when a player places it
const INK =
  '**:[stroke-dasharray:1] **:[stroke-dashoffset:1] **:animate-ink [&>:nth-child(2)]:[animation-delay:.16s]';

const BASE = 'block fill-none [stroke-linecap:round] [stroke-linejoin:round]';

/**
 * The X / O drawing, as SVG.
 * - animate: play the "ink" draw-in animation
 * - chip: small inline version (scoreboard, status); pass the size via className
 * - solid: draw in the "on accent" colour (for marks sitting on a coloured background)
 */
export default function Glyph({ player, animate = false, chip = false, solid = false, className = '' }) {
  const tone = solid ? 'stroke-on-accent' : player === 'X' ? 'stroke-x' : 'stroke-o';
  const classes = [
    BASE,
    tone,
    chip ? 'flex-none stroke-13 size-[1.1em]' : 'size-full stroke-10',
    animate && INK,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (player === 'X') {
    return (
      <svg className={classes} viewBox="0 0 100 100" aria-hidden="true">
        <path pathLength="1" d="M24 24 L76 76" />
        <path pathLength="1" d="M76 24 L24 76" />
      </svg>
    );
  }

  return (
    <svg className={classes} viewBox="0 0 100 100" aria-hidden="true">
      <circle pathLength="1" cx="50" cy="50" r="27" transform="rotate(-90 50 50)" />
    </svg>
  );
}