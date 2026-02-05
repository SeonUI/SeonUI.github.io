
import Blog from "./posts";
import Category from "./components/Category";

export default function Home() {

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center min-h-screen gap-0 relative w-full bg-zinc-50 dark:bg-black" >
      <section 
        className="relative w-full lg:w-150 h-[40vh]  flex items-center justify-center bg-white dark:bg-black"
        style={{
          transition: "none",
        }}
      >
        <div className="w-full max-w-3xl px-8">
          <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">
             분류
          </h2>
          <Category />
        </div>
      </section>

      {/* Section 2 - 포스트목록 */}
      <section 
        className="relative w-full lg:w-150 h-[40vh]  flex items-center justify-center bg-white dark:bg-black"
        style={{
          transition: "none",
        }}
      >
        <div className="w-full max-w-3xl px-8">
          <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">
            최근 포스트
          </h2>
          <Blog />
        </div>
      </section>
    </div>
  );
}
