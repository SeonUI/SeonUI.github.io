"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronRight, Code, Mail, Home, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/app/blog/lib/posts";

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const rootCategories = categories.filter(c => !c.parentId);
  const getChildren = (parentId: number) => categories.filter(c => c.parentId === parentId);

  // Portal에 렌더링할 내용
  const menuContent = (
    <>
      {/* Overlay - 배경 전체를 어둡게 */}
      <div 
        className={`fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Menu - 최상위 z-index 부여 */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-[300px] bg-white dark:bg-zinc-950 z-[9999] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-zinc-100 dark:border-zinc-800 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        
        {/* Header (고정) */}
        <div className="flex-none flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-lg shadow-emerald-500/20">S</span>
            <span className="font-black tracking-tighter text-zinc-900 dark:text-zinc-50 text-lg">SEON_UI</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation & Categories (스크롤 영역) */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-8 space-y-10">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 px-4">Navigation</h3>
            <div className="space-y-1">
              {[
                { name: 'Home', href: '/', icon: Home },
                { name: 'Blog', href: '/blog', icon: BookOpen },
                { name: 'About', href: '/about', icon: User },
              ].map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                      isActive 
                      ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 px-4">Categories</h3>
            <div className="space-y-8 px-2">
              {rootCategories.map((root) => (
                <div key={root.id} className="space-y-3">
                  <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest pl-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                    {root.name}
                  </div>
                  <ul className="space-y-1 ml-2 border-l border-zinc-100 dark:border-zinc-800">
                    {getChildren(root.id).map((child) => (
                      <li key={child.id}>
                        <Link 
                          href={`/blog/${child.slug}`} 
                          className="flex justify-between items-center pl-5 pr-3 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors active:bg-zinc-50 dark:active:bg-zinc-900 rounded-r-xl"
                        >
                          {child.name} 
                          <ChevronRight className="h-4 w-4 opacity-20" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer (고정) */}
        <div className="flex-none p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex justify-center gap-4 mb-4">
            <a href="https://github.com/SeonUI" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow-sm text-zinc-600 dark:text-zinc-400 font-bold text-sm">
              <Code className="h-4 w-4" /> Code
            </a>
            <a href="mailto:zxc135468@skku.edu" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow-sm text-zinc-600 dark:text-zinc-400 font-bold text-sm">
              <Mail className="h-4 w-4" /> Mail
            </a>
          </div>
          <p className="text-[10px] text-zinc-400 text-center uppercase tracking-[0.2em]">© 2026 SeonUI</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-all"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
}
