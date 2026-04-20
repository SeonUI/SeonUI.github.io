import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-6 bg-white dark:bg-zinc-950 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-6">
          
          <h1 className="text-7xl md:text-8xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-tight">
            Think<span className="text-emerald-500">.</span> Learn<span className="text-emerald-500">.</span> <br/>
            Code<span className="text-emerald-500">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            안녕하세요, <span className="text-zinc-900 dark:text-zinc-100 font-semibold italic underline decoration-emerald-500/30 underline-offset-4">SeonUI</span>입니다. <br/>
            고민하고 성장하는 개발자입니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/blog"
            className="group relative px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">블로그 둘러보기</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl font-bold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95"
          >
            본인 소개
          </Link>
        </div>

        {/* <div className="pt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-center">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">3학년</div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Status</div>
          </div>
          <div className="text-center border-x border-zinc-100 dark:border-zinc-800 px-8">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">10+</div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">SKKU</div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Univ</div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
