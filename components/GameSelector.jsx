"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const games = [
  { name: "Sudoku", id: "sudoku" },
  { name: "15 Puzzle", id: "puzzle" },
  { name: "Memory Match", id: "memory" },
  { name: "Tic Tac Toe", id: "tictactoe" },
];

export default function GameSelector() {
  const { gameId } = useParams();
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-center mb-4">Choose a Game</h1>
          <ul className="space-y-2">
            {games.map((game) => (
              <li key={game.id}>
                <Link
                  href={`/games/${game.id}`}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    pathname === `/games/${game.id}`
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                >
                  {game.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
