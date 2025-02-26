"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../styles/globals.css";

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [puzzleSize, setPuzzleSize] = useState(5);
  const [selectImg, setSelectImg] = useState(0);
  const puzzleList = [
    "/img/puzzle1.png",
    "/img/puzzle2.png",
    "/img/puzzle3.png",
  ];
  const router = useRouter();

  const prevImg = () => {
    setSelectImg((prevIndex) =>
      prevIndex === 0 ? puzzleList.length - 1 : prevIndex - 1
    );
  };

  const nextImg = () => {
    setSelectImg((prevIndex) =>
      prevIndex === puzzleList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startGame = () => {
    alert(
      `${
        nickname || "사용자"
      }님, ${puzzleSize}x${puzzleSize} 퍼즐을 시작합니다!`
    );

    const gameData = {
      nickname,
      puzzleSize,
      puzzle: selectImg + 1,
      puzzleImg: puzzleList[selectImg],
    };

    sessionStorage.setItem("gameData", JSON.stringify(gameData));
    router.push("/game");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#111122] text-white font-sans px-4">
      <h1 className="text-6xl font-bold mb-10 text-center drop-shadow-lg">
        🧩 퍼즐 게임
      </h1>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-3xl p-8 w-full max-w-lg space-y-6">
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-300">닉네임</label>
          <input
            type="text"
            className="mt-2 p-4 bg-transparent border border-gray-500 rounded-xl text-white outline-none focus:border-indigo-400 transition-all"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-300">
            퍼즐 크기
          </label>
          <select
            className="mt-2 p-4 bg-transparent border border-gray-500 rounded-xl text-white outline-none focus:border-indigo-400 transition-all appearance-none"
            value={puzzleSize}
            onChange={(e) => setPuzzleSize(Number(e.target.value))}
          >
            <option className="text-black" value={3}>
              3 x 3
            </option>
            <option className="text-black" value={5}>
              5 x 5
            </option>
            <option className="text-black" value={7}>
              7 x 7
            </option>
            <option className="text-black" value={9}>
              9 x 9
            </option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold text-gray-300">
            퍼즐 이미지
          </label>
          <div className="flex items-center gap-4 mt-2">
            <button
              className="p-3 bg-gray-700/50 rounded-full hover:bg-gray-600 transition-colors"
              onClick={prevImg}
            >
              ←
            </button>
            <Image
              src={puzzleList[selectImg]}
              alt="Puzzle"
              width={160} // Tailwind w-40
              height={160} // Tailwind h-40
              className="object-cover rounded-xl border border-gray-600 cursor-pointer transition-transform hover:scale-105"
            />
            <button
              className="p-3 bg-gray-700/50 rounded-full hover:bg-gray-600 transition-colors"
              onClick={nextImg}
            >
              →
            </button>
          </div>
        </div>

        <button
          className="w-full bg-indigo-500 text-white py-4 text-xl rounded-xl hover:bg-indigo-600 transition-all shadow-lg"
          onClick={startGame}
        >
          🎮 게임 시작
        </button>
      </div>
    </div>
  );
}
