"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { worldSections } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function WorldPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-ash-100 text-glow mb-4"
          >
            Мир &laquo;Прах и Пламя&raquo;
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-ash-500 mb-12 text-lg max-w-2xl"
          >
            300 лет после катастрофы. 50 бункеров. Мир, который не умер — изменился.
            И люди, которые учатся жить в нём заново.
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {activeSection && (() => {
            const active = worldSections.find((s) => s.id === activeSection);
            if (!active) return null;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="grid md:grid-cols-[1fr_1fr]">
                    {active.image && (
                      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                        <Image
                          src={active.image}
                          alt={active.title}
                          fill
                          className="object-cover object-left"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bunker-950/60 hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bunker-950/80 to-transparent md:hidden" />
                      </div>
                    )}
                    <div className="p-8 sm:p-10">
                      <h2 className="font-[family-name:var(--font-display)] text-3xl text-ash-100 mb-4">
                        {active.title}
                      </h2>
                      <p className="text-ash-400 leading-relaxed mb-6">
                        {active.description}
                      </p>
                      <ul className="space-y-3">
                        {active.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-3 text-ash-400"
                          >
                            <span className="text-flame-500/60 mt-1.5">&#x2022;</span>
                            <span className="leading-relaxed">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

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
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
                  )
                }
                className={`w-full text-left glass rounded-2xl overflow-hidden transition-all duration-500 group ${
                  activeSection === section.id
                    ? "border-flame-500/30 bg-bunker-900/80 ring-1 ring-flame-500/20"
                    : "hover:border-flame-500/15"
                }`}
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
    </div>
  );
}
