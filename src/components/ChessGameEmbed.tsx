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
          // Set a fixed height that shows the complete board
          iframe.style.height = '600px';
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
          style={{ 
            width: '100%', 
            maxWidth: '600px', // Increased max width
            border: 'none',
            height: '600px', // Fixed height that shows the complete board
            margin: '0 auto',
            display: 'block'
          }}
          // Add layout parameters to show a more compact board
          src={`https://www.chess.com/emboard?id=${gameId}&layout=minimal&boardSize=large`}
        ></iframe>
      </div>
      
      {/* Add responsive styles inline */}
      <style jsx>{`
        .chess-board-container {
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
          overflow: visible !important;
        }
        
        .chess-game-embed {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

export default ChessGameEmbed;