import fs from "fs";
import path from "path";
//export const dynamic = "force-static"

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

// Front Matter 파싱 함수
function parseFrontMatter(content: string): {
  metadata: PostMetadata;
  body: string;
} {
  // BOM 제거 및 유연한 정규식 (줄바꿈 변동 대응)
  const normalizedContent = content.replace(/^\ufeff/, "");
  const frontMatterRegex = /^-{3,}\s*[\r\n]+([\s\S]*?)[\r\n]+-{3,}\s*[\r\n]*([\s\S]*)$/;
  const match = normalizedContent.match(frontMatterRegex);

  if (!match) {
    console.error("Front Matter 파싱 실패. 파일 형식:", normalizedContent.substring(0, 100));
    throw new Error("Invalid front matter format");
  }

  const metadataStr = match[1];
  const body = match[2] || "";

  const metadata: PostMetadata = {
    title: "",
    date: "",
    category: "",
    excerpt: "",
  };

  // YAML 파싱
  const lines = metadataStr.split(/[\r\n]+/);
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return; 
    
    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex === -1) return;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    const value = trimmedLine.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key === "title") metadata.title = value;
    if (key === "date") metadata.date = value;
    if (key === "category") metadata.category = value;
    if (key === "excerpt") metadata.excerpt = value;
  });

  return { metadata, body };
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
      const content = fs.readFileSync(fullPath, "utf-8");
      const { metadata, body } = parseFrontMatter(content);

      return {
        slug,
        content: body,
        ...metadata,
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

  if (!fs.existsSync(fullPath)) {
    // 혹시라도 인코딩된 상태로 들어왔을 경우를 대비한 디코딩 시도
    const decodedSlug = decodeURIComponent(slug);
    const altPath = path.join(postsDir, `${decodedSlug}.md`);
    if (!fs.existsSync(altPath)) {
      console.warn(`Post not found: ${fullPath} or ${altPath}`);
      return null;
    }
    // altPath가 존재하면 content 읽기
    try {
      const content = fs.readFileSync(altPath, "utf-8");
      const { metadata, body } = parseFrontMatter(content);
      return { slug: decodedSlug, content: body, ...metadata };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) { return null; }
  }

  try {
    const content = fs.readFileSync(fullPath, "utf-8");
    const { metadata, body } = parseFrontMatter(content);

    return {
      slug: slug,
      content: body,
      ...metadata,
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
