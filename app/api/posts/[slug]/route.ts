import { getPost } from "@/app/blog/lib/posts";
import { NextResponse } from "next/server";
export const dynamic = "force-static"
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    console.log("포스트 요청:", slug);
    
    const post = await getPost(slug);

    if (!post) {
      console.log("포스트를 찾을 수 없음:", slug);
      return NextResponse.json(
        { error: "포스트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("포스트 로드 실패:", error);
    return NextResponse.json(
      { error: "포스트를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}
