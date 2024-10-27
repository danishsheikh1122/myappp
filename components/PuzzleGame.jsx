"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default function PuzzleGame() {
  const [tiles, setTiles] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [moves, setMoves] = useState(0)

  const initializeGame = useCallback(() => {
    const initialTiles = Array.from({ length: 15 }, (_, i) => i + 1)
    initialTiles.push(null) // Empty tile
    shuffleArray(initialTiles)
    setTiles(initialTiles)
    setIsSolved(false)
    setMoves(0)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const moveTile = useCallback(
    (index) => {
      const emptyIndex = tiles.indexOf(null)
      const isValidMove = [index - 1, index + 1, index - 4, index + 4].includes(emptyIndex)

      if (isValidMove) {
        const newTiles = [...tiles]
        ;[newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]]
        setTiles(newTiles)
        setMoves((prevMoves) => prevMoves + 1)

        const solved = newTiles.slice(0, 15).every((val, i) => val === i + 1)
        setIsSolved(solved)
      }
    },
    [tiles]
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">15 Puzzle Game</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {tiles.map((tile, index) => (
            <Button
              key={index}
              onClick={() => moveTile(index)}
              className={`h-20 w-20 text-2xl font-semibold ${
                tile
                  ? isSolved
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-primary hover:bg-primary/90"
                  : "bg-secondary hover:bg-secondary/90"
              } ${!tile ? "cursor-default" : ""}`}
              disabled={!tile}
            >
              {tile}
            </Button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Moves: {moves}</p>
          <Button onClick={initializeGame} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
        {isSolved && (
          <p className="mt-4 text-center text-lg font-semibold text-green-600">
            Congratulations! You solved the puzzle in {moves} moves!
          </p>
        )}
      </CardContent>
    </Card>
  )
}