/**
 * Project data for portfolio
 * Single source of truth for all project information
 */

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    metrics: { label: string; value: string }[];
    techStack: string[];
    links: {
        github?: string;
        demo?: string;
        caseStudy?: string;
    };
    thumbnail: string;
    featured: boolean;
    category: "web" | "mobile" | "ai" | "tool";
}

export const projects: Project[] = [
    {
        id: "d2d-handoff",
        title: "D2D_Handoff - AI-Powered Design-to-Code Tool",
        tagline: "Converting Figma designs into production-ready code",
        description:
            "Built an AI tool that converts Figma designs into React Native, Jetpack Compose, and SwiftUI code, automating UI handoff for engineers. Adopted internally by a 4-engineer team.",
        metrics: [
            {
                label: "Faster frontend builds",
                value: "75%",
            },
            {
                label: "Development time reduced",
                value: "4 weeks → 1 week",
            },
        ],
        techStack: [
            "TypeScript",
            "Node.js",
            "React",
            "Figma Plugin API",
            "OpenAI GPT-4",
            "Docker",
        ],
        links: {
            github: "https://github.com/kishanssg/d2d-handoff",
            // demo: "",
        },
        thumbnail: "/assets/images/projects/d2d-handoff.png",
        featured: true,
        category: "ai",
    },
    {
        id: "park-my-ride",
        title: "Park My Ride - Real-Time Parking Coordination Platform",
        tagline: "Connecting customers, valets, and drivers across three mobile apps",
        description:
            "Real-time parking coordination platform with live vehicle tracking and instant status updates using React Native and Node.js WebSockets.",
        metrics: [
            {
                label: "Concurrent users supported",
                value: "500+",
            },
            {
                label: "Response latency",
                value: "<2s",
            },
        ],
        techStack: [
            "React Native",
            "Node.js",
            "WebSockets",
            "PostgreSQL",
            "PostGIS",
            "AWS",
        ],
        links: {
            github: "https://github.com/kishanssg/park-my-ride",
            // demo: "",
        },
        thumbnail: "/assets/images/projects/park-my-ride.png",
        featured: true,
        category: "mobile",
    },
    {
        id: "gravywork",
        title: "GravyWork - Workforce Management Platform",
        tagline: "Scheduling and monitoring for Social Catering",
        description:
            "Platform enabling managers to schedule and monitor 20+ event workers with real-time conflict detection and shift approval system.",
        metrics: [
            {
                label: "Reduction in scheduling errors",
                value: "90%",
            },
            {
                label: "Workers managed",
                value: "20+",
            },
        ],
        techStack: [
            "Ruby on Rails 7",
            "PostgreSQL",
            "React 18",
            "TypeScript",
            "Heroku",
        ],
        links: {
            github: "https://github.com/kishanssg/gravywork",
            // demo: "",
        },
        thumbnail: "/assets/images/projects/gravywork.png",
        featured: true,
        category: "web",
    },
    {
        id: "vibeaudit",
        title: "VibeAudit - Security Scanner for AI-Generated Code",
        tagline: "Detecting vulnerabilities in AI-generated code",
        description:
            "Open-source CLI tool that detects exposed credentials, insecure endpoints, and SQL-injection risks in AI-generated code.",
        metrics: [
            {
                label: "Community adoption",
                value: "Used by developers in AI communities",
            },
        ],
        techStack: ["Python", "CLI", "Static Analysis", "RegEx"],
        links: {
            github: "https://github.com/kishanssg/vibeaudit",
            // demo: "",
        },
        thumbnail: "/assets/images/projects/vibeaudit.png",
        featured: true,
        category: "tool",
    },
    {
        id: "vibelink",
        title: "VibeLink - API-to-FlowSpec Compiler for LLMs",
        tagline: "Converting OpenAPI/AsyncAPI specs into token-compressed YAML",
        description:
            "TypeScript CLI tool that converts API specs into FlowSpec format, enabling AI systems to reason over complex APIs 10× faster.",
        metrics: [
            {
                label: "Faster AI reasoning",
                value: "10×",
            },
        ],
        techStack: [
            "TypeScript",
            "CLI",
            "Zod",
            "AsyncAPI",
            "OpenAPI",
            "Mermaid",
        ],
        links: {
            github: "https://github.com/kishanssg/vibelink",
            // demo: "",
        },
        thumbnail: "/assets/images/projects/vibelink.png",
        featured: true,
        category: "ai",
    },
    {
        id: "ucf-parking-finder",
        title: "UCF Parking Finder",
        tagline: "Real-time parking recommendations for 60,000+ students",
        description:
            "Real-time parking recommendation web app using live occupancy and proximity data to guide students to optimal parking spots.",
        metrics: [
            {
                label: "Recognition",
                value: "Knight Hacks 2024",
            },
            {
                label: "Students served",
                value: "60,000+",
            },
        ],
        techStack: [
            "React",
            "Firebase",
            "Real-time Database",
            "Google Maps API",
        ],
        links: {
            github: "https://github.com/kishanssg/ucf-parking-finder",
            // demo: "",
        },
        thumbnail: "/assets/images/projects/ucf-parking-finder.png",
        featured: true,
        category: "web",
    },
];

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
    return projects.filter((project) => project.featured);
};

// Helper function to get projects by category
export const getProjectsByCategory = (
    category: Project["category"]
): Project[] => {
    return projects.filter((project) => project.category === category);
};

// Helper function to get a single project by ID
export const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id);
};
