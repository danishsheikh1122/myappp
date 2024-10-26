"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, User, Cpu } from "lucide-react"

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const calculateWinner = (board) => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

const findBestMove = (board) => {
  let bestScore = -Infinity
  let move = -1

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board]
      newBoard[i] = "O"
      const score = minimax(newBoard, 0, false)
      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  return move
}

const minimax = (board, depth, isMaximizing) => {
  const winner = calculateWinner(board)
  if (winner === "O") return 10 - depth
  if (winner === "X") return depth - 10
  if (board.every((cell) => cell !== null)) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board]
        newBoard[i] = "O"
        const score = minimax(newBoard, depth + 1, false)
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board]
        newBoard[i] = "X"
        const score = minimax(newBoard, depth + 1, true)
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

export default function TicTacToe() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    isXNext: true,
    winner: null,
    isDraw: false,
  })

  const handleMove = useCallback(
    (index) => {
      if (gameState.board[index] || gameState.winner || gameState.isDraw) return

      setGameState((prevState) => {
        const newBoard = [...prevState.board]
        newBoard[index] = "X"
        const winner = calculateWinner(newBoard)
        const isDraw = !winner && newBoard.every((cell) => cell !== null)

        return {
          board: newBoard,
          isXNext: false,
          winner,
          isDraw,
        }
      })
    },
    [gameState]
  )

  useEffect(() => {
    if (!gameState.isXNext && !gameState.winner && !gameState.isDraw) {
      const timer = setTimeout(() => {
        const bestMove = findBestMove(gameState.board)
        if (bestMove !== -1) {
          setGameState((prevState) => {
            const newBoard = [...prevState.board]
            newBoard[bestMove] = "O"
            const winner = calculateWinner(newBoard)
            const isDraw = !winner && newBoard.every((cell) => cell !== null)

            return {
              board: newBoard,
              isXNext: true,
              winner,
              isDraw,
            }
          })
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [gameState])

  const resetGame = useCallback(() => {
    setGameState({
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
      isDraw: false,
    })
  }, [])

  const renderCell = useCallback(
    (index) => {
      const value = gameState.board[index]
      return (
        <Button
          key={index}
          onClick={() => handleMove(index)}
          className="h-20 w-20 text-3xl font-bold"
          variant={value === "X" ? "default" : value === "O" ? "secondary" : "outline"}
          disabled={!!value || !!gameState.winner || gameState.isDraw || !gameState.isXNext}
        >
          {value}
        </Button>
      )
    },
    [gameState, handleMove]
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Tic-Tac-Toe vs AI</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {gameState.board.map((_, index) => renderCell(index))}
        </div>
        <div className="text-center">
          {gameState.winner && (
            <p className="text-lg font-semibold text-green-600 mb-2">
              <AlertCircle className="inline-block mr-2" />
              {gameState.winner === "X" ? (
                <>
                  <User className="inline-block mr-2" /> You Win!
                </>
              ) : (
                <>
                  <Cpu className="inline-block mr-2" /> AI Wins!
                </>
              )}
            </p>
          )}
          {gameState.isDraw && (
            <p className="text-lg font-semibold text-yellow-600 mb-2">
              <AlertCircle className="inline-block mr-2" />
              Itss a Draw!
            </p>
          )}
          {!gameState.winner && !gameState.isDraw && (
            <p className="text-lg font-semibold mb-2">
              {gameState.isXNext ? (
                <>
                  <User className="inline-block mr-2" /> Your Turn
                </>
              ) : (
                <>
                  <Cpu className="inline-block mr-2" /> AI is thinking...
                </>
              )}
            </p>
          )}
          <Button onClick={resetGame} className="mt-2">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}