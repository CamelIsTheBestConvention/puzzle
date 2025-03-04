import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Puzzle Game",
  description: "Play the Puzzle Game!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
