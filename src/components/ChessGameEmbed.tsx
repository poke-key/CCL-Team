import React, { useEffect, useRef } from 'react';

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
          iframe.style.height = `${e.data.frameHeight + 37}px`;
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
      <h3 className="text-xl font-medium text-gray-800 mb-3">{title}</h3>
      <div className="chess-board-container" ref={containerRef}>
        <iframe 
          id={gameId}
          title={title}
          frameBorder="0"
          allowTransparency={true}
          style={{ width: '100%', border: 'none' }}
          src={`https://www.chess.com/emboard?id=${gameId}`}
        ></iframe>
      </div>
    </div>
  );
};

export default ChessGameEmbed;