import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

interface ClearModalProps {
  isOpen: boolean;
  score: number;
  name: string;
  moveCount: number;
  seconds: number;
  puzzle: number;
  puzzleSize: number;
}

const ClearModal = ({
  isOpen,
  score,
  name,
  moveCount,
  seconds,
  puzzle,
  puzzleSize,
}: ClearModalProps) => {
  const router = useRouter();
  const [isRankingSaved, setIsRankingSaved] = useState(false);

  if (!isOpen) return null;

  const handleRestart = () => {
    sessionStorage.removeItem("gameData");
    router.push("/puzzle");
  };

  const handleHome = () => {
    sessionStorage.removeItem("gameData");
    router.push("/");
  };

  // 랭킹 등록
  const handleSaveRanking = async () => {
    const { data, error } = await supabase.from("projects").insert([
      {
        name,
        moveCount,
        timer: seconds,
        puzzle: puzzle,
        size: puzzleSize,
        date: new Date().toISOString(),
        score,
      },
    ]);

    if (error) {
      console.error("랭킹 등록 실패", error);
      alert("랭킹 등록에 실패했습니다.");
    } else {
      console.log("랭킹 등록 성공", data);
      setIsRankingSaved(true);
    }

    sessionStorage.removeItem("gameData");
  };

  return (
    <ModalOverlay>
      <ModalBox>
        {!isRankingSaved ? (
          <>
            <Title>🎉 게임 클리어!</Title>
            <Text>축하합니다! 퍼즐을 완료했습니다.</Text>
            <ScoreText>✨ 최종 점수: {score}점</ScoreText>

            <ButtonContainer>
              <RestartButton onClick={handleRestart}>한판 더?</RestartButton>
              <HomeButton onClick={handleHome}>처음으로</HomeButton>
            </ButtonContainer>

            <ButtonContainer>
              <RankingButton onClick={handleSaveRanking}>
                랭킹 등록
              </RankingButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            <Title>🎉 랭킹 등록 완료!</Title>
            <Text>당신의 점수가 랭킹에 등록되었습니다.</Text>
            <ButtonContainer>
              <RankingButton onClick={() => router.push("/ranking")}>
                랭킹 페이지로 이동
              </RankingButton>
            </ButtonContainer>
          </>
        )}
      </ModalBox>
    </ModalOverlay>
  );
};

export default ClearModal;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalBox = styled.div`
  position: relative;
  background: linear-gradient(to bottom right, #1e1e2e, #111122);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transform: scale(0.9);
  animation: ${scaleUp} 0.3s ease-out forwards;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
`;

const Text = styled.p`
  font-size: 1.125rem;
  color: #d1d5db;
`;

const ScoreText = styled.p`
  margin-top: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #facc15;
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const RestartButton = styled(Button)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const HomeButton = styled(Button)`
  background: rgb(201, 46, 46);
  color: white;

  &:hover {
    background: rgb(185, 32, 32);
  }
`;

const RankingButton = styled(Button)`
  background: rgb(128, 128, 128);
  color: white;

  &:hover {
    background: rgb(109, 109, 109);
  }
`;
