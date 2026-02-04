"use client";

import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const [category, setCategory] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setCategory(decodeURIComponent(resolvedParams.name));
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!category) return;

    const loadPosts = async () => {
      try {
        const response = await fetch(`/api/posts/category/${encodeURIComponent(category)}`);
        if (!response.ok) {
          throw new Error("포스트를 찾을 수 없습니다.");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("포스트 로드 실패:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category]);

  if (loading) {
    return <div className="text-center text-gray-500 py-12">로딩 중...</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-8">
        <a href="/blog" className="text-blue-500 hover:underline mb-4 inline-block">
          ← 돌아가기
        </a>
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
          {category}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          총 {posts.length}개의 포스트
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          이 분류에 해당하는 포스트가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/posts/${post.slug}`}
              className="block bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <h2 className="text-xl font-bold text-black dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {new Date(post.date).toLocaleDateString("ko-KR")}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
