"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

const cardValues = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍎", "🍌", "🍒", "🍇", "🍉", "🍓"]

export default function MemoryMatch() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardValues].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
  }, [])

  useEffect(() => {
    shuffleCards()
  }, [shuffleCards])

  const handleFlip = useCallback(
    (index) => {
      if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index])) return

      const newFlipped = [...flipped, index]
      setFlipped(newFlipped)
      setMoves((prevMoves) => prevMoves + 1)

      if (newFlipped.length === 2) {
        const [firstIndex, secondIndex] = newFlipped
        if (cards[firstIndex] === cards[secondIndex]) {
          setMatched((prevMatched) => [...prevMatched, cards[firstIndex]])
          setFlipped([])
        } else {
          setTimeout(() => setFlipped([]), 1000)
        }
      }
    },
    [flipped, matched, cards]
  )

  const isGameComplete = matched.length === cardValues.length / 2

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Memory Match</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {cards.map((card, index) => (
            <Button
              key={index}
              onClick={() => handleFlip(index)}
              className={`h-16 w-16 text-2xl font-semibold ${
                flipped.includes(index) || matched.includes(card)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
              disabled={flipped.length === 2 || matched.includes(card)}
            >
              {flipped.includes(index) || matched.includes(card) ? card : "?"}
            </Button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Moves: {moves}</p>
          <Button onClick={shuffleCards} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
        {isGameComplete && (
          <p className="mt-4 text-center text-lg font-semibold text-green-600">
            Congratulations! You have completed the game in {moves} moves!
          </p>
        )}
      </CardContent>
    </Card>
  )
}