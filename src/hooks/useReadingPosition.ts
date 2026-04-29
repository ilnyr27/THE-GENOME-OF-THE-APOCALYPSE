"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ReadingPosition {
  chapter: number;
  scrollPercent: number;
  updatedAt: number;
}

const STORAGE_KEY = (bookId: number) => `reading-pos-book-${bookId}`;

export function useReadingPosition(bookId: number, totalChapters: number) {
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const restoringScroll = useRef(false);
  const initialized = useRef(false);

  // Load saved position on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const raw = localStorage.getItem(STORAGE_KEY(bookId));
      if (raw) {
        const pos: ReadingPosition = JSON.parse(raw);
        if (pos.chapter >= 0 && pos.chapter < totalChapters) {
          setCurrentChapter(pos.chapter);
          // Restore scroll after render
          if (pos.scrollPercent > 0) {
            restoringScroll.current = true;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo(0, maxScroll * pos.scrollPercent);
                restoringScroll.current = false;
              });
            });
          }
          return;
        }
      }
    } catch {}
    setCurrentChapter(0);
  }, [bookId, totalChapters]);

  // Save chapter + scroll position on scroll (debounced)
  useEffect(() => {
    if (currentChapter === null) return;

    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (restoringScroll.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const percent = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const pos: ReadingPosition = {
          chapter: currentChapter,
          scrollPercent: percent,
          updatedAt: Date.now(),
        };
        try {
          localStorage.setItem(STORAGE_KEY(bookId), JSON.stringify(pos));
        } catch {}
      }, 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [bookId, currentChapter]);

  // Save on chapter change (without scroll)
  const saveChapter = useCallback(
    (chapter: number) => {
      const pos: ReadingPosition = {
        chapter,
        scrollPercent: 0,
        updatedAt: Date.now(),
      };
      try {
        localStorage.setItem(STORAGE_KEY(bookId), JSON.stringify(pos));
      } catch {}
    },
    [bookId]
  );

  const goToChapter = useCallback(
    (index: number) => {
      setCurrentChapter(index);
      saveChapter(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [saveChapter]
  );

  return { currentChapter, goToChapter };
}

/** Get saved position info for displaying "Continue reading" UI */
export function getSavedPosition(bookId: number): ReadingPosition | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(bookId));
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}
