"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getQuiz } from "@/lib/quizzes";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

interface QuizProps {
  bookId: number;
  chapterId: number;
  onComplete: (passed: boolean) => void;
}

export function Quiz({ bookId, chapterId, onComplete }: QuizProps) {
  const quiz = getQuiz(bookId, chapterId);
  const { user } = useAuth();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSelect = useCallback((questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, [submitted]);

  if (!quiz) return null;

  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = async () => {
    if (!allAnswered || saving) return;
    setSaving(true);

    const correctCount = quiz.questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const didPass = correctCount >= quiz.passingScore;

    setPassed(didPass);
    setSubmitted(true);

    if (user) {
      await supabase.from("quiz_attempts").insert({
        user_id: user.id,
        book_id: bookId,
        chapter_id: chapterId,
        score: correctCount,
        total: quiz.questions.length,
        passed: didPass,
      });
    }

    setSaving(false);
    if (didPass) {
      onComplete(true);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setPassed(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 mb-8 glass rounded-2xl p-6 md:p-8 border border-bunker-700"
    >
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-ash-100 mb-2">
        Викторина
      </h3>
      <p className="text-sm text-ash-500 mb-6">
        Ответьте правильно на {quiz.passingScore} из {quiz.questions.length} вопросов
      </p>

      <div className="space-y-8">
        {quiz.questions.map((q, qi) => {
          const userAnswer = answers[q.id];
          const isCorrect = submitted && userAnswer === q.correctIndex;
          const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correctIndex;

          return (
            <div key={q.id}>
              <p className="text-ash-200 mb-3 text-[15px]">
                <span className="text-flame-500 mr-2">{qi + 1}.</span>
                {q.text}
              </p>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const selected = userAnswer === oi;
                  const showCorrect = submitted && oi === q.correctIndex;
                  const showWrong = submitted && selected && oi !== q.correctIndex;

                  let borderClass = "border-bunker-700 hover:border-bunker-600";
                  if (selected && !submitted) borderClass = "border-flame-500 bg-flame-600/10";
                  if (showCorrect) borderClass = "border-green-500/60 bg-green-600/10";
                  if (showWrong) borderClass = "border-red-500/60 bg-red-600/10";

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi)}
                      disabled={submitted}
                      className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${borderClass} ${
                        submitted ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span className={`${showCorrect ? "text-green-400" : showWrong ? "text-red-400" : "text-ash-300"}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!submitted && (
          <motion.div key="submit" className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || saving}
              className="px-8 py-3 rounded-lg bg-flame-600 text-white text-sm font-medium hover:bg-flame-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Проверяем..." : "Проверить ответы"}
            </button>
          </motion.div>
        )}

        {submitted && passed && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600/15 border border-green-500/30">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400 text-sm font-medium">Отлично! Викторина пройдена!</span>
            </div>
          </motion.div>
        )}

        {submitted && !passed && (
          <motion.div
            key="fail"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600/15 border border-red-500/30">
              <span className="text-red-400 text-sm">
                Не хватило правильных ответов. Попробуйте ещё раз!
              </span>
            </div>
            <div>
              <button
                onClick={handleRetry}
                className="px-6 py-2.5 rounded-lg border border-flame-600/30 text-flame-400 text-sm hover:bg-flame-600/10 transition-all"
              >
                Попробовать снова
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
