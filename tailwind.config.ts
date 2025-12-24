import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            // Brand Colors (from .agent/rules/portfolio.md)
            colors: {
                // Professional Mode
                background: {
                    primary: "#0A0A0A",
                    secondary: "#1A1A1A",
                },
                foreground: {
                    primary: "#F5F5F5",
                    secondary: "#A0A0A0",
                },
                accent: {
                    primary: "#00D4AA", // Signature Cyan - Kishan's brand color
                    secondary: "#0071E3",
                },
                border: {
                    DEFAULT: "#2A2A2A",
                },
                // Portal Mode
                portal: {
                    bg: "#000000",
                    neonGreen: "#00FF88",
                    neonCyan: "#00D4FF",
                    neonMagenta: "#FF006E",
                },
                // Comic Book Mode
                comic: {
                    cream: "#F5E6D3",
                    black: "#1a1a1a",
                    yellow: "#FFD700",
                    red: "#FF4444",
                },
            },
            // Spacing Scale (from .agent/rules/portfolio.md)
            spacing: {
                xs: "4px",
                sm: "8px",
                md: "16px",
                lg: "24px",
                xl: "32px",
                "2xl": "48px",
                "3xl": "64px",
                "4xl": "96px",
                "5xl": "128px",
            },
            // Typography
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["Fira Code", "JetBrains Mono", "monospace"],
                // Comic book fonts
                bangers: ["var(--font-bangers)", "Bangers", "cursive"],
                carlito: ["var(--font-carlito)", "Carlito", "sans-serif"],
            },
            fontSize: {
                // Fluid typography with clamp()
                xs: ["clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", { lineHeight: "1.5" }],
                sm: ["clamp(0.875rem, 0.8rem + 0.375vw, 1rem)", { lineHeight: "1.5" }],
                base: ["clamp(1rem, 0.9rem + 0.5vw, 1.125rem)", { lineHeight: "1.6" }],
                lg: ["clamp(1.125rem, 1rem + 0.625vw, 1.25rem)", { lineHeight: "1.5" }],
                xl: ["clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)", { lineHeight: "1.4" }],
                "2xl": ["clamp(1.5rem, 1.3rem + 1vw, 2rem)", { lineHeight: "1.3" }],
                "3xl": ["clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)", { lineHeight: "1.2" }],
                "4xl": ["clamp(2.25rem, 1.75rem + 2.5vw, 3rem)", { lineHeight: "1.1" }],
                "5xl": ["clamp(3rem, 2.25rem + 3.75vw, 4rem)", { lineHeight: "1.1" }],
            },
            // Border Radius
            borderRadius: {
                card: "12px",
                button: "8px",
            },
            // Box Shadow
            boxShadow: {
                card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
                "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
                neon: "0 0 20px rgba(0, 212, 170, 0.5)",
                "neon-green": "0 0 30px rgba(0, 255, 136, 0.6)",
                "neon-cyan": "0 0 30px rgba(0, 212, 255, 0.6)",
                "neon-magenta": "0 0 30px rgba(255, 0, 110, 0.6)",
                // Comic book shadows
                "comic": "4px 4px 0px rgba(0, 0, 0, 0.8)",
                "comic-md": "6px 6px 0px rgba(0, 0, 0, 0.8)",
                "comic-lg": "8px 8px 0px rgba(0, 0, 0, 0.8)",
            },
            // Animation Timing (from portfolio rules)
            transitionDuration: {
                hover: "200ms",
                medium: "400ms",
                slow: "600ms",
                page: "1000ms",
            },
            transitionTimingFunction: {
                smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            // Animation Keyframes
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 170, 0.5)" },
                    "50%": { boxShadow: "0 0 40px rgba(0, 212, 170, 0.8)" },
                },
            },
            animation: {
                "fade-in-up": "fadeInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
                float: "float 3s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite",
            },
            // Max Width for Content
            maxWidth: {
                content: "1280px",
            },
            // Z-Index Scale
            zIndex: {
                nav: "50",
                modal: "100",
                portal: "200",
            },
        },
    },
    plugins: [],
};

export default config;
