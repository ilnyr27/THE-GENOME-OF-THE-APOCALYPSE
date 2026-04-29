"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Главная" },
  { href: "/books", label: "Книги" },
  { href: "/world", label: "Мир" },
  { href: "/characters", label: "Персонажи" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Логотип" width={40} height={40} className="group-hover:drop-shadow-[0_0_8px_rgba(255,122,17,0.5)] transition-all" />
            <span className="font-[family-name:var(--font-display)] text-lg text-ash-100 tracking-wide">
              Геном Апокалипсиса
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ash-400 hover:text-flame-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/books/1"
              className="text-sm px-4 py-2 rounded-lg bg-flame-600/20 text-flame-400 border border-flame-600/30 hover:bg-flame-600/30 hover:border-flame-500/50 transition-all duration-300"
            >
              Читать бесплатно
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile toggle — spinning logo */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1"
            aria-label="Меню"
          >
            <motion.div
              animate={{ rotate: isOpen ? 360 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src="/logo.png"
                alt="Меню"
                width={36}
                height={36}
                className={`transition-all duration-300 ${isOpen ? "drop-shadow-[0_0_8px_rgba(255,122,17,0.6)]" : ""}`}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-ash-300 hover:text-flame-400 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/books/1"
                onClick={() => setIsOpen(false)}
                className="block text-center py-2 rounded-lg bg-flame-600/20 text-flame-400 border border-flame-600/30"
              >
                Читать бесплатно
              </Link>
              <div className="flex justify-center pt-2">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
