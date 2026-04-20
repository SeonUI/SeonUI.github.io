import Blog from "./index";

export default function PostsPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold mb-12 text-black dark:text-white">
        모든 포스트
      </h1>
      <Blog />
    </main>
  );
}
