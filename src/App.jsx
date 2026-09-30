import Scoreboard from './components/Scoreboard';
import Board from './components/Board';
import Status from './components/Status';
import Button from './components/Button';
import ThemeToggle from './components/ThemeToggle';
import useTicTacToe from './hooks/useTicTacToe';

export default function App() {
  const { board, turn, result, scores, activePlayer, play, restart, resetScores } = useTicTacToe();

  return (
    <main className="grid w-[min(100%,440px)] gap-5">
      <header className="relative flex items-center justify-center">
        <h1 className="m-0 font-display text-[clamp(1.5rem,7vw,2.2rem)] font-bold tracking-[-0.03em]">Tic-Tac-Toe</h1>
        <div className="absolute right-0">
          <ThemeToggle />
        </div>
      </header>

      <Scoreboard scores={scores} activePlayer={activePlayer} />
      <Board board={board} turn={turn} result={result} onPlay={play} />
      <Status turn={turn} result={result} />

      <div className="flex flex-wrap justify-center gap-3 pb-1">
        <Button variant="primary" onClick={restart}>
          Restart game
        </Button>
        <Button onClick={resetScores}>Reset scores</Button>
      </div>
    </main>
  );
}