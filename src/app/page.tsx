"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const PUZZLE_ROWS = 5;
const PUZZLE_COLS = 5;

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

type PuzzlePiece = {
  id: number;
  src: string;
  originalIndex: number;
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggingPiece, setDraggingPiece] = useState<PuzzlePiece | null>(null);
  const [changePiece, setChangePiece] = useState<number | null>(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = "/img/blackSpirit.jpg";
    image.onload = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;

      const pieceWidth = image.width / PUZZLE_COLS;
      const pieceHeight = image.height / PUZZLE_ROWS;

      let tempPieces: PuzzlePiece[] = [];
      let id = 0;
      for (let y = 0; y < PUZZLE_ROWS; y++) {
        for (let x = 0; x < PUZZLE_COLS; x++) {
          const pieceCanvas = document.createElement("canvas");
          pieceCanvas.width = pieceWidth;
          pieceCanvas.height = pieceHeight;
          const pieceCtx = pieceCanvas.getContext("2d");
          if (!pieceCtx) continue;

          pieceCtx.drawImage(
            image,
            x * pieceWidth,
            y * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight
          );

          tempPieces.push({
            id: id++,
            src: pieceCanvas.toDataURL(),
            originalIndex: y * PUZZLE_COLS + x,
          });
        }
      }
      setPieces(shuffleArray(tempPieces));
    };
  }, []);

  const handleDraggingPiece = (piece: PuzzlePiece) => {
    setDraggingPiece(piece);
  };

  const handleChangePiece = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    setChangePiece(index);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggingPiece === null || changePiece === null) return;
  
    const newPieces = [...pieces];
    const draggedIndex = pieces.findIndex(p => p.id === draggingPiece.id);
    [newPieces[draggedIndex], newPieces[changePiece]] = [newPieces[changePiece], newPieces[draggedIndex]];
  
    setPieces(newPieces);
    setDraggingPiece(null);
    setChangePiece(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bucket}>
        <div className={styles.puzzleBox}>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div className={styles.puzzleGrid} onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
            {pieces.map((piece, index) => (
              <img
                key={piece.id}
                src={piece.src}
                alt={`piece-${index}`}
                className={styles.puzzlePiece}
                draggable
                onDragStart={() => handleDraggingPiece(piece)}
                onDragOver={(event) => handleChangePiece(event, index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
