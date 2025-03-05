"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import "../styles/globals.css";
import Loading from "./Loading";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true); // 페이지 전환 시작 시 로딩
    const timer = setTimeout(() => {
      setIsLoading(false); // 일정 시간이 지나면 로딩 종료
    }, 1000); // 1초 후 로딩 해제 (필요하면 조정)

    return () => clearTimeout(timer); // 클린업
  }, [pathname]); // ✅ pathname이 변경될 때마다 실행됨

  return (
    <html lang="ko">
      <head>
        <meta name="description" content="Puzzle Game" />
        <title>Puzzle Game</title>
      </head>
      <body>{isLoading ? <Loading /> : children}</body>
    </html>
  );
}
