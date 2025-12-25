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
            "Delivered workforce-scheduling MVP in 8 weeks, enabling 50+ monthly events for high-volume catering client",
            "Designed real-time shift scheduling system handling 20+ concurrent workers with conflict detection",
            "Automated pay-rate calculations and timesheet generation, reducing manager workload by 40%",
        ],
        techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
        id: "park-my-ride",
        title: "Software Engineer",
        company: "Park My Ride, LLC",
        location: "Houston, TX · Remote",
        startDate: "2025-05",
        endDate: "Present",
        highlights: [
            "Architected WebSocket real-time system handling 200+ concurrent connections with sub-100ms latency",
            "Optimized RESTful APIs serving 10K+ daily requests, improving response times by 40%",
            "Implemented 95% test coverage across unit, integration, and E2E tests using Jest and Detox",
            "Reduced mobile app bundle size by 30% through code splitting and lazy loading",
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
            "Led 5+ cybersecurity workshops on MITM attacks and vulnerability analysis, training 200+ students",
            "Grew InfoSec club participation by 40% through campus-wide security initiatives",
            "Mentored junior members on ethical hacking practices and security fundamentals",
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
