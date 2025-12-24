/**
 * Experience data for portfolio
 * Chronological work history
 */

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | "Present";
    highlights: string[];
    techStack: string[];
}

export const experiences: Experience[] = [
    {
        id: "park-my-ride",
        title: "Full Stack Developer",
        company: "Park My Ride",
        location: "Remote",
        startDate: "2025-05",
        endDate: "Present",
        highlights: [
            "Developing real-time parking coordination platform connecting customers, valets, and drivers across three mobile apps",
            "Implemented optimized query patterns reducing API latency to under 2 seconds for 500+ concurrent users",
            "Built WebSocket-based live vehicle tracking with instant status updates",
        ],
        techStack: ["React Native", "Node.js", "WebSockets", "PostgreSQL", "PostGIS", "AWS"],
    },
    {
        id: "gravywork",
        title: "Software Developer (Contract)",
        company: "GravyWork",
        location: "Remote",
        startDate: "2024-10",
        endDate: "2024-12",
        highlights: [
            "Built Ruby on Rails 7 REST API with PostgreSQL backend for workforce management",
            "Achieved 90% reduction in scheduling errors through real-time conflict detection",
            "Implemented React 18 frontend with TypeScript for manager dashboard",
            "Deployed to Heroku with automated CI/CD pipeline",
        ],
        techStack: ["Ruby on Rails 7", "PostgreSQL", "React 18", "TypeScript", "Heroku"],
    },
    {
        id: "null-chapter",
        title: "Tech Lead - Null (InfoSec) Chapter",
        company: "Null Community",
        location: "Hyderabad, India",
        startDate: "2023-01",
        endDate: "2025-01",
        highlights: [
            "Led cybersecurity events and workshops with 300+ attendees",
            "Organized Capture The Flag (CTF) competitions for security enthusiasts",
            "Mentored junior members in ethical hacking and security practices",
        ],
        techStack: ["Cybersecurity", "CTF", "Event Management", "Mentorship"],
    },
    {
        id: "ucf-masters",
        title: "Master's in Computer Science",
        company: "University of Central Florida",
        location: "Orlando, FL",
        startDate: "2024-08",
        endDate: "Present",
        highlights: [
            "GPA: 3.97/4.0",
            "Coursework: Distributed Systems, Machine Learning, Advanced Algorithms",
            "Research focus on AI-powered development tools",
        ],
        techStack: ["Research", "Distributed Systems", "Machine Learning"],
    },
];

// Helper function to format date range
export const formatDateRange = (startDate: string, endDate: string): string => {
    const formatDate = (dateStr: string): string => {
        if (dateStr === "Present") return "Present";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
