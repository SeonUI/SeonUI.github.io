
import { getAllPosts, getPost } from "@/app/blog/lib/posts";
import { marked } from "marked";
 
interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. 빌드 시 어떤 페이지들을 만들지 결정
export async function generateStaticParams() {
  const posts = await getAllPosts(); // lib에서 직접 가져옴
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
 
export default async function PostPage({ params }: PageProps) {

  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
   return (
      <div className="text-center text-gray-500 py-12">
        포스트를 찾을 수 없습니다.
      </div>
    );
  }

  const htmlContent = await marked(post.content);

  return (
    <article className="max-w-3xl mx-auto px-8 py-12">
      {/* 포스트 헤더 */}
      <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          {post.title}
        </h1>
        <time className="text-gray-500 dark:text-gray-400">
          {new Date(post.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {/* 포스트 본문 */}
      <div
        className="prose dark:prose-invert max-w-none
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:mb-4 prose-p:leading-7
          prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-red-600
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
          prose-a:text-blue-500 prose-a:hover:underline
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:dark:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* 돌아가기 버튼 */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <a
          href="/blog"
          className="text-blue-500 hover:underline"
        >
          ← 돌아가기
        </a>
      </div>
    </article>
  );
}