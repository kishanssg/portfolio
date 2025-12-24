"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle, AlertCircle, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus("success");
                reset();
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
            ref={ref}
            className="py-24 md:py-32 px-6"
        >
            <div className="max-w-[980px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-[12px] font-normal tracking-widest text-[#6E6E73] uppercase mb-4">
                        Contact
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Let's Build Together
                    </h2>
                    <p className="text-[17px] text-[#A1A1A6] max-w-xl mx-auto">
                        Whether you're hiring, collaborating, or just want to chat about tech—I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div>
                            <input
                                {...register("name")}
                                placeholder="Name"
                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white placeholder-[#6E6E73] focus:border-white/30 focus:outline-none transition-colors"
                            />
                            {errors.name && (
                                <p className="text-[12px] text-red-400 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white placeholder-[#6E6E73] focus:border-white/30 focus:outline-none transition-colors"
                            />
                            {errors.email && (
                                <p className="text-[12px] text-red-400 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <textarea
                                {...register("message")}
                                placeholder="Message"
                                rows={4}
                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white placeholder-[#6E6E73] focus:border-white/30 focus:outline-none transition-colors resize-none"
                            />
                            {errors.message && (
                                <p className="text-[12px] text-red-400 mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid || submitStatus === "loading"}
                            className="w-full py-4 rounded-full bg-white text-black text-[14px] font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {submitStatus === "loading" ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Sending...
                                </>
                            ) : submitStatus === "success" ? (
                                <>
                                    <CheckCircle size={16} />
                                    Message Sent
                                </>
                            ) : submitStatus === "error" ? (
                                <>
                                    <AlertCircle size={16} />
                                    Try Again
                                </>
                            ) : (
                                <>
                                    <Send size={16} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </motion.form>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-[14px] text-[#6E6E73] mb-8">
                            Or reach out directly:
                        </p>
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group"
                            >
                                <link.icon size={20} className="text-[#6E6E73]" />
                                <div className="flex-1">
                                    <p className="text-[14px] text-white">{link.label}</p>
                                    <p className="text-[12px] text-[#6E6E73]">{link.text}</p>
                                </div>
                                <ArrowUpRight size={16} className="text-[#6E6E73] group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
