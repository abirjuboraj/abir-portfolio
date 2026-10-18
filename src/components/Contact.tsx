"use client";

import React, { useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineCheck,
  HiOutlineClipboardDocument,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/data/site";

interface ContactCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
}

function ContactMethodCard({
  icon: Icon,
  label,
  value,
  href,
  copyValue,
}: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!copyValue) return;

    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const cardContent = (
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-raised border border-line hover:border-line hover:bg-surface transition-all duration-200 group">
      <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
        <div className="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue group-hover:text-blue group-hover:border-blue/30 transition-colors shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <span className="text-[11px] font-medium text-muted uppercase tracking-wider block">
            {label}
          </span>
          <span className="font-sora text-sm sm:text-base font-semibold text-text group-hover:text-white transition-colors truncate block">
            {value}
          </span>
        </div>
      </div>

      {copyValue && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className={`shrink-0 ml-3 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
            copied
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-surface border-line text-muted hover:text-white hover:border-line"
          }`}
        >
          {copied ? (
            <>
              <HiOutlineCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied ✓</span>
            </>
          ) : (
            <>
              <HiOutlineClipboardDocument className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-2xl"
      >
        {cardContent}
      </a>
    );
  }

  return <div>{cardContent}</div>;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please enter a message of at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        throw new Error(
          data.error || "Failed to send message. Please try again or email directly."
        );
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An error occurred while sending your message. Please email directly."
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative section-dimmer"
    >
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project or an idea? I'd love to hear about it."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Clickable Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sora text-xl font-bold text-text mb-4">
              Get in touch
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
              Feel free to reach out via email, phone, or messaging. I usually
              respond within 24 hours.
            </p>

            {/* Email Card */}
            <ContactMethodCard
              icon={HiOutlineEnvelope}
              label="Email"
              value={siteConfig.contact.email}
              href={`mailto:${siteConfig.contact.email}`}
              copyValue={siteConfig.contact.email}
            />

            {/* Phone Card */}
            <ContactMethodCard
              icon={HiOutlinePhone}
              label="Phone"
              value={siteConfig.contact.phone}
              href={`tel:${siteConfig.contact.phoneRaw}`}
              copyValue={siteConfig.contact.phone}
            />

            {/* WhatsApp Card */}
            <ContactMethodCard
              icon={FaWhatsapp}
              label="WhatsApp"
              value={siteConfig.contact.phone}
              href={siteConfig.contact.whatsappUrl}
              copyValue={siteConfig.contact.phone}
            />

            {/* Location Card (not a link) */}
            <ContactMethodCard
              icon={HiOutlineMapPin}
              label="Location"
              value={siteConfig.contact.location}
            />
          </div>

          {/* Right Column: Contact Form with Floating Labels */}
          <div className="lg:col-span-7 bg-raised p-6 sm:p-8 rounded-2xl border border-line shadow-xl">
            <h3 className="font-sora text-xl font-bold text-text mb-2">
              Send a message
            </h3>
            <p className="text-muted text-sm mb-6">
              Fill in your details and let&apos;s start a conversation.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`peer w-full px-4 py-3.5 rounded-xl bg-surface border text-text placeholder-transparent text-sm focus:outline-none focus:border-blue transition-colors ${
                    errors.name ? "border-red-500/80" : "border-line"
                  }`}
                />
                <label
                  htmlFor="contact-name"
                  className="absolute left-4 -top-2.5 bg-raised px-1.5 text-xs text-muted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-soft-blue pointer-events-none"
                >
                  Your Name
                </label>
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1.5 pl-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`peer w-full px-4 py-3.5 rounded-xl bg-surface border text-text placeholder-transparent text-sm focus:outline-none focus:border-blue transition-colors ${
                    errors.email ? "border-red-500/80" : "border-line"
                  }`}
                />
                <label
                  htmlFor="contact-email"
                  className="absolute left-4 -top-2.5 bg-raised px-1.5 text-xs text-muted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-soft-blue pointer-events-none"
                >
                  Your Email
                </label>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1.5 pl-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className={`peer w-full px-4 py-3.5 rounded-xl bg-surface border text-text placeholder-transparent text-sm focus:outline-none focus:border-blue transition-colors resize-none ${
                    errors.message ? "border-red-500/80" : "border-line"
                  }`}
                />
                <label
                  htmlFor="contact-message"
                  className="absolute left-4 -top-2.5 bg-raised px-1.5 text-xs text-muted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-soft-blue pointer-events-none"
                >
                  Your Message
                </label>
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1.5 pl-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Notifications */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm">
                  <HiOutlineCheck className="w-5 h-5 shrink-0" />
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Primary Blue CTA: Send Message */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 px-6 rounded-xl font-medium text-white bg-blue hover:bg-blue/90 border border-blue/70 transition-all duration-200 shadow-lg shadow-blue/25 hover:shadow-blue/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
