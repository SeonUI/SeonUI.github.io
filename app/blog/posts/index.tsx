import { getAllPosts } from "@/app/blog/lib/posts";
import Link from "next/link";

interface BlogComponentProps {
  limit?: number;
}

export default async function BlogComponent({ limit }: BlogComponentProps) {
  let posts = await getAllPosts();

  if (limit) {
    posts = posts.slice(0, limit);
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500">
        아직 작성된 포스트가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/posts/${post.slug}`}
          className="group relative block p-8 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                {post.category}
              </span>
              <time className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                {new Date(post.date).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Read More <span className="ml-1">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
