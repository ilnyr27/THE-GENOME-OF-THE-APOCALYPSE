"use client";

import { useState } from "react";
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
                className={`w-full text-left glass rounded-2xl p-8 transition-all duration-500 group ${
                  activeSection === section.id
                    ? "border-flame-500/30 bg-bunker-900/80"
                    : "hover:border-flame-500/15"
                }`}
              >
                <div className="text-3xl mb-4">{section.icon}</div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ash-200 mb-3 group-hover:text-flame-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-ash-500 leading-relaxed">
                  {section.description}
                </p>
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 overflow-hidden"
            >
              <div className="glass rounded-2xl p-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-ash-200 mb-6">
                  {worldSections.find((s) => s.id === activeSection)?.title}
                </h3>
                <ul className="space-y-3">
                  {worldSections
                    .find((s) => s.id === activeSection)
                    ?.details.map((detail, i) => (
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
            </motion.div>
          )}
        </AnimatePresence>

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
