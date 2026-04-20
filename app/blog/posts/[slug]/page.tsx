import { getAllPosts, getPost } from "@/app/blog/lib/posts";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import Link from "next/link";
 
interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

marked.use(markedKatex({
  throwOnError: false
}));

// 1. 빌드 시 어떤 페이지들을 만들지 결정
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
 
export default async function PostPage({ params }: PageProps) {
  const { slug: categoryParam } = await params;
  const slug = decodeURIComponent(categoryParam);
  const post = await getPost(slug);

  if (!post) {
   return (
      <div className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">포스트를 찾을 수 없습니다.</h1>
        <Link href="/blog" className="text-emerald-500 hover:underline">블로그 목록으로 돌아가기</Link>
      </div>
    );
  }

  const htmlContent = await marked.parse(post.content);

  return (
    <article className="max-w-3xl mx-auto px-8 py-16">
      {/* 포스트 헤더 */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30">
            {post.category}
          </span>
          <time className="text-zinc-500 dark:text-zinc-400 font-medium">
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="text-5xl font-black text-zinc-900 dark:text-zinc-50 mb-8 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
          {post.excerpt}
        </div>
      </header>

      {/* 포스트 본문 */}
      <div
        className="prose dark:prose-invert max-w-none
          prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50 prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800
          prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-8 prose-p:mb-6
          prose-code:bg-emerald-50 dark:prose-code:bg-emerald-950/30 prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:my-8 prose-pre:border prose-pre:border-white/5
          prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 dark:prose-blockquote:bg-emerald-900/10 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          prose-strong:text-zinc-900 dark:prose-strong:text-zinc-50 prose-strong:font-bold
          prose-img:rounded-3xl prose-img:shadow-2xl"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* 돌아가기 버튼 */}
      <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href="/blog"
          className="group inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-lg hover:opacity-80 transition-all"
        >
          <span className="mr-3 group-hover:-translate-x-1 transition-transform">←</span> 
          블로그 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
