"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { books, characters } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-bunker-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,122,17,0.06)_0%,_transparent_70%)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-flame-500/40"
              initial={{ x: `${20 + i * 12}%`, y: "110%" }}
              animate={{ y: "-10%", opacity: [0, 1, 0] }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="text-flame-500/80 uppercase tracking-[0.3em] text-sm mb-6 text-center"
            >
              Постапокалиптическая сага
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl text-ash-100 text-glow leading-[1.1] mb-10 text-center"
            >
              Геном
              <br />
              <span className="text-flame-500">Апокалипсиса</span>
            </motion.h1>

            {/* Banner */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="relative w-full rounded-2xl overflow-hidden border border-bunker-700/50 mb-10"
            >
              <Image
                src="/world/banner.png"
                alt="Мир Генома Апокалипсиса"
                width={1200}
                height={400}
                className="w-full h-auto"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-xl text-ash-400 max-w-2xl mx-auto mb-10 leading-relaxed text-center"
            >
              Важно не кем ты стал, а каким человеком ты был на пути.
              <br />
              Как помог. Как выбрал мир, когда было проще выбрать войну.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/books/1"
                className="px-8 py-4 rounded-xl bg-flame-600 text-white font-semibold hover:bg-flame-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,17,0.3)] text-center"
              >
                Читать первую книгу бесплатно
              </Link>
              <Link
                href="/world"
                className="px-8 py-4 rounded-xl border border-ash-700 text-ash-300 hover:border-flame-600/50 hover:text-flame-400 transition-all duration-300 text-center"
              >
                Исследовать мир
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ash-100 mb-6">
                О чём эта история
              </h2>
              <div className="space-y-4 text-ash-400 leading-relaxed">
                <p>
                  300 лет назад мир закончился. Люди укрылись в подземных бункерах.
                  Столетия изоляции, генетические эксперименты, мутации — и вот
                  бункеры начинают открываться.
                </p>
                <p>
                  Три брата — Ардин, Кейл и Айден — ищут правду о себе и о мире.
                  Но это не история о суперсилах и спасении вселенной. Это история
                  о людях, которые каждый день выбирают: закрыться или довериться,
                  ударить или выслушать, защитить или отпустить.
                </p>
                <p className="text-flame-400/80 italic">
                  Семь книг. Один путь. Не к победе — к человечности.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "7", label: "книг" },
                { num: "50", label: "бункеров" },
                { num: "300", label: "лет после катастрофы" },
                { num: "3", label: "брата" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center hover:border-flame-500/20 transition-colors duration-500"
                >
                  <div className="font-[family-name:var(--font-display)] text-4xl text-flame-500 mb-2">
                    {stat.num}
                  </div>
                  <div className="text-sm text-ash-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Books */}
      <section className="py-24 px-4 bg-bunker-950/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ash-100 mb-4">
              Семь книг
            </h2>
            <p className="text-ash-500">
              От побега — к жизни. От страха — к доверию.
            </p>
          </motion.div>

          <div className="space-y-6">
            {books.map((book, i) => (
              <motion.div
                key={book.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={book.free ? `/books/${book.id}` : "/books"}
                  className="block glass rounded-2xl p-6 sm:p-8 hover:border-flame-500/20 transition-all duration-500 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-4 sm:w-80 shrink-0">
                      <span className="font-[family-name:var(--font-display)] text-3xl text-flame-500/30 group-hover:text-flame-500/60 transition-colors w-12">
                        {book.id}
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl text-ash-200 group-hover:text-flame-400 transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-ash-500">{book.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-ash-500 flex-1 leading-relaxed hidden md:block">
                      {book.theme}
                    </p>
                    <div className="shrink-0">
                      {book.free ? (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-flame-600/20 text-flame-400 border border-flame-600/30">
                          Бесплатно
                        </span>
                      ) : (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-bunker-800 text-ash-500 border border-bunker-700">
                          Скоро
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ash-100 mb-4">
              Герои
            </h2>
            <p className="text-ash-500">
              Не супергерои. Люди, которые делают выбор каждый день.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.slice(0, 3).map((char, i) => (
              <motion.div
                key={char.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href="/characters"
                  className="block glass rounded-2xl overflow-hidden h-full hover:border-flame-500/20 transition-all duration-500 group"
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    {char.image ? (
                      <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-flame-600/20 to-flame-800/20 flex items-center justify-center">
                        <span className="font-[family-name:var(--font-display)] text-6xl text-flame-500/40">
                          {char.name[0]}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bunker-950 via-bunker-950/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-ash-100 group-hover:text-flame-400 transition-colors">
                        {char.name}
                      </h3>
                      <p className="text-sm text-flame-500/70 mb-2">{char.role}</p>
                      <p className="text-sm italic text-ash-500">
                        &laquo;{char.quote}&raquo;
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/characters"
              className="text-sm text-ash-500 hover:text-flame-400 transition-colors"
            >
              Все персонажи &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl text-ash-100 text-glow mb-6"
            >
              Начни читать сейчас
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-ash-400 mb-10 text-lg"
            >
              Первая книга — бесплатно и полностью.
              <br />
              Никакой регистрации. Просто открой и читай.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <Link
                href="/books/1"
                className="inline-block px-10 py-5 rounded-xl bg-flame-600 text-white text-lg font-semibold hover:bg-flame-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,122,17,0.3)]"
              >
                Код Выживания — читать
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
