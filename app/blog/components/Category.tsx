"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JSON 파일에서 분류 데이터 불러오기
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("분류 데이터 로드 실패:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl px-8">
      
      {loading ? (
        <div className="text-center text-gray-500">로딩 중...</div>
      ) : (
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
      )}
    </div>
  );
}
