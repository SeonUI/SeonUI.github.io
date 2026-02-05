import Link from "next/link";

export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽 영역 */}
        <div className="w-full md:w-1/2 p-4">
          <div className="mb-8">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              소개
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              여러가지에 관심이 많은 개발자입니다. 현재 성균관대학교에 재학중이며, 3학년입니다. 화이팅!!!

            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8 mb-4">
              관심 분야
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-8">
              <li>인공신경망</li>
              <li>문제해결</li>
              <li>프론트엔드 개발</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8 mb-4">
              연락처
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              이야기를 나누고 싶으시다면 언제든 연락주세요.
            </p>
            <ul className="list-none mt-4 space-y-2">
              <li>
                <span className="font-semibold mr-2 text-black dark:text-white">Email:</span>
                <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">zxc135468@skku.edu</a>
              </li>
            </ul>
          </div>
        </div>

        {/* 오른쪽 영역 (빈 div) */}
        <div className="w-full md:w-1/2 p-4 min-h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
        
        
        </div>
      </div>
    </main>
  );
}