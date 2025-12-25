import type { Metadata } from "next";
import { Inter, Bangers, Carlito } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

// Comic book style font for Portal Mode headings
const bangers = Bangers({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-bangers",
});

// Body text for Portal Mode
const carlito = Carlito({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-carlito",
});

export const metadata: Metadata = {
    title: "Kishan Goli | Full Stack Engineer · MS CS @ UCF",
    description:
        "Full Stack Engineer building real-time systems at scale. 10K+ daily API requests, 200+ concurrent users. MS Computer Science @ UCF (3.97 GPA). AWS Certified Developer.",
    keywords: [
        "Software Engineer",
        "Full Stack Developer",
        "AWS Certified",
        "React Native",
        "Node.js",
        "TypeScript",
        "Next.js",
        "Real-time Systems",
        "Kishan Goli",
        "UCF",
    ],
    authors: [{ name: "Kishan Sai Sriman Goli" }],
    creator: "Kishan Goli",
    metadataBase: new URL("https://kishanssg.vercel.app"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kishanssg.vercel.app",
        siteName: "Kishan Goli Portfolio",
        title: "Kishan Goli - Software Engineer & Builder",
        description: "Building scalable systems from concept to production",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Kishan Goli Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kishan Goli - Software Engineer",
        description: "Building scalable systems from concept to production",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code", // Replace with actual verification code
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${bangers.variable} ${carlito.variable}`}>
            <body className="min-h-screen bg-background-primary text-foreground-primary antialiased">
                {children}
            </body>
        </html>
    );
}
