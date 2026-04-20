import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMetadata {
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

// 모든 포스트 가져오기
export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "public", "posts");
  
  if (!fs.existsSync(postsDir)) {
    console.error("Posts directory not found:", postsDir);
    return [];
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    try {
      const slug = file.replace(".md", "");
      const fullPath = path.join(postsDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content: content,
        title: data.title || "",
        date: data.date ? (data.date instanceof Date ? data.date.toISOString() : String(data.date)) : "",
        category: data.category || "",
        excerpt: data.excerpt || "",
      };
    } catch (error) {
      console.error(`Error parsing post ${file}:`, error);
      return null;
    }
  }).filter((post): post is Post => post !== null);

  // 날짜 기준으로 최신순 정렬
  return posts.sort(
    (a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    }
  );
}

// 특정 포스트 가져오기
export async function getPost(slug: string): Promise<Post | null> {
  const postsDir = path.join(process.cwd(), "public", "posts");
  const fullPath = path.join(postsDir, `${slug}.md`);

  let finalPath = fullPath;
  if (!fs.existsSync(fullPath)) {
    const decodedSlug = decodeURIComponent(slug);
    const altPath = path.join(postsDir, `${decodedSlug}.md`);
    if (!fs.existsSync(altPath)) {
      console.warn(`Post not found: ${fullPath} or ${altPath}`);
      return null;
    }
    finalPath = altPath;
  }

  try {
    const fileContents = fs.readFileSync(finalPath, "utf-8");
    const { data, content } = matter(fileContents);

    return {
      slug: slug,
      content: content,
      title: data.title || "",
      date: data.date ? (data.date instanceof Date ? data.date.toISOString() : String(data.date)) : "",
      category: data.category || "",
      excerpt: data.excerpt || "",
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}



// 모든 Category 가져오기
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId?: number;
}
export async function getCategories(): Promise<Category[]> {
  // 1. 파일 경로 설정 (public/categories.json)
  const filePath = path.join(process.cwd(), "public", "categories.json");
  
  try {
    // 2. 파일 읽기
    const fileContents = fs.readFileSync(filePath, "utf8");
    
    // 3. JSON 파싱해서 반환
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("카테고리 파일을 읽는 중 에러 발생:", error);
    return [];
  }
}
