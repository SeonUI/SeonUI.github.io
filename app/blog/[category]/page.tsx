
import { getCategories, getAllPosts } from "@/app/blog/lib/posts";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

// export const dynamicParams = false; // 정적 내보내기 시 엄격한 매칭을 위해 필요할 수 있으나, 현재는 매칭 디버깅을 위해 주석 처리하거나 제거합니다.
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  const params = categories.map((category) => ({
    category: category.slug, 
  }));
  console.log("Static Params (Slug):", params);
  return params;
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  
  const { category: slugParam } = await params;
  const categories = await getCategories();
  const currentCategory = categories.find(c => c.slug === slugParam);

  if (!currentCategory) {
    return (
      <div className="text-center py-12">
        카테고리를 찾을 수 없습니다.
      </div>
    );
  }
  
  const allPosts = await getAllPosts();

  const filteredPosts = allPosts.filter(
    (post) => post.category.trim() === currentCategory.name.trim()
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postsData = filteredPosts.map(({ content: _content, ...rest }) => rest);
  const posts: Post[] = postsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-500 hover:underline mb-4 inline-block">
          ← 돌아가기
        </Link>
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
          {currentCategory.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {currentCategory.description}
        </p>
        <p className="text-sm text-gray-500 mt-2">
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
            <Link
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
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
