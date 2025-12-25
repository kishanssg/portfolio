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
        id: "gravywork",
        title: "Software Engineer",
        company: "GravyWork",
        location: "Orlando, FL · Remote",
        startDate: "2025-10",
        endDate: "Present",
        highlights: [
            "Shipped workforce-scheduling MVP in 8 weeks for Social Catering, a high-volume events client processing 50+ events/month",
            "Architected event + shift creation flows handling 20+ concurrent workers with real-time conflict detection",
            "Reduced manager workload 40% through automated pay-rate calculations and timesheet generation",
        ],
        techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
        id: "park-my-ride",
        title: "Full Stack Web Developer",
        company: "Park My Ride, LLC",
        location: "Houston, TX · Remote",
        startDate: "2025-05",
        endDate: "Present",
        highlights: [
            "Architected WebSocket real-time system handling 200+ concurrent connections with sub-100ms latency using Redis pub/sub",
            "Built RESTful APIs serving 10,000+ daily requests with 40% response time improvement through query optimization",
            "Achieved 95% test coverage with automated unit, integration, and E2E testing (Jest, Supertest, Detox)",
            "Reduced mobile app bundle size 30% through code splitting, lazy loading, and async data fetching",
        ],
        techStack: ["React Native", "Node.js", "PostgreSQL", "Redis", "WebSockets", "AWS", "Docker"],
    },
    {
        id: "null-chapter",
        title: "Technical Lead",
        company: "Null (InfoSec) Chapter - VIT-AP",
        location: "Amaravati, India · On-site",
        startDate: "2021-07",
        endDate: "2022-07",
        highlights: [
            "Conducted 5+ hands-on workshops on cybersecurity topics, including MITM attacks and vulnerability tools, educating 200+ students",
            "Led campus-wide cybersecurity initiatives which increased InfoSec club participation by 40%",
            "Fostered a collaborative learning environment for security enthusiasts",
        ],
        techStack: ["Git", "Design", "Cybersecurity", "Event Management", "Mentorship"],
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
