import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Геном Апокалипсиса — Постапокалиптическая сага",
  description:
    "Серия из семи книг о братьях Ардине, Кейле и Айдене. История о людях, которые ищут правду, учатся доверять и выбирают мир.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Геном Апокалипсиса",
    description: "Важно не кем ты стал, а каким человеком ты был на пути.",
    type: "website",
    images: ["/world/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light-theme')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
