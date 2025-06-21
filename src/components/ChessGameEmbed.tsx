import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';

interface ChessGameEmbedProps {
  gameId: string;
  title?: string;
}

const ChessGameEmbed: React.FC<ChessGameEmbedProps> = ({
  gameId,
  title = "Chess Game"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add the event listener for the responsive iframe height
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.id === gameId && containerRef.current) {
        const iframe = containerRef.current.querySelector(`iframe#${gameId}`) as HTMLIFrameElement | null;
        if (iframe) {
          // Adjust height to be more compact to ensure the entire board is visible
          // The original +37 was making it too tall
          iframe.style.height = `${e.data.frameHeight}px`;
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [gameId]);

  return (
    <div className="chess-game-embed">
      <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            {title}
          </h3>
          <div className="chess-board-container" ref={containerRef}>
            <iframe 
              id={gameId}
              title={title}
              frameBorder="0"
              allowTransparency={true}
              className="w-full max-w-2xl border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mx-auto block"
              style={{ 
                minHeight: '450px',
              }}
              src={`https://www.chess.com/emboard?id=${gameId}`}
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChessGameEmbed;