import Link from "next/link";

export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* 왼쪽 영역 */}
        <div className="w-full lg:w-1/2">
          <div className="mb-12">
            <Link href="/" className="group inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium mb-8 hover:opacity-80 transition-all">
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> 홈으로 돌아가기
            </Link>
            <h1 className="text-5xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">
              소개<span className="text-emerald-500">.</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              김선우입니다. 성균관대학교 소프트웨어학과입니다.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-700 dark:text-zinc-300 mb-8 text-lg leading-relaxed">
              현재 3학년 재학중이며, 여러 분야를 도전해보고 있습니다. <br/>
              단순히 코드를 짜는 것을 넘어 문제를 정의하고, 고민하고, 해결하는 데 관심이 많습니다.
              학습한 것, 고민한 것들을 기록하려고 합니다. <br/>
              {/* SeonUI는 AI를 떠올리며 지은 이름입니다. UI에 대해서는 잘 모르지만 UI/UX도 흥미로운 분야라 생각합니다. <br/> */}
            </p>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-12 mb-6">
              관심 분야
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {['LLM Application', 'Problem Solving', 'Web Development', 'Machine Learning'].map((interest) => (
                <div key={interest} className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="font-medium">{interest}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-12 mb-6">
              연락처
            </h2>
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
              <p className="text-emerald-900 dark:text-emerald-300 mb-4">이야기를 나누고 싶으시다면 언제든 연락주세요.</p>
              <a href="mailto:zxc135468@g.skku.edu" className="text-xl font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                zxc135468@g.skku.edu
              </a>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역: 기술 스택 */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24 p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center rounded-lg text-sm italic">S</span>
              Skills & Expertise
            </h2>
            <div className="space-y-8">
              {[
                { name: "C++ (PS)", level: 85, color: "bg-green-500" },
                { name: "Python (AI/ML)", level: 75, color: "bg-green-500"  },
                { name: "Java / Kotlin", level: 65, color: "bg-green-500"  },
                { name: "React / Next.js", level: 50, color: "bg-green-500"  },
                { name: "PostgreSQL", level: 45, color: "bg-green-500"  },
                //{ name: "Tailwind CSS", level: 95, color: "bg-teal-400" },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-3">
                    <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{skill.name}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                    <div className={`${skill.color} h-2 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(16,185,129,0.3)]`} style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 leading-relaxed italic">
                &ldquo;항상 새로운 기술을 배우고 적용하는 데 열정을 가지고 있습니다.&rdquo;
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
