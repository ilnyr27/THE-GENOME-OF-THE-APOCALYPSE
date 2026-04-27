"use client";

import { useState } from "react";
import Image from "next/image";
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

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-[320px_1fr]">
                {/* Large portrait */}
                {active.image && (
                  <div className="relative aspect-[3/4] md:aspect-auto">
                    <Image
                      src={active.image}
                      alt={active.fullName}
                      fill
                      className="object-cover object-top"
                      sizes="320px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bunker-950/60 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bunker-950/80 to-transparent md:hidden" />
                  </div>
                )}

                {/* Info */}
                <div className="p-8 sm:p-10">
                  <div className="mb-6">
                    <h2 className="font-[family-name:var(--font-display)] text-3xl text-ash-100 mb-1">
                      {active.fullName}
                    </h2>
                    <p className="text-flame-500/60">{active.role}</p>
                  </div>

                  <p className="text-ash-400 leading-relaxed mb-6">
                    {active.description}
                  </p>

                  <blockquote className="border-l-2 border-flame-600/30 pl-4 italic text-ash-500 mb-8">
                    &laquo;{active.quote}&raquo;
                  </blockquote>

                  <div className="grid sm:grid-cols-2 gap-6">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
              className={`text-left glass rounded-2xl overflow-hidden transition-all duration-500 group ${
                activeChar === char.id
                  ? "border-flame-500/30 bg-bunker-900/80 ring-1 ring-flame-500/20"
                  : "hover:border-flame-500/15"
              }`}
            >
              {/* Portrait */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                {char.image ? (
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-flame-600/20 to-flame-800/20 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] text-6xl text-flame-500/40">
                      {char.name[0]}
                    </span>
                  </div>
                )}
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bunker-950 via-bunker-950/80 to-transparent" />
                {/* Name over image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-ash-100 group-hover:text-flame-400 transition-colors">
                    {char.name}
                  </h3>
                  <p className="text-sm text-flame-500/70">{char.role}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
