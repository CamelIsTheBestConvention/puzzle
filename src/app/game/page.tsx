"use client";
import ImgModal from "@/components/ImgModal";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Timer from "./components/Timer";

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

type PuzzlePiece = {
  id: number;
  src: string;
  originalIndex: number;
};

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggingPiece, setDraggingPiece] = useState<PuzzlePiece | null>(null);
  const [changePiece, setChangePiece] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [puzzle, setPuzzle] = useState<number>(1000);
  const [puzzleSize, setPuzzleSize] = useState<number>(1);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showImg, setShowImg] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const router = useRouter();

  // 게임 데이터 불러오기
  useEffect(() => {
    const gameData = sessionStorage.getItem("gameData");

    if (gameData) {
      const parsedGameData = JSON.parse(gameData);
      setName(parsedGameData.nickname);
      setPuzzleSize(parsedGameData.puzzleSize);
      setImgSrc(parsedGameData.puzzleImg);
      setPuzzle(parsedGameData.puzzle);
    }
  }, []);

  // 타이머
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // 퍼즐 생성
  useEffect(() => {
    if (!imgSrc) return;

    const image = new window.Image();
    image.src = imgSrc;
    image.onload = () => {
      if (!canvasRef.current) {
        alert("퍼즐을 불러올 수 없습니다.");
        return;
      }
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;

      const pieceWidth = image.width / puzzleSize;
      const pieceHeight = image.height / puzzleSize;

      let tempPieces: PuzzlePiece[] = [];
      let id = 0;
      for (let y = 0; y < puzzleSize; y++) {
        for (let x = 0; x < puzzleSize; x++) {
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
            originalIndex: y * puzzleSize + x,
          });
        }
      }
      setPieces(shuffleArray(tempPieces));
    };
  }, [imgSrc, puzzleSize]);

  // 퍼즐 조각 이동
  const handleDraggingPiece = (piece: PuzzlePiece) => {
    setDraggingPiece(piece);
  };

  const handleChangePiece = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setChangePiece(index);
  };

  // 퍼즐 조각 드롭
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggingPiece === null || changePiece === null) return;

    const newPieces = [...pieces];
    const draggedIndex = pieces.findIndex((p) => p.id === draggingPiece.id);

    const previousPieceIndex = newPieces[draggedIndex].originalIndex;
    const currentPieceIndex = newPieces[changePiece].originalIndex;

    if (previousPieceIndex !== currentPieceIndex) {
      [newPieces[draggedIndex], newPieces[changePiece]] = [
        newPieces[changePiece],
        newPieces[draggedIndex],
      ];

      setMoveCount((prev) => prev + 1);
    }

    setPieces(newPieces);
    setDraggingPiece(null);
    setChangePiece(null);

    setTimeout(() => {
      if (newPieces.every((piece, index) => piece.originalIndex === index)) {
        setIsCompleted(true);
        alert("퍼즐을 완성했습니다!");

        // 스코어 계산(이동보너스 + 시간보너스)
        let score = 1000; // 기본 점수
        const minMoves = puzzleSize * puzzleSize * 2; // 최소 이동 횟수
        let moveBonus = Math.max(0, (minMoves * 2 - moveCount) * 10);
        let timeBonus = Math.max(0, (300 - seconds) * 5);
        score += moveBonus + timeBonus;

        // 랭킹 등록
        const saveRanking = async () => {
          const { data, error } = await supabase.from("projects").insert([
            {
              name: name,
              moveCount: moveCount,
              timer: seconds,
              puzzle: puzzle,
              date: new Date().toISOString(),
              score: score,
            },
          ]);

          if (error) {
            console.error("랭킹 등록 실패", error);
            alert("랭킹 등록에 실패했습니다.");
          } else {
            console.log("랭킹 등록 성공", data);
            router.push("/ranking");
          }

          return data;
        };

        saveRanking();
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#111122] text-white font-sans">
      <div className="flex flex-col items-center space-y-6 p-4 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-xl mb-4">
          {name}님
        </h1>

        <div className="flex items-center justify-center space-x-20">
          <p className="text-lg font-semibold">이동 횟수: {moveCount}</p>

          <Timer seconds={seconds} />

          <p
            className="cursor-pointer hover:text-xl"
            onClick={() => setShowImg(true)}
          >
            ❔
          </p>
        </div>

        <div className="relative w-full max-w-[80%] bg-white/20 p-6 rounded-3xl backdrop-blur-lg shadow-xl border border-white/30">
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${puzzleSize}, 1fr)`,
              height: "100%",
            }}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            {pieces.map((piece, index) => (
              <div
                key={piece.id}
                className="flex justify-center items-center"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onDragStart={() => handleDraggingPiece(piece)}
                onDragOver={(event) => handleChangePiece(event, index)}
                draggable
              >
                <img
                  src={piece.src}
                  alt={`piece-${index}`}
                  className="aspect-square object-cover rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showImg && (
        <ImgModal imgSrc={imgSrc || ""} onClose={() => setShowImg(false)} />
      )}
    </div>
  );
};

export default Game;
