"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { books } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function BooksPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
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
            Книги серии
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-ash-500 mb-12 text-lg"
          >
            От побега — к жизни. От страха — к доверию.
            <br />
            От &laquo;кем я стану&raquo; — к &laquo;каким человеком я был на пути&raquo;.
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="glass rounded-2xl p-8 hover:border-flame-500/15 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-16 h-20 rounded-lg bg-gradient-to-b from-flame-600/20 to-flame-900/20 border border-flame-600/20 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] text-2xl text-flame-500/60">
                      {book.id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-[family-name:var(--font-display)] text-2xl text-ash-200">
                        {book.title}
                      </h2>
                      {book.free ? (
                        <span className="text-xs px-3 py-1 rounded-full bg-flame-600/20 text-flame-400 border border-flame-600/30">
                          Бесплатно
                        </span>
                      ) : (
                        <span className="text-xs px-3 py-1 rounded-full bg-bunker-800 text-ash-500 border border-bunker-700">
                          Скоро
                        </span>
                      )}
                    </div>
                    <p className="text-flame-500/60 text-sm mb-3">
                      {book.subtitle} &middot; {book.pages} стр.
                    </p>
                    <p className="text-ash-400 leading-relaxed mb-4">
                      {book.description}
                    </p>
                    <p className="text-sm italic text-ash-600 mb-4">
                      &laquo;{book.theme}&raquo;
                    </p>
                    {book.free ? (
                      <Link
                        href="/books/1"
                        className="inline-block px-6 py-2.5 rounded-lg bg-flame-600 text-white text-sm font-medium hover:bg-flame-500 transition-all duration-300"
                      >
                        Читать бесплатно
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-6 py-2.5 rounded-lg bg-bunker-800 text-ash-500 text-sm cursor-not-allowed"
                      >
                        Скоро в продаже
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
