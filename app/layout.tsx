import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import MobileMenu from "@/app/components/MobileMenu";
import { getCategories } from "@/app/blog/lib/posts";
import { Code, Mail } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunwoo's Dev Log",
  description: "Growing as a developer, step by step.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-[50] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
            <nav className="w-full px-6 h-16 flex justify-between items-center">
              <h1 className="text-xl font-black tracking-tighter">
                <Link href="/" className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">S</span>
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">SEON.UI</span>
                </Link>
              </h1>
              
              <ul className="hidden md:flex gap-8 text-sm font-medium">
                <li>
                  <Link href="/blog" className="text-zinc-500 hover:text-emerald-500 transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="/about" className="text-zinc-500 hover:text-emerald-500 transition-colors">About</Link>
                </li>
              </ul>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 mr-2 border-r border-zinc-100 dark:border-zinc-800 pr-3">
                  <a href="https://github.com/SeonUI" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors">
                    <Code className="h-5 w-5" />
                  </a>
                  <a href="mailto:zxc135468@skku.edu" className="text-zinc-400 hover:text-emerald-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
                <ThemeToggle />
                <MobileMenu categories={categories} />
              </div>
            </nav>
          </header>
          
          <div className="flex min-h-[calc(100vh-64px)] w-full">
            <Sidebar />
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>

          <footer className="border-t border-zinc-100 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="w-full px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-zinc-500 text-sm">© 2026 SeonUI. Built with Next.js & Tailwind</p>
              <div className="flex gap-6">
                <a href="https://github.com/SeonUI" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2">
                  <Code className="h-4 w-4" /> Github
                </a>
                <a href="mailto:zxc135468@skku.edu" className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
