"use client";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import PuzzlePage from "./home/page";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <>{loading ? <Loading /> : <PuzzlePage />};</>;
}
