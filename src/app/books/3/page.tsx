"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { book3Chapters } from "@/lib/data";
import { ReadingTracker } from "@/components/ReadingTracker";
import { LiveReaders } from "@/components/LiveReaders";

export default function Book3ReaderPage() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chapter = book3Chapters[currentChapter];

  return (
    <div className="pt-16 min-h-screen">
      {/* Top bar */}
      <div className="fixed top-16 left-0 right-0 z-30 glass border-b border-bunker-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-ash-400 hover:text-flame-400 transition-colors md:hidden"
              aria-label="Оглавление"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <div>
              <p className="text-xs text-ash-600">Книга 3</p>
              <p className="text-sm text-ash-300">Хромосома Феникса</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LiveReaders bookId={3} chapterId={chapter.id} />
            <p className="text-xs text-ash-600">
              Глава {currentChapter + 1} из {book3Chapters.length}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-bunker-900">
          <motion.div
            className="h-full bg-flame-600"
            animate={{ width: `${((currentChapter + 1) / book3Chapters.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - chapter list */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="fixed left-0 top-28 bottom-0 w-72 z-20 glass border-r border-bunker-800 overflow-y-auto md:hidden"
            >
              <div className="p-4 space-y-1">
                <p className="text-xs text-ash-600 uppercase tracking-wider mb-3">Оглавление</p>
                {book3Chapters.map((ch, i) => (
                  <button
                    key={ch.id}
                    onClick={() => { setCurrentChapter(i); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      i === currentChapter
                        ? "bg-flame-600/20 text-flame-400"
                        : "text-ash-400 hover:text-ash-200 hover:bg-bunker-800/50"
                    }`}
                  >
                    Глава {ch.id}. {ch.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 shrink-0 pt-28">
          <div className="fixed w-64 p-4 space-y-1 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <p className="text-xs text-ash-600 uppercase tracking-wider mb-3">Оглавление</p>
            {book3Chapters.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => setCurrentChapter(i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  i === currentChapter
                    ? "bg-flame-600/20 text-flame-400"
                    : "text-ash-400 hover:text-ash-200 hover:bg-bunker-800/50"
                }`}
              >
                Глава {ch.id}. {ch.title}
              </button>
            ))}
          </div>
        </div>

        {/* Reader */}
        <div className="flex-1 pt-28 pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentChapter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-[family-name:var(--font-display)] text-3xl text-ash-100 mb-2">
                  Глава {chapter.id}
                </h2>
                <p className="text-flame-500/60 mb-10 text-lg">{chapter.title}</p>

                <div className="prose prose-invert max-w-none">
                  {chapter.content.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-ash-300 leading-[1.9] mb-6 text-[17px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>

            <ReadingTracker bookId={3} chapterId={chapter.id} />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-bunker-800">
              <button
                onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                disabled={currentChapter === 0}
                className="px-5 py-2.5 rounded-lg border border-bunker-700 text-ash-400 text-sm hover:border-flame-600/50 hover:text-flame-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &larr; Назад
              </button>

              {currentChapter < book3Chapters.length - 1 ? (
                <button
                  onClick={() => setCurrentChapter(currentChapter + 1)}
                  className="px-5 py-2.5 rounded-lg bg-flame-600 text-white text-sm hover:bg-flame-500 transition-all"
                >
                  Далее &rarr;
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-ash-500 mb-3">Продолжение -- скоро</p>
                  <Link
                    href="/books"
                    className="px-5 py-2.5 rounded-lg border border-flame-600/30 text-flame-400 text-sm hover:bg-flame-600/10 transition-all"
                  >
                    Все книги
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
