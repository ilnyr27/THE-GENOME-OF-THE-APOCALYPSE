"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

interface LiveReadersProps {
  bookId: number;
  chapterId: number;
}

export function LiveReaders({ bookId, chapterId }: LiveReadersProps) {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const channelName = `readers:book-${bookId}:chapter-${chapterId}`;
    const channel = supabase.channel(channelName, {
      config: { presence: { key: user.id } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ user_id: user.id, online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, bookId, chapterId]);

  if (count <= 1) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ash-500">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      {count} читают сейчас
    </span>
  );
}
