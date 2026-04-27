export interface UnlockRule {
  entityType: "character" | "location" | "creature" | "mutation";
  entityId: string;
  level: number;
  requires: {
    chapterRead?: { book: number; chapter: number };
    quizPassed?: { book: number; chapter: number };
  };
  reveals: string[];
}

export const unlockRules: UnlockRule[] = [
  // ================== BOOK 1: Код Выживания ==================
  // Ardin
  {
    entityType: "character", entityId: "ardin", level: 1,
    requires: { chapterRead: { book: 1, chapter: 1 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "ardin", level: 2,
    requires: { quizPassed: { book: 1, chapter: 15 } },
    reveals: ["mutation", "skills"],
  },
  {
    entityType: "character", entityId: "ardin", level: 3,
    requires: { chapterRead: { book: 1, chapter: 30 } },
    reveals: ["fullBio", "quotes", "relationships"],
  },

  // Keil
  {
    entityType: "character", entityId: "keil", level: 1,
    requires: { chapterRead: { book: 1, chapter: 1 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "keil", level: 2,
    requires: { quizPassed: { book: 1, chapter: 10 } },
    reveals: ["mutation", "skills"],
  },
  {
    entityType: "character", entityId: "keil", level: 3,
    requires: { chapterRead: { book: 2, chapter: 26 } },
    reveals: ["fullBio", "quotes", "relationships"],
  },

  // Bunker 27
  {
    entityType: "location", entityId: "bunker-27", level: 1,
    requires: { chapterRead: { book: 1, chapter: 1 } },
    reveals: ["name", "image", "shortDescription"],
  },
  {
    entityType: "location", entityId: "bunker-27", level: 2,
    requires: { quizPassed: { book: 1, chapter: 11 } },
    reveals: ["secrets", "fullDescription"],
  },

  // Old Eli
  {
    entityType: "character", entityId: "eli", level: 1,
    requires: { chapterRead: { book: 1, chapter: 6 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "eli", level: 2,
    requires: { quizPassed: { book: 1, chapter: 22 } },
    reveals: ["fullBio", "lastWords"],
  },

  // Surface
  {
    entityType: "location", entityId: "surface", level: 1,
    requires: { chapterRead: { book: 1, chapter: 29 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // ================== BOOK 2: Эволюция Пустоши ==================
  // Mira
  {
    entityType: "character", entityId: "mira", level: 1,
    requires: { chapterRead: { book: 2, chapter: 13 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "mira", level: 2,
    requires: { quizPassed: { book: 2, chapter: 16 } },
    reveals: ["mutation", "skills", "implant"],
  },
  {
    entityType: "character", entityId: "mira", level: 3,
    requires: { chapterRead: { book: 2, chapter: 30 } },
    reveals: ["fullBio", "quotes", "relationships"],
  },

  // Grey Zone
  {
    entityType: "location", entityId: "grey-zone", level: 1,
    requires: { chapterRead: { book: 2, chapter: 8 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // Rusty
  {
    entityType: "character", entityId: "rusty", level: 1,
    requires: { chapterRead: { book: 2, chapter: 5 } },
    reveals: ["name", "portrait", "shortBio"],
  },

  // Skar
  {
    entityType: "character", entityId: "skar", level: 1,
    requires: { chapterRead: { book: 2, chapter: 22 } },
    reveals: ["name", "portrait", "shortBio"],
  },

  // ================== BOOK 3: Хромосома Феникса ==================
  // Bunker 12
  {
    entityType: "location", entityId: "bunker-12", level: 1,
    requires: { chapterRead: { book: 3, chapter: 2 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // Dr. Coule
  {
    entityType: "character", entityId: "coule", level: 1,
    requires: { chapterRead: { book: 3, chapter: 4 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "coule", level: 2,
    requires: { quizPassed: { book: 3, chapter: 15 } },
    reveals: ["fullBio", "role"],
  },

  // Seraphima
  {
    entityType: "character", entityId: "seraphima", level: 1,
    requires: { chapterRead: { book: 3, chapter: 13 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "seraphima", level: 2,
    requires: { quizPassed: { book: 3, chapter: 20 } },
    reveals: ["fullBio", "skills"],
  },
  {
    entityType: "character", entityId: "seraphima", level: 3,
    requires: { chapterRead: { book: 4, chapter: 20 } },
    reveals: ["quotes", "relationships", "evolution"],
  },

  // Raven
  {
    entityType: "character", entityId: "raven", level: 1,
    requires: { chapterRead: { book: 3, chapter: 10 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "raven", level: 2,
    requires: { quizPassed: { book: 3, chapter: 19 } },
    reveals: ["mutation", "skills"],
  },
  {
    entityType: "character", entityId: "raven", level: 3,
    requires: { chapterRead: { book: 4, chapter: 30 } },
    reveals: ["fullBio", "quotes"],
  },

  // Red Zone
  {
    entityType: "location", entityId: "red-zone", level: 1,
    requires: { chapterRead: { book: 3, chapter: 11 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // Seraphima's Community
  {
    entityType: "location", entityId: "seraphima-community", level: 1,
    requires: { chapterRead: { book: 3, chapter: 13 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // Bunker 0 / Architect
  {
    entityType: "location", entityId: "bunker-0", level: 1,
    requires: { chapterRead: { book: 3, chapter: 17 } },
    reveals: ["name", "image", "shortDescription"],
  },
  {
    entityType: "character", entityId: "architect", level: 1,
    requires: { chapterRead: { book: 3, chapter: 17 } },
    reveals: ["name", "portrait", "shortBio"],
  },

  // Bunker 38
  {
    entityType: "location", entityId: "bunker-38", level: 1,
    requires: { chapterRead: { book: 3, chapter: 22 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // Alexander Marks
  {
    entityType: "character", entityId: "marks", level: 1,
    requires: { chapterRead: { book: 3, chapter: 25 } },
    reveals: ["name", "portrait", "shortBio"],
  },

  // ================== BOOK 4: Наследники Пустоши ==================
  // Nora
  {
    entityType: "character", entityId: "nora", level: 1,
    requires: { chapterRead: { book: 4, chapter: 5 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "nora", level: 2,
    requires: { quizPassed: { book: 4, chapter: 15 } },
    reveals: ["fullBio", "motivation"],
  },

  // Zak
  {
    entityType: "character", entityId: "zak", level: 1,
    requires: { chapterRead: { book: 4, chapter: 6 } },
    reveals: ["name", "portrait", "shortBio"],
  },

  // Aiden
  {
    entityType: "character", entityId: "aiden", level: 1,
    requires: { chapterRead: { book: 4, chapter: 21 } },
    reveals: ["name", "portrait", "shortBio"],
  },
  {
    entityType: "character", entityId: "aiden", level: 2,
    requires: { quizPassed: { book: 4, chapter: 22 } },
    reveals: ["mutation", "backstory"],
  },
  {
    entityType: "character", entityId: "aiden", level: 3,
    requires: { chapterRead: { book: 4, chapter: 30 } },
    reveals: ["fullBio", "quotes", "relationships"],
  },

  // Eastern Communes
  {
    entityType: "location", entityId: "eastern-communes", level: 1,
    requires: { chapterRead: { book: 4, chapter: 17 } },
    reveals: ["name", "image", "shortDescription"],
  },

  // Ardin level 4 — fatherhood arc
  {
    entityType: "character", entityId: "ardin", level: 4,
    requires: { chapterRead: { book: 4, chapter: 23 } },
    reveals: ["fatherhood", "evolution"],
  },

  // Keil level 4 — diplomat arc
  {
    entityType: "character", entityId: "keil", level: 4,
    requires: { quizPassed: { book: 4, chapter: 20 } },
    reveals: ["diplomat", "scars"],
  },

  // Creatures
  {
    entityType: "creature", entityId: "metallic-trees", level: 1,
    requires: { chapterRead: { book: 3, chapter: 11 } },
    reveals: ["name", "image", "description"],
  },
  {
    entityType: "creature", entityId: "rad-flowers", level: 1,
    requires: { chapterRead: { book: 3, chapter: 11 } },
    reveals: ["name", "image", "description"],
  },
  {
    entityType: "creature", entityId: "virus-chistota", level: 1,
    requires: { chapterRead: { book: 4, chapter: 25 } },
    reveals: ["name", "image", "description"],
  },
];

export function evaluateUnlocks(
  progress: { book_id: number; chapter_id: number; completed: boolean }[],
  passedQuizzes: { book_id: number; chapter_id: number }[],
  currentUnlocks: { entity_type: string; entity_id: string; unlock_level: number }[]
): UnlockRule[] {
  const newUnlocks: UnlockRule[] = [];

  for (const rule of unlockRules) {
    const already = currentUnlocks.find(
      (u) =>
        u.entity_type === rule.entityType &&
        u.entity_id === rule.entityId &&
        u.unlock_level >= rule.level
    );
    if (already) continue;

    let met = false;
    if (rule.requires.chapterRead) {
      const { book, chapter } = rule.requires.chapterRead;
      met = progress.some(
        (p) => p.book_id === book && p.chapter_id >= chapter && p.completed
      );
    }
    if (rule.requires.quizPassed) {
      const { book, chapter } = rule.requires.quizPassed;
      met = passedQuizzes.some(
        (q) => q.book_id === book && q.chapter_id === chapter
      );
    }

    if (met) newUnlocks.push(rule);
  }

  return newUnlocks;
}
