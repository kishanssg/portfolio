// Site configuration
export const SITE_CONFIG = {
    name: "Kishan Goli",
    title: "Kishan Sai Sriman Goli",
    tagline: "Software Engineer & Builder at Core",
    subtitle: "Idea → Execution → Scalable Systems",
    description: "Leveraging AI to build faster, smarter, better.",
    url: "https://kishanssg.vercel.app",
    email: "kishan.ss.goli@gmail.com",
    social: {
        github: "https://github.com/kishanssg",
        linkedin: "https://linkedin.com/in/kishanssg",
    },
} as const;

// Navigation links
export const NAV_LINKS = [
    { id: "about", label: "About", href: "#about" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "contact", label: "Contact", href: "#contact" },
] as const;

// Animation configuration
export const ANIMATION = {
    duration: {
        fast: 0.2,
        medium: 0.4,
        slow: 0.6,
        page: 1.0,
        portal: 1.5,
    },
    easing: {
        smooth: [0.4, 0, 0.2, 1],
        bounce: [0.68, -0.55, 0.265, 1.55],
    },
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;
