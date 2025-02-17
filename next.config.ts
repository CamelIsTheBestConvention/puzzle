import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React Strict Mode 활성화
  // swcMinify: true, // SWC Minify 사용
  compiler: {
    // TypeScript 관련 설정 (필요한 경우)
    styledComponents: true, // styled-components 사용할 경우 활성화
  },
};

export default nextConfig;
