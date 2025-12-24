/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 768, 1024, 1280, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },
    // Optimize for production
    poweredByHeader: false,
    compress: true,
};

module.exports = withBundleAnalyzer(nextConfig);
