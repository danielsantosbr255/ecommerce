import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/**", // Permite todas as imagens
            },
        ],
    },
};

export default nextConfig;
