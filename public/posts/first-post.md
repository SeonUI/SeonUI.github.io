---
title: "React 시작하기"
date: "2024-02-04"
category: "React"
excerpt: "React의 기본 개념과 시작 방법을 알아봅시다."
---

# React 시작하기

React는 Facebook에서 만든 JavaScript 라이브러리로, 사용자 인터페이스를 구축하기 위한 강력한 도구입니다.

## React란?

React는 다음과 같은 특징을 가지고 있습니다:

- **선언형**: UI를 어떻게 보이는지 선언적으로 작성
- **컴포넌트 기반**: 재사용 가능한 컴포넌트로 구성
- **효율적**: Virtual DOM을 통한 효율적인 렌더링

## 설치하기

```bash
npx create-react-app my-app
cd my-app
npm start
```

## 첫 번째 컴포넌트

```jsx
function Hello() {
  return <h1>Hello, World!</h1>;
}

export default Hello;
```

React를 배우는 것은 재미있고 보람찬 경험이 될 것입니다!
