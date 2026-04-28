"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { worldSections } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function WorldPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const active = activeSection
    ? worldSections.find((s) => s.id === activeSection)
    : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="pb-16">
      {/* Full-width banner */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/world/banner.png"
          alt="Мир Генома Апокалипсиса"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bunker-950 via-bunker-950/40 to-bunker-950/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-6xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-ash-100 text-glow mb-3">
            Мир Генома Апокалипсиса
          </h1>
          <p className="text-ash-400 text-lg max-w-2xl">
            300 лет после катастрофы. 50 бункеров. Мир, который не умер — изменился.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">
        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {worldSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button
                onClick={() => setActiveSection(section.id)}
                className="w-full text-left glass rounded-2xl overflow-hidden transition-all duration-500 group hover:border-flame-500/15"
              >
                {section.image && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover object-left group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-ash-200 mb-2 group-hover:text-flame-400 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-ash-500 leading-relaxed line-clamp-2">
                    {section.description}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-ash-100 mb-12 text-center">
            Хронология
          </h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-bunker-700" />
            {[
              { year: "2087", event: "Проект «Феникс» — начало строительства бункеров", side: "left" },
              { year: "2091", event: "Вакцина «Протей» — тайные генетические эксперименты", side: "right" },
              { year: "2095", event: "День Пепла — конец старого мира", side: "left" },
              { year: "2095-2395", event: "Эра Бункеров — 300 лет изоляции", side: "right" },
              { year: "2410", event: "Альянс Бункеров — первая координация", side: "left" },
              { year: "2440", event: "Начало событий серии", side: "right" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  item.side === "right" ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-flame-600 -translate-x-1/2 z-10" />
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${item.side === "left" ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <span className="text-flame-500 text-sm font-semibold">{item.year}</span>
                  <p className="text-ash-400 mt-1">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-bunker-950/95 overflow-y-auto"
            onClick={() => setActiveSection(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveSection(null)}
                className="fixed top-6 right-6 z-60 w-10 h-10 rounded-full glass border border-bunker-700 flex items-center justify-center text-ash-400 hover:text-flame-400 hover:border-flame-500/50 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Hero image */}
              {active.image && (
                <div className="relative w-full h-[40vh] sm:h-[50vh]">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover object-left"
                    sizes="100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bunker-950 via-bunker-950/30 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="max-w-3xl mx-auto px-6 sm:px-10 -mt-20 relative z-10 pb-16">
                <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-ash-100 text-glow mb-6">
                  {active.title}
                </h2>
                <p className="text-ash-400 text-lg leading-relaxed mb-10">
                  {active.description}
                </p>
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-xs uppercase tracking-wider text-ash-600 mb-6">
                    Подробности
                  </h3>
                  <ul className="space-y-4">
                    {active.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 text-ash-400"
                      >
                        <span className="text-flame-500 mt-1">&#x2022;</span>
                        <span className="leading-relaxed text-lg">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
