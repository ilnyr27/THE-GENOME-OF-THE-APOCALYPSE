"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { books } from "@/lib/data";
import { getSavedPosition } from "@/hooks/useReadingPosition";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function ContinueReading() {
  const [resume, setResume] = useState<{ bookId: number; chapter: number; title: string } | null>(null);

  useEffect(() => {
    // Find the most recently read book
    let latest: { bookId: number; chapter: number; title: string; time: number } | null = null;
    for (const book of books) {
      if (!book.free) continue;
      const pos = getSavedPosition(book.id);
      if (pos && pos.chapter > 0 && (!latest || pos.updatedAt > latest.time)) {
        latest = { bookId: book.id, chapter: pos.chapter, title: book.title, time: pos.updatedAt };
      }
    }
    if (latest) setResume({ bookId: latest.bookId, chapter: latest.chapter, title: latest.title });
  }, []);

  if (!resume) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Link
        href={`/books/${resume.bookId}`}
        className="block glass rounded-xl p-5 hover:border-flame-500/30 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-flame-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-flame-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-ash-500">Продолжить чтение</p>
              <p className="text-ash-200">
                {resume.title} <span className="text-ash-500">&middot; Глава {resume.chapter + 1}</span>
              </p>
            </div>
          </div>
          <span className="text-flame-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </Link>
    </motion.div>
  );
}

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

        <ContinueReading />

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
                  <div className="shrink-0 w-24 sm:w-32 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={200}
                      height={300}
                      className="w-full h-auto"
                    />
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
                        href={`/books/${book.id}`}
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
