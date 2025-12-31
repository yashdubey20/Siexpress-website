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

const partners = [
  { name: "Reliance General Insurance", logo: "/logos/reliance.png" },
  { name: "Hindustan Unilever Ltd.", logo: "/logos/hul.jpg" },
  { name: "Saurashtra Cement Ltd.", logo: "/logos/saurashtra-cement.png" },
  { name: "Marsh McLennan Insurance", logo: "/logos/marsh-mclennan-logo.png" },
  { name: "Prudent Insurance", logo: "/logos/prudent-logo.png" },
  // { name: "Pelorus Technology Pvt Ltd.", logo: "/logos/pelorus.png" },
  { name: "Petronas Lubricants", logo: "/logos/Petronas-Logo.png" },
  { name: "Orchid Hotel, Ira & Kamat", logo: "/logos/orchid-hotel.png" },
];


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

      {/* ================= ABOUT US ================= */}
      <section className="py-28 px-6 md:px-10 bg-white dark:bg-[#020617]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-16"
        >
          About <span className="text-orange-500">S I Express</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600 dark:text-gray-300"
        >
          <p className="mb-6">
            Founded in Mumbai in <strong>1998</strong>, <strong>S I Express</strong> is a
            well-established courier and cargo service provider with over two decades
            of experience in the logistics industry. We have built a strong reputation
            for reliability, operational efficiency, and customer-focused service.
          </p>

          <p className="mb-6">
            We specialize in <strong>surface transportation, air freight, and cargo
              movement</strong>, with our core strength and highest expertise in
            <strong> surface cargo logistics</strong>. Our services are designed to
            handle consignments of any weight and volume, ensuring safe, reliable, and
            cost-effective delivery across locations.
          </p>

          <p>
            Supported by a robust operational network, disciplined processes, and an
            experienced team, we ensure timely dispatches and dependable transit times.
            At S I Express, we deliver practical, scalable logistics solutions tailored
            to the evolving needs of our clients.
          </p>
        </motion.div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="learn-more"
        className="py-24 md:py-28 px-6 md:px-10 bg-slate-100 dark:bg-slate-900"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold mb-14"
        >
          How We <span className="text-orange-500">Operate</span>
        </motion.h2>

        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Pickup",
              desc: "Scheduled pickup from your location with proper handling.",
              icon: "📦",
            },
            {
              title: "Transit",
              desc: "Secure and efficient movement through our logistics network.",
              icon: "🚚",
            },
            {
              title: "Delivery",
              desc: "On-time delivery with full visibility and confirmation.",
              icon: "📍",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white dark:bg-white/5 p-8 md:p-10 text-center shadow-sm dark:shadow-none"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>

              <h3 className="text-xl md:text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600 dark:text-gray-400 text-base md:text-lg">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

{/* ================ WHY SIEXPRESS ================ */}
<section className="py-28 px-10">
  <motion.h2
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
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
        transition: { staggerChildren: 0.15 },
      },
    }}
    className="mx-auto max-w-6xl grid gap-12 md:grid-cols-3"
  >
    {[
      {
        title: "Super Fast",
        icon: "⚡",
        desc: "Optimized routing and rapid dispatch ensure time-critical deliveries never slow you down.",
      },
      {
        title: "Reliable",
        icon: "📦",
        desc: "Every shipment is managed with accountability, precision, and consistent service standards.",
      },
      {
        title: "Live Tracking",
        icon: "📍",
        desc: "Real-time shipment visibility keeps you informed and in control at every stage.",
      },
    ].map((item) => (
      <motion.div
        key={item.title}
        variants={{
          hidden: { opacity: 0, y: 32 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="
          rounded-2xl 
          border border-slate-200 dark:border-white/10 
          bg-white dark:bg-white/5 
          p-10 text-center 
          shadow-sm dark:shadow-none
        "
      >
        <div className="mb-6 text-4xl">{item.icon}</div>

        <h3 className="text-2xl font-semibold mb-3">
          {item.title}
        </h3>

        <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    ))}
  </motion.div>
</section>


{/* ================= OUR PARTNERS ================= */}
<section className="py-24 bg-white dark:bg-[#020617] overflow-hidden">
  <div className="text-center mb-14 px-6">
    <h2 className="text-4xl font-bold">
      Our <span className="text-orange-500">Partners</span>
    </h2>
    <p className="mt-4 text-slate-600 dark:text-gray-400">
      Trusted by leading brands and organizations across industries.
    </p>
  </div>

  {/* MASK */}
  <div className="relative w-full overflow-hidden">
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#020617] to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#020617] to-transparent z-10" />

    {/* TRACK */}
    <div className="partner-marquee">
      <div className="partner-track">
        {[...partners, ...partners].map((partner, index) => (
          <div className="partner-item" key={index}>
            <img
              src={partner.logo}
              alt={partner.name}
              className="partner-logo"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
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

      {/* ================= LOCATION / MAP ================= */}
      <section className="py-28 px-6 md:px-10 bg-white dark:bg-[#020617]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-16"
        >
          Our <span className="text-orange-500">Location</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm"
        >
          {/* Google Maps Embed */}
          <iframe
            title="S I Express Location"
            src="https://www.google.com/maps?q=Shop%20No%2C%20Bhuta%20Compound%2C%2002%2C%20Mogra%20Ln%2C%20near%20New%20Apollo%20Estate%2C%20Mogra%20Village%2C%20Andheri%20East%2C%20Mumbai%20400069&output=embed"
            className="w-full h-[300px] md:h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Address + CTA */}
        <div className="mt-10 text-center text-slate-600 dark:text-gray-400">
          <p className="font-semibold text-slate-800 dark:text-white text-lg">
            S I Express - info@siexpress.co.in
          </p>

          <p className="mt-2 leading-relaxed">
            Shop No, Bhuta Compound, 02, Mogra Ln,<br />
            Near New Apollo Estate, Mogra Village,<br />
            Andheri East, Mumbai – 400069
          </p>

          {/* Open in Google Maps */}
          <a
            href="https://www.google.com/maps?q=Shop+No,+Bhuta+Compound,+02,+Mogra+Ln,+Andheri+East,+Mumbai+400069"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-orange-500 font-semibold hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>


      <footer className="py-12 text-center text-slate-500">
        © 2026 Siexpress. All rights reserved.
      </footer>
    </main>
  );
}

useGLTF.preload("/models/Truck.glb");

// Checking
