import fs from "fs";
import path from "path";

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
  // 더 유연한 정규식 (줄바꿈 변동 대응)
  const frontMatterRegex = /^-{3,}\s*\n([\s\S]*?)\n-{3,}\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    console.error("Front Matter 파싱 실패. 파일 형식:", content.substring(0, 100));
    throw new Error("Invalid front matter format");
  }

  const metadataStr = match[1];
  const body = match[2];

  const metadata: PostMetadata = {
    title: "",
    date: "",
    category: "",
    excerpt: "",
  };

  // YAML 파싱
  const lines = metadataStr.split("\n");
  lines.forEach((line) => {
    if (!line.trim()) return; // 빈 줄 무시
    
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key === "title") metadata.title = value;
    if (key === "date") metadata.date = value;
    if (key === "category") metadata.category = value;
    if (key === "excerpt") metadata.excerpt = value;
  });

  return { metadata, body };
}

// 모든 포스트 가져오기
export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "/public/posts");
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    const fullPath = path.join(postsDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    const { metadata, body } = parseFrontMatter(content);

    return {
      slug,
      content: body,
      ...metadata,
    };
  });

  // 날짜 기준으로 최신순 정렬
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// 특정 포스트 가져오기
export async function getPost(slug: string): Promise<Post | null> {
  const postsDir = path.join(process.cwd(), "/public/posts");
  const fullPath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const { metadata, body } = parseFrontMatter(content);

  return {
    slug,
    content: body,
    ...metadata,
  };
}
