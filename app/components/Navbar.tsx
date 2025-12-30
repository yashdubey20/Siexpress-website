"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Smooth scroll helper */
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-[#020617]/80 backdrop-blur border-b border-slate-200 dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* LOGO */}
          <button
            onClick={() => scrollTo("top")}
            className="text-2xl font-extrabold text-orange-500"
          >
            Siexpress
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("learn-more")}
              className="text-sm font-medium hover:text-orange-500 transition"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollTo("why")}
              className="text-sm font-medium hover:text-orange-500 transition"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm font-medium hover:text-orange-500 transition"
            >
              Contact
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="ml-4 rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Get Quote
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#020617] px-6 py-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-extrabold text-orange-500">
                Siexpress
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>

            <div className="mt-14 flex flex-col gap-6 text-lg">
              <button onClick={() => scrollTo("learn-more")}>
                How it Works
              </button>
              <button onClick={() => scrollTo("why")}>
                Why Us
              </button>
              <button onClick={() => scrollTo("contact")}>
                Contact
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="mt-6 rounded-xl bg-orange-500 py-4 font-semibold text-white"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
