
import Blog from "./posts/index";
import Category from "./components/Category";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center min-h-screen gap-0 relative w-full bg-zinc-50 dark:bg-black" >
      <section 
        className="relative w-full lg:w-1/2 h-auto lg:h-screen flex items-start justify-center bg-white dark:bg-black"
        style={{
          transition: "none",
        }}
      >
        <div className="w-full max-w-3xl px-8 h-full py-12 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">
             분류
          </h2>
          <Category />
        </div>
      </section>

      {/* Section 2 - 포스트목록 */}
      <section 
        className="relative w-full lg:w-1/2 h-auto lg:h-screen flex items-start justify-center bg-white dark:bg-black"
        style={{
          transition: "none",
        }}
      >
        <div className="w-full max-w-3xl px-8 h-full py-12 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">
            최근 포스트
          </h2>
          <Blog limit={5} />
          <div className="mt-8">
            <Link href="/blog/posts" className="text-blue-500 hover:underline">
              모든 포스트 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
