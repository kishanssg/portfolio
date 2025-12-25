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
            "Building a workforce-scheduling MVP for Social Catering, a high-volume events client of GravyWork",
            "Acting as Product Builder and full-stack engineer: designing event + shift creation flows, worker directory, pay-rate and timesheet calculations",
            "Implementing conflict and double-booking checks, and staffing dashboards while iterating weekly with the CEO and client team",
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
            "Building a real-time parking coordination platform connecting customers, valets, and drivers",
            "Architected WebSocket-based real-time system handling 200+ concurrent connections with Redis pub/sub for distributed state synchronization",
            "Built high-performance RESTful APIs serving 10,000+ daily requests, optimizing response times by 40%",
            "Increased test coverage to 95% with automated unit, integration, and E2E testing (Jest, Supertest, Detox)",
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
