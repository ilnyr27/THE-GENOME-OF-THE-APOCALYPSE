"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { characters } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CharactersPage() {
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const active = characters.find((c) => c.id === activeChar);

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
            Персонажи
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-ash-500 mb-12 text-lg"
          >
            Не супергерои. Люди со шрамами, страхами и выбором.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {characters.map((char, i) => (
            <motion.button
              key={char.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() =>
                setActiveChar(activeChar === char.id ? null : char.id)
              }
              className={`text-left glass rounded-2xl p-8 transition-all duration-500 group ${
                activeChar === char.id
                  ? "border-flame-500/30 bg-bunker-900/80"
                  : "hover:border-flame-500/15"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-flame-600/20 to-flame-800/20 border border-flame-600/20 flex items-center justify-center mb-6 group-hover:border-flame-500/40 transition-colors">
                <span className="font-[family-name:var(--font-display)] text-2xl text-flame-500">
                  {char.name[0]}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-ash-200 mb-1 group-hover:text-flame-400 transition-colors">
                {char.name}
              </h3>
              <p className="text-sm text-flame-500/60 mb-4">{char.role}</p>
              <p className="text-sm text-ash-500 leading-relaxed line-clamp-3">
                {char.description}
              </p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 sm:p-12"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-flame-600/30 to-flame-800/30 border border-flame-600/30 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-display)] text-3xl text-flame-500">
                        {active.name[0]}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-3xl text-ash-100">
                        {active.fullName}
                      </h2>
                      <p className="text-flame-500/60">{active.role}</p>
                    </div>
                  </div>
                  <p className="text-ash-400 leading-relaxed mb-6">
                    {active.description}
                  </p>
                  <blockquote className="border-l-2 border-flame-600/30 pl-4 italic text-ash-500">
                    &laquo;{active.quote}&raquo;
                  </blockquote>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-ash-600 mb-3">
                      Информация
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-ash-500">Возраст</span>
                        <span className="text-ash-300">{active.age}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ash-500">Происхождение</span>
                        <span className="text-ash-300">{active.origin}</span>
                      </div>
                    </div>
                  </div>
                  {active.mutation && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-ash-600 mb-3">
                        Мутации
                      </h4>
                      <p className="text-sm text-ash-400 leading-relaxed">
                        {active.mutation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
