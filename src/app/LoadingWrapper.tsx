"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Loading from "./Loading";

const LoadingWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return isLoading ? <Loading /> : children;
};
export default LoadingWrapper;
