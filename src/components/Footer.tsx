import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-bunker-800 bg-bunker-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg text-ash-200 mb-3">
              Геном Апокалипсиса
            </h3>
            <p className="text-sm text-ash-500 leading-relaxed">
              Серия из семи книг о людях, которые ищут правду, учатся доверять и
              выбирают мир — каждый день, снова и снова.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ash-300 mb-3 uppercase tracking-wider">
              Навигация
            </h4>
            <div className="space-y-2">
              <Link href="/books" className="block text-sm text-ash-500 hover:text-flame-400 transition-colors">
                Книги
              </Link>
              <Link href="/world" className="block text-sm text-ash-500 hover:text-flame-400 transition-colors">
                Мир
              </Link>
              <Link href="/characters" className="block text-sm text-ash-500 hover:text-flame-400 transition-colors">
                Персонажи
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ash-300 mb-3 uppercase tracking-wider">
              Серия
            </h4>
            <p className="text-sm text-ash-500 leading-relaxed">
              &laquo;Важно не кем ты стал, а каким человеком ты был на пути.&raquo;
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-bunker-800 text-center text-xs text-ash-600">
          &copy; {new Date().getFullYear()} Геном Апокалипсиса. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
