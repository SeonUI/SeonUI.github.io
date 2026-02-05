
import { getCategories } from "@/app/blog/lib/posts";

interface Category {
  id: number;
  name: string;
  description: string;
}

export default async function Category() {
  const categories = await getCategories();

  return (
    <div className="w-full max-w-3xl px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`blog/${category.name}`}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-left block"
          >
            <h3 className="font-bold text-black dark:text-white mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
