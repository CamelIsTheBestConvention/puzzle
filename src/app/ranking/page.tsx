"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RankingData {
  id: number;
  name: string;
  moveCount: number;
  timer: number;
  date: string;
  score: number;
}

const Ranking = () => {
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const router = useRouter();

  // 랭킹 데이터 불러오기
  useEffect(() => {
    const fetchRankings = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("score", { ascending: false }); // 높은 점수 순 정렬

      if (error) {
        console.error("랭킹 데이터 로드 실패", error);
        alert("랭킹 데이터를 불러오는 데 실패했습니다.");
      } else {
        setRankings(data || []);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#111122] text-white font-sans">
      <div className="flex flex-col items-center space-y-6 p-4 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-xl mb-4">
          🏆 랭킹
        </h1>

        <div className="space-y-6 w-full max-w-3xl">
          {rankings.length > 0 ? (
            rankings.map((ranking, index) => (
              <div
                key={ranking.id}
                
                className="bg-white/20 p-6 rounded-xl shadow-xl backdrop-blur-lg border border-white/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{`${index + 1}. ${
                    ranking.name
                  }`}</p>
                  <div className="flex space-x-6">
                    <p className="text-lg">🕹 이동: {ranking.moveCount}</p>
                    <p className="text-lg">⏳ 시간: {ranking.timer}s</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-sm text-gray-400">{ranking.date}</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    ⭐ SCORE: {ranking.score.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-center text-gray-400">
              랭킹이 없습니다.
            </p>
          )}
        </div>

        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow-xl transition-transform hover:scale-105"
            onClick={() => router.push("/")}
          >
            처음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
