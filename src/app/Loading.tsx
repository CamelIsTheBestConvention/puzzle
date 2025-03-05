"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Loading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/img/uiux/loadingMococo.gif"
        alt="Loading..."
        width={300}
        height={300}
        unoptimized
      />
      <p className="text-4xl font-semibold mb-4 text-white">Loading{dots}</p>
    </div>
  );
};
export default Loading;
