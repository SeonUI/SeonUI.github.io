import Blog from "./posts/index";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <section className="max-w-3xl mx-auto px-8 py-16">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-zinc-900 dark:text-zinc-50 tracking-tight">
            최근 포스트
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            지식과 경험을 기록하는 공간입니다.
          </p>
        </header>
        
        <div className="space-y-2">
          <Blog limit={10} />
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <Link 
            href="/blog/posts" 
            className="group flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-500 transition-colors"
          >
            모든 포스트 보기 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
