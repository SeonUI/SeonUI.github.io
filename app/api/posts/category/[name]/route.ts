import { getAllPosts } from "@/app/blog/lib/posts";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const resolvedParams = await params;
    const categoryName = decodeURIComponent(resolvedParams.name);

    console.log("분류 포스트 요청:", categoryName);

    const allPosts = await getAllPosts();

    // 해당 분류의 포스트만 필터링
    const filteredPosts = allPosts.filter(
      (post) => post.category.toLowerCase() === categoryName.toLowerCase()
    );

    // API 응답용으로 content 필드 제거
    const postsData = filteredPosts.map(({ content, ...rest }) => rest);

    return NextResponse.json(postsData);
  } catch (error) {
    console.error("분류 포스트 로드 실패:", error);
    return NextResponse.json(
      { error: "포스트를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}
