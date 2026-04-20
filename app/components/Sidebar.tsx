import Link from "next/link";
import { getCategories, getAllPosts, Category } from "@/app/blog/lib/posts";
import { Search } from "./Search";

export default async function Sidebar() {
  const categories = await getCategories();
  const allPosts = await getAllPosts();
  
  const searchPosts = allPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    category: post.category
  }));

  const rootCategories = categories.filter(c => !c.parentId);
  const getChildren = (parentId: number) => categories.filter(c => c.parentId === parentId);

  return (
    <aside className="w-72 flex-shrink-0 border-r border-zinc-100 dark:border-zinc-800 p-8 hidden lg:block bg-zinc-50 dark:bg-zinc-900/50 min-h-full">
      <div className="sticky top-24 space-y-12">
        {/* Search Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-zinc-500 px-3">
            Search
          </h2>
          <Search posts={searchPosts} />
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-zinc-500 px-3">
            Categories
          </h2>
          <nav className="space-y-6">
            <Link 
              href="/blog" 
              className="px-3 py-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:opacity-80 block transition-all mb-2"
            >
              All Posts
            </Link>
            
            <ul className="space-y-6">
              {rootCategories.map((root) => (
                <li key={root.id}>
                  <div className="px-3 py-1 text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-2 border-l-2 border-emerald-500/30">
                    {root.name}
                  </div>
                  <ul className="space-y-1 mt-2">
                    {getChildren(root.id).map((child) => (
                      <li key={child.id}>
                        <Link 
                          href={`/blog/${child.slug}`}
                          className="px-3 py-1.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 block transition-all ml-2"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
          <h3 className="text-emerald-900 dark:text-emerald-300 font-bold mb-2 text-sm">Newsletter</h3>
          <p className="text-emerald-700/70 dark:text-emerald-400/70 text-xs mb-4">
            새로운 글 소식을 받아보세요.
          </p>
          <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors">
            구독하기
          </button>
        </div> */}
      </div>
    </aside>
  );
}
