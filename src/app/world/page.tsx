"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { worldSections } from "@/lib/data";

export default function WorldPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? worldSections[activeIndex] : null;

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

  // Keyboard & swipe navigation
  const goNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null && prev < worldSections.length - 1 ? prev + 1 : prev
    );
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : prev
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goNext, goPrev]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);

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
          <p className="text-ash-400 text-lg max-w-2xl">
            300 лет после катастрофы. 50 бункеров. Мир, который не умер — изменился.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">
        {/* Cards grid — normal layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {worldSections.map((section, i) => (
            <div key={section.id} className={i % 3 === 1 ? "lg:translate-y-40" : ""}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <button
                  onClick={() => setActiveIndex(i)}
                  className="w-full text-left glass rounded-2xl overflow-hidden transition-all duration-500 group hover:border-flame-500/15"
                >
                  {section.image && (
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={800}
                        height={500}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
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
            </div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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

      {/* Fullscreen modal with swipe */}
      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-bunker-950/95 overflow-y-auto"
            onClick={() => setActiveIndex(null)}
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart === null) return;
              const diff = touchStart - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 60) {
                if (diff > 0) goNext();
                else goPrev();
              }
              setTouchStart(null);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setActiveIndex(null)}
                  className="fixed top-6 right-6 z-60 w-10 h-10 rounded-full glass border border-bunker-700 flex items-center justify-center text-ash-400 hover:text-flame-400 hover:border-flame-500/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Navigation arrows */}
                {activeIndex > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    className="fixed left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 rounded-full glass border border-bunker-700 flex items-center justify-center text-ash-400 hover:text-flame-400 hover:border-flame-500/50 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {activeIndex < worldSections.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 rounded-full glass border border-bunker-700 flex items-center justify-center text-ash-400 hover:text-flame-400 hover:border-flame-500/50 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Counter */}
                <div className="fixed top-6 left-6 z-60 text-ash-600 text-sm">
                  {activeIndex + 1} / {worldSections.length}
                </div>

                {/* Hero image */}
                {active.image && (
                  <div className="relative w-full">
                    <Image
                      src={active.image}
                      alt={active.title}
                      width={1600}
                      height={900}
                      className="w-full h-auto"
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
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
