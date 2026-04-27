"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const typeLabels: Record<string, string> = {
  character: "Персонаж",
  location: "Локация",
  creature: "Существо",
  mutation: "Мутация",
};

interface UnlockToastProps {
  unlocks: { entityType: string; entityId: string; reveals: string[] }[];
  onDismiss: () => void;
}

export function UnlockToast({ unlocks, onDismiss }: UnlockToastProps) {
  useEffect(() => {
    if (unlocks.length === 0) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [unlocks, onDismiss]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {unlocks.map((u) => (
          <motion.div
            key={`${u.entityType}-${u.entityId}`}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-xl px-5 py-3 border border-flame-600/30 shadow-lg shadow-flame-600/10"
          >
            <p className="text-xs text-flame-400 uppercase tracking-wider mb-0.5">
              {typeLabels[u.entityType] || u.entityType} — разблокировано
            </p>
            <p className="text-sm text-ash-200 font-medium">
              {u.entityId.replace(/-/g, " ")}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
