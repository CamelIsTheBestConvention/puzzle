"use client";

import { games } from "@/data/games";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/globals.css";

const Home = () => {
  const router = useRouter();
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  const prevGame = () => {
    setDirection("right");
    setCurrentGameIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
  };

  const nextGame = () => {
    setDirection("left");
    setCurrentGameIndex((prevIndex) =>
      prevIndex === games.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container>
      <ScrollButton onClick={prevGame}>◀</ScrollButton>
      <GameWrapper>
        {games.map((game, index) => (
          <GameCard
            key={index}
            onClick={() => router.push(game.link)}
            active={index === currentGameIndex ? 1 : 0}
            direction={direction}
          >
            <GameImageWrapper>
              <GameImage
                src={game.img}
                alt={game.name}
                style={{
                  opacity: isLoading ? 0 : 1,
                }}
              />
            </GameImageWrapper>
            <GameTitle>{game.name}</GameTitle>
          </GameCard>
        ))}
      </GameWrapper>
      <ScrollButton onClick={nextGame}>▶</ScrollButton>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  width: 100vw;
  overflow: hidden;
`;

const GameWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 450px;
`;

const GameCard = styled.div<{ active: number; direction: "left" | "right" }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  opacity: ${(props) => (props.active ? "1" : "0")};
  transform: ${(props) =>
    props.active
      ? "translateX(0)"
      : props.direction === "left"
      ? "translateX(-100%)"
      : "translateX(100%)"};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
`;

const GameImageWrapper = styled.div`
  width: 70%;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
`;

const GameImage = styled.img`
  width: 70%;
  margin: 20% auto;
  border-radius: 12px;
  transition: transform 0.2s ease-in-out;
  transform: translateY(0);

  ${GameCard}:hover & {
    animation: moveImage 1s ease-in-out infinite;
  }

  @keyframes moveImage {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const GameTitle = styled.h2`
  margin-top: 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const ScrollButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 28px;
  transition: background 0.2s;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:first-of-type {
    left: 20px;
  }

  &:last-of-type {
    right: 20px;
  }
`;
