"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";
import { getQuiz } from "@/lib/quizzes";
import { evaluateUnlocks } from "@/lib/unlock-rules";
import { Quiz } from "./Quiz";
import { UnlockToast } from "./UnlockToast";
import type { UnlockRule } from "@/lib/unlock-rules";

interface ReadingTrackerProps {
  bookId: number;
  chapterId: number;
}

export function ReadingTracker({ bookId, chapterId }: ReadingTrackerProps) {
  const { user } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(Date.now());
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [newUnlocks, setNewUnlocks] = useState<UnlockRule[]>([]);

  const hasQuiz = !!getQuiz(bookId, chapterId);

  // Upsert reading progress on mount
  useEffect(() => {
    if (!user) return;
    startTimeRef.current = Date.now();

    supabase.from("reading_progress").upsert(
      {
        user_id: user.id,
        book_id: bookId,
        chapter_id: chapterId,
        completed: false,
        started_at: new Date().toISOString(),
      },
      { onConflict: "user_id,book_id,chapter_id", ignoreDuplicates: true }
    );
  }, [user, bookId, chapterId]);

  const markCompleted = useCallback(async () => {
    if (!user || completed) return;
    setCompleted(true);

    await supabase.from("reading_progress").upsert(
      {
        user_id: user.id,
        book_id: bookId,
        chapter_id: chapterId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,book_id,chapter_id" }
    );

    // Evaluate unlocks
    const { data: progress } = await supabase
      .from("reading_progress")
      .select("book_id, chapter_id, completed")
      .eq("user_id", user.id)
      .eq("completed", true);

    const { data: quizzes } = await supabase
      .from("quiz_attempts")
      .select("book_id, chapter_id")
      .eq("user_id", user.id)
      .eq("passed", true);

    const { data: existing } = await supabase
      .from("user_unlocks")
      .select("entity_type, entity_id, unlock_level")
      .eq("user_id", user.id);

    const unlocks = evaluateUnlocks(
      progress || [],
      quizzes || [],
      existing || []
    );

    if (unlocks.length > 0) {
      const rows = unlocks.map((u) => ({
        user_id: user.id,
        entity_type: u.entityType,
        entity_id: u.entityId,
        unlock_level: u.level,
      }));
      await supabase.from("user_unlocks").upsert(rows, {
        onConflict: "user_id,entity_type,entity_id",
      });
      setNewUnlocks(unlocks);
    }
  }, [user, bookId, chapterId, completed]);

  // IntersectionObserver for bottom marker
  useEffect(() => {
    if (!user || completed) return;

    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elapsed = Date.now() - startTimeRef.current;
          if (elapsed >= 60000) {
            markCompleted();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [user, completed, markCompleted]);

  const handleQuizComplete = async (passed: boolean) => {
    if (!passed || !user) return;
    setShowQuiz(false);

    // Re-evaluate unlocks after quiz pass
    const { data: progress } = await supabase
      .from("reading_progress")
      .select("book_id, chapter_id, completed")
      .eq("user_id", user.id)
      .eq("completed", true);

    const { data: quizzes } = await supabase
      .from("quiz_attempts")
      .select("book_id, chapter_id")
      .eq("user_id", user.id)
      .eq("passed", true);

    const { data: existing } = await supabase
      .from("user_unlocks")
      .select("entity_type, entity_id, unlock_level")
      .eq("user_id", user.id);

    const unlocks = evaluateUnlocks(
      progress || [],
      quizzes || [],
      existing || []
    );

    if (unlocks.length > 0) {
      const rows = unlocks.map((u) => ({
        user_id: user.id,
        entity_type: u.entityType,
        entity_id: u.entityId,
        unlock_level: u.level,
      }));
      await supabase.from("user_unlocks").upsert(rows, {
        onConflict: "user_id,entity_type,entity_id",
      });
      setNewUnlocks(unlocks);
    }
  };

  return (
    <>
      {/* Bottom marker for IntersectionObserver */}
      <div ref={bottomRef} className="h-1" aria-hidden="true" />

      {/* Show quiz button after completion */}
      {completed && hasQuiz && !showQuiz && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowQuiz(true)}
            className="px-6 py-3 rounded-lg bg-flame-600/20 text-flame-400 border border-flame-600/30 text-sm font-medium hover:bg-flame-600/30 hover:border-flame-500/50 transition-all"
          >
            Пройти викторину по главе
          </button>
        </div>
      )}

      {/* Quiz inline */}
      {showQuiz && (
        <Quiz bookId={bookId} chapterId={chapterId} onComplete={handleQuizComplete} />
      )}

      {/* Unlock toast */}
      <UnlockToast
        unlocks={newUnlocks}
        onDismiss={() => setNewUnlocks([])}
      />
    </>
  );
}
