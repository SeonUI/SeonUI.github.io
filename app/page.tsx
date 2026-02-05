import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-black">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <h1 className="text-6xl font-bold mb-8 text-black dark:text-white">
          Sunwoo's Blog
        </h1>
        <p className="text-xl mb-12 text-gray-600 dark:text-gray-400 text-center">
          잡다한 것들을 확인해보세요.
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-80 transition"
          >
            블로그 방문하기
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-black dark:border-white text-black dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            소개 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
