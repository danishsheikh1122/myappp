'use client'
// app/games/[gameId]/page.js
import PuzzleGame from "@/components/PuzzleGame";
import Sudoku from "@/components/Sudoku";
import MemoryMatch from "@/components/MemoryMatch";
import TicTacToe from "@/components/TicTacToe";
import { useParams } from "next/navigation"; // Correct import for App Router

const GamePage = () => {
  const { gameId } = useParams(); // Retrieve the dynamic segment gameId

  const renderGame = () => {
    switch (gameId) {
      case "puzzle":
        return <PuzzleGame />;
      case "sudoku":
        return <Sudoku />;
      case "memory":
        return <MemoryMatch />;
      case "tictactoe":
        return <TicTacToe />;
      default:
        return <p>Invalid game selected.</p>;
    }
  };

  return <div className="min-h-screen flex flex-col items-center justify-center">{renderGame()}</div>;
};

export default GamePage;
