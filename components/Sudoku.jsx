"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

const isValidInput = (value) => value === "" || (value >= 1 && value <= 9)

export default function Sudoku() {
  const [board, setBoard] = useState(initialBoard)

  const handleInputChange = useCallback((row, col, value) => {
    setBoard((prevBoard) =>
      prevBoard.map((r, rowIndex) =>
        r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
      )
    )
  }, [])

  const resetBoard = useCallback(() => {
    setBoard(initialBoard)
  }, [])

  const renderCell = useCallback(
    (cell, rowIndex, colIndex) => {
      const isInitialValue = initialBoard[rowIndex][colIndex] !== 0
      return (
        <input
          key={`${rowIndex}-${colIndex}`}
          type="number"
          value={cell === 0 ? "" : cell}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0
            if (isValidInput(value)) handleInputChange(rowIndex, colIndex, value)
          }}
          className={`w-10 h-10 text-center font-semibold border ${
            isInitialValue ? "bg-gray-100 text-gray-700" : "bg-white"
          } ${
            (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
              ? "border-gray-300"
              : "border-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          min="1"
          max="9"
          readOnly={isInitialValue}
        />
      )
    },
    [handleInputChange]
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sudoku</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-9 gap-px mb-4 bg-gray-300 p-px">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button onClick={resetBoard}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Board
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}