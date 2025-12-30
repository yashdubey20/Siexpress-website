"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

/* ===================== 3D TRUCK ===================== */
function TruckModel() {
  const { scene } = useGLTF("/models/Truck.glb");

  return (
    <primitive
      object={scene}
      scale={1.15}
      position={[-0.6, -0.6, 0]}
      rotation={[0, -Math.PI / 2, 0]}
      castShadow
      receiveShadow
    />
  );
}

/* ===================== PAGE ===================== */
export default function Home() {
  const [dark, setDark] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Dark mode */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const resumeRotation = () => {
    setTimeout(() => setAutoRotate(true), 2500);
  };

  /* ================= CONTACT FORM ================= */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const body = `
Name: ${name}
Mobile: ${phone}
Email: ${email || "Not provided"}

Message:
${message}
    `;

    window.location.href = `mailto:info@siexpress.co.in?subject=New Inquiry from Siexpress Website&body=${encodeURIComponent(body)}`;
  };

  return (
    
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#020617] dark:text-white transition-colors duration-300 overflow-x-hidden">

    

      {/* ================= HERO ================= */}
      <section id="top" className="relative min-h-screen flex items-center px-6 md:px-24">
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-6 right-6 rounded-full border border-slate-300 dark:border-white/20 px-4 py-2 text-sm"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-orange-500 relative inline-block">
              Siexpress
              <span className="absolute left-0 -bottom-2 h-[4px] w-1/3 bg-orange-500 rounded-full" />
            </h1>

            <p className="mt-6 max-w-lg text-lg text-slate-600 dark:text-gray-300">
              Ultra-fast, reliable delivery powered by modern logistics technology.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="glow rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white"
              >
                Get a Quote
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl border border-slate-300 dark:border-white/20 px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT – 3D */}
          <div className="w-full h-[300px] md:h-[420px]">
            <Canvas
              dpr={isMobile ? [1, 1.3] : [1, 2]}
              camera={{
                position: isMobile ? [5, 2, 5] : [6, 2.5, 6],
                fov: isMobile ? 48 : 42,
              }}
              shadows
            >
              <ambientLight intensity={dark ? 0.7 : 1.2} />
              <directionalLight position={[-6, 6, 4]} intensity={dark ? 0.6 : 1} />
              <TruckModel />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={autoRotate}
                autoRotateSpeed={isMobile ? 0.35 : 0.6}
                rotateSpeed={isMobile ? 0.5 : 0.8}
                onStart={() => setAutoRotate(false)}
                onEnd={resumeRotation}
              />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="learn-more"
        className="py-28 px-10 bg-slate-100 dark:bg-slate-900"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-16"
        >
          How It <span className="text-orange-500">Works</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mx-auto max-w-6xl grid gap-12 md:grid-cols-3"
        >
          {["Pickup", "Transit", "Delivery"].map((step) => (
            <motion.div
              key={step}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="rounded-2xl bg-white dark:bg-white/5 p-10 text-center shadow-sm dark:shadow-none"
            >
              <div className="mb-4 text-4xl">🚚</div>
              <h3 className="text-2xl font-semibold">{step}</h3>
              <p className="mt-3 text-slate-600 dark:text-gray-400">
                Seamless and secure {step.toLowerCase()}.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ================= WHY SIEXPRESS ================= */}
      <section className="py-28 px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-16"
        >
          Why <span className="text-orange-500">Siexpress</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mx-auto max-w-6xl grid gap-12 md:grid-cols-3"
        >
          {[
            { title: "Super Fast", icon: "⚡" },
            { title: "Reliable", icon: "📦" },
            { title: "Live Tracking", icon: "📍" },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-10 text-center shadow-sm"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-600 dark:text-gray-400">
                Built for modern, dependable logistics operations.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="py-28 px-10 bg-slate-100 dark:bg-slate-900"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-16"
        >
          Contact <span className="text-orange-500">Us</span>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-6"
        >
          <input
            name="name"
            required
            placeholder="Your Name"
            className="w-full rounded-xl border px-5 py-4 bg-white dark:bg-white/5"
          />
          <input
            name="phone"
            required
            placeholder="Mobile Number"
            className="w-full rounded-xl border px-5 py-4 bg-white dark:bg-white/5"
          />
          <input
            name="email"
            placeholder="Email (optional)"
            className="w-full rounded-xl border px-5 py-4 bg-white dark:bg-white/5"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Briefly describe your requirement"
            className="w-full rounded-xl border px-5 py-4 bg-white dark:bg-white/5"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full glow rounded-xl bg-orange-500 py-4 text-lg font-semibold text-white"
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>

      <footer className="py-12 text-center text-slate-500">
        © 2025 Siexpress. All rights reserved.
      </footer>
    </main>
  );
}

useGLTF.preload("/models/Truck.glb");
