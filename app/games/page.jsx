// app/games/page.js
import GameSelector from "@/components/GameSelector";

export default function GamesHome() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <GameSelector />
    </div>
  );
}
