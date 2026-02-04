---
title: "TypeScript 완벽 가이드"
date: "2024-02-02"
category: "TypeScript"
excerpt: "TypeScript의 기본부터 심화까지 알아봅시다."
---

# TypeScript 완벽 가이드

TypeScript는 JavaScript에 정적 타입을 추가하여 개발 경험을 개선합니다.

## TypeScript가 필요한 이유

- **타입 안정성**: 컴파일 시점에 오류 발견
- **자동 완성**: IDE 지원 향상
- **유지보수성**: 코드 가독성 증가
- **대규모 프로젝트**: 팀 협업 용이

## 기본 타입

```typescript
// 숫자
let num: number = 42;

// 문자열
let str: string = "Hello";

// 불린
let bool: boolean = true;

// 배열
let arr: number[] = [1, 2, 3];

// 객체
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};
```

## 함수 타입

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 3); // result의 타입은 number
```

TypeScript는 JavaScript 개발을 더욱 안전하고 체계적으로 만들어줍니다!
