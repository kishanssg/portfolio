"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

// Social links data
const socialLinks = [
    {
        icon: Mail,
        label: "Email",
        href: `mailto:${SITE_CONFIG.email}`,
        text: SITE_CONFIG.email,
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: SITE_CONFIG.social.linkedin,
        text: "linkedin.com/in/kishanssg",
    },
    {
        icon: Github,
        label: "GitHub",
        href: SITE_CONFIG.social.github,
        text: "github.com/kishanssg",
    },
];

export default function ContactForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus("loading");

        try {
            const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
            const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus("success");
                reset();
                // Reset to idle after 5 seconds
                setTimeout(() => setSubmitStatus("idle"), 5000);
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-5xl px-lg md:px-2xl bg-background-primary"
        >
            <motion.div
                className="max-w-content mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div className="text-center mb-3xl" variants={itemVariants}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-md">
                        Let's Build Together
                    </h2>
                    <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                        Whether you're hiring, collaborating, or just want to chat about
                        tech—I'd love to hear from you.
                    </p>
                    <div className="w-16 h-1 bg-accent-primary rounded-full mt-md mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl items-start">
                    {/* Form */}
                    <motion.div variants={itemVariants}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={cn(
                                "p-xl rounded-card",
                                "bg-[rgba(26,26,26,0.5)]",
                                "border border-[rgba(255,255,255,0.1)]",
                                "backdrop-blur-sm"
                            )}
                            noValidate
                        >
                            {/* Name Field */}
                            <div className="mb-lg">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-foreground-primary mb-sm"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    className={cn(
                                        "w-full px-md py-md rounded-button",
                                        "bg-[rgba(26,26,26,0.5)]",
                                        "border",
                                        errors.name
                                            ? "border-red-500"
                                            : "border-[rgba(255,255,255,0.2)]",
                                        "text-foreground-primary placeholder:text-foreground-secondary/50",
                                        "transition-all duration-hover",
                                        "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                                    )}
                                    placeholder="Your name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <p
                                        id="name-error"
                                        className="mt-xs text-sm text-red-500 flex items-center gap-xs"
                                        role="alert"
                                    >
                                        <AlertCircle size={14} />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="mb-lg">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-foreground-primary mb-sm"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className={cn(
                                        "w-full px-md py-md rounded-button",
                                        "bg-[rgba(26,26,26,0.5)]",
                                        "border",
                                        errors.email
                                            ? "border-red-500"
                                            : "border-[rgba(255,255,255,0.2)]",
                                        "text-foreground-primary placeholder:text-foreground-secondary/50",
                                        "transition-all duration-hover",
                                        "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                                    )}
                                    placeholder="your.email@example.com"
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && (
                                    <p
                                        id="email-error"
                                        className="mt-xs text-sm text-red-500 flex items-center gap-xs"
                                        role="alert"
                                    >
                                        <AlertCircle size={14} />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className="mb-xl">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-foreground-primary mb-sm"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    {...register("message")}
                                    rows={5}
                                    className={cn(
                                        "w-full px-md py-md rounded-button resize-none",
                                        "bg-[rgba(26,26,26,0.5)]",
                                        "border",
                                        errors.message
                                            ? "border-red-500"
                                            : "border-[rgba(255,255,255,0.2)]",
                                        "text-foreground-primary placeholder:text-foreground-secondary/50",
                                        "transition-all duration-hover",
                                        "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                                    )}
                                    placeholder="Tell me about your project or just say hello..."
                                    aria-invalid={errors.message ? "true" : "false"}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                />
                                {errors.message && (
                                    <p
                                        id="message-error"
                                        className="mt-xs text-sm text-red-500 flex items-center gap-xs"
                                        role="alert"
                                    >
                                        <AlertCircle size={14} />
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isValid || submitStatus === "loading"}
                                className={cn(
                                    "w-full flex items-center justify-center gap-sm",
                                    "px-xl py-md rounded-button",
                                    "font-semibold text-base",
                                    "transition-all duration-hover",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
                                    !isValid || submitStatus === "loading"
                                        ? "bg-foreground-secondary/20 text-foreground-secondary cursor-not-allowed"
                                        : "bg-accent-primary text-background-primary hover:shadow-neon hover:scale-[1.02]"
                                )}
                            >
                                {submitStatus === "loading" ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : submitStatus === "success" ? (
                                    <>
                                        <CheckCircle size={20} />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* Success Message */}
                            {submitStatus === "success" && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-md text-center text-accent-primary text-sm"
                                >
                                    Thanks! I'll get back to you within 24 hours.
                                </motion.p>
                            )}

                            {/* Error Message */}
                            {submitStatus === "error" && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-md text-center text-red-500 text-sm"
                                >
                                    Something went wrong. Please try again or email me directly.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>

                    {/* Social Links & Info */}
                    <motion.div variants={itemVariants} className="space-y-xl">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground-primary mb-lg">
                                Or reach me directly
                            </h3>
                            <div className="space-y-md">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                        rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                        className={cn(
                                            "flex items-center gap-md p-md rounded-card",
                                            "bg-[rgba(26,26,26,0.5)]",
                                            "border border-[rgba(255,255,255,0.1)]",
                                            "transition-all duration-hover",
                                            "hover:border-accent-primary/30 hover:translate-x-1"
                                        )}
                                        aria-label={`Contact via ${link.label}`}
                                    >
                                        <div className="p-sm rounded-button bg-accent-primary/10">
                                            <link.icon size={20} className="text-accent-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground-secondary">
                                                {link.label}
                                            </p>
                                            <p className="text-foreground-primary font-medium">
                                                {link.text}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div
                            className={cn(
                                "p-lg rounded-card",
                                "bg-accent-primary/5",
                                "border border-accent-primary/20"
                            )}
                        >
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                I'm currently open to{" "}
                                <span className="text-accent-primary font-medium">
                                    full-time opportunities
                                </span>{" "}
                                and{" "}
                                <span className="text-accent-primary font-medium">
                                    freelance projects
                                </span>
                                . Feel free to reach out if you think we'd be a great fit!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
