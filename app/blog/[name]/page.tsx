
import { getCategories, getAllPosts } from "@/app/blog/lib/posts";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    name: category.name, 
  }));
}

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  
  const { name } = await params;
  const category = name 
  const allPosts = await getAllPosts();

  const filteredPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
  const postsData = filteredPosts.map(({ content, ...rest }) => rest);
  const posts: Post[] = postsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
