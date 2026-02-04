import { getAllPosts } from "@/app/blog/lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await getAllPosts();
    // API 응답용으로 content 필드 제거 (요약만 필요)
    const postsData = posts.map(({ content, ...rest }) => rest);
    return NextResponse.json(postsData);
  } catch (error) {
    console.error("포스트 로드 실패:", error);
    return NextResponse.json(
      { error: "포스트를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}
