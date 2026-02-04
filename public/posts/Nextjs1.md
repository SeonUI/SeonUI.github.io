---
title: "Next.js로 풀스택 앱 만들기"
date: "2024-02-04"
category: "Next.js"
excerpt: "Next.js를 사용하여 풀스택 애플리케이션 무작정 만들기"
---

# Next.js로 풀스택 앱 만들기

Next.js는 React 기반의 풀스택 프레임워크로, 서버 사이드 렌더링과 정적 생성을 지원합니다.

## Next.js의 장점

- **서버 사이드 렌더링**: SEO 최적화
- **정적 생성**: 빠른 성능
- **API 라우트**: 백엔드 구현 간편
- **자동 코드 분할**: 성능 최적화

## 설치하기

```bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm run dev
```

## API 라우트 예제

1. 프론트엔드와 백엔드
api 폴더의 route.ts 파일을 통해 간단하게 백엔드를 구현 가능
프론트엔드는 tsx 파일을 활용 (typescript + JS + HTML) 간단하게 구현할수 있다.

2. 프론트엔드의 파일
각각의 파일이 페이지 역할을 한다.
page.tsx는 해당 폴더의 대표화면을 의미한다.
[slug] 를 통해 페이지 경로에 변수를 포함시킬수 있으며, 이는 사용될수도있다.
root/public은 특별한 폴더로, 바로 접근할수있다. (root/public/aa가 있으면 aa로 접근)

3. 백엔드와 라우터

4. 기타
tailform css
params, searchparams는 비동기 개체이므로, Server component에서는 async->await을, Client component에서는 React.use()를 사용해야한다.


Next.js로 멋진 애플리케이션을 만들어보세요!
