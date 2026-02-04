"use client";

import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export default function BlogComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 포스트 목록 가져오기
    const loadPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        // 배열 확인
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("포스트 데이터가 배열이 아닙니다:", data);
          setPosts([]);
        }
      } catch (error) {
        console.error("포스트 로드 실패:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">로딩 중...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-gray-500">포스트가 없습니다.</div>;
  }

  return (
    <div className="mt-8">
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`./blog/posts/${post.slug}`}
          className="block bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {new Date(post.date).toLocaleDateString("ko-KR")}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {post.excerpt}
          </p>
        </a>
      ))}
    </div>
  );
}