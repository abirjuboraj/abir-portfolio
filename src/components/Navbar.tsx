"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import ScrollProgress from "./ScrollProgress";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for glass background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy on home page
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["home", "about", "education", "skills", "projects", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const getHref = (href: string) => {
    if (isHomePage) {
      return href;
    }
    return `/${href}`;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "#home");
        setActiveSection("home");
      } else {
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 72;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const targetPosition = Math.max(0, elementPosition - navHeight);
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
          window.history.pushState(null, "", href);
          setActiveSection(targetId);
        }
      }
    }
  };

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/85 backdrop-blur-md border-b border-line shadow-lg shadow-black/20 py-3.5"
            : "bg-transparent py-5"
        }`}
        style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
      >
        <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between">
          {/* Logo / Monogram Badge */}
          <Link
            href={getHref("#home")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-xl"
            aria-label="Md. Abir Hossen Home"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            <div className="w-10 h-10 rounded-xl bg-white text-bg font-sora font-extrabold flex items-center justify-center text-sm shadow-md tracking-tight group-hover:scale-105 transition-transform duration-200">
              AH
            </div>
            <span className="hidden min-[900px]:inline-block font-sora text-sm font-semibold text-text tracking-tight group-hover:text-soft-blue transition-colors">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden min-[900px]:flex items-center gap-1 bg-raised/70 border border-line rounded-full px-3 py-1.5 backdrop-blur-sm"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive = isHomePage && activeSection === item.id;
              return (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                    isActive
                      ? "text-white"
                      : "text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-blue/15 border border-blue/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA: Hire Me */}
          <div className="hidden min-[900px]:flex items-center">
            <Link
              href={getHref("#contact")}
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-blue hover:bg-blue/90 border border-blue/60 transition-all duration-200 shadow-sm hover:shadow-blue/20 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[900px]:hidden w-11 h-11 rounded-xl bg-raised border border-line flex items-center justify-center text-text hover:text-soft-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiOutlineMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Animated Slide-down Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="min-[900px]:hidden fixed inset-0 z-40">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Container: Anchored right, takes half device width */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "top right" }}
              className="absolute top-[66px] right-3 sm:right-6 w-[50vw] min-w-[200px] max-w-[270px] bg-surface/95 backdrop-blur-xl border border-line rounded-2xl shadow-2xl shadow-black/80 p-3 max-h-[calc(100svh-80px)] overflow-y-auto"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
                {navItems.map((item) => {
                  const isActive = isHomePage && activeSection === item.id;
                  return (
                    <Link
                      key={item.name}
                      href={getHref(item.href)}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-raised text-white border border-line"
                          : "text-muted hover:text-white hover:bg-raised/50"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                      )}
                    </Link>
                  );
                })}

                <div className="pt-2.5 mt-1 border-t border-line/60">
                  <Link
                    href={getHref("#contact")}
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="w-full py-2.5 px-3 rounded-xl text-center text-sm font-semibold text-white bg-blue hover:bg-blue/90 transition-colors flex items-center justify-center shadow-md shadow-blue/20"
                  >
                    Hire Me
                  </Link>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
