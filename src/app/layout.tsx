import { ReactNode } from "react";
import "../styles/globals.css";
import LoadingWrapper from "./LoadingWrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="description" content="Puzzle Game" />
        <title>Puzzle Game</title>
      </head>
      <body>
        <LoadingWrapper>{children}</LoadingWrapper>
      </body>
    </html>
  );
}
