---
title: "Dynamic Programming"
date: "2025-07-20"
category: "Algorithm"
excerpt: "DP 문제 풀기"
---

동적프로그래밍은 계산했던걸 배열에 저장하는 방법이다.

이게 끝이다!! 이를 사용할수 있는 문제를 추리는 조건은 두가지이다.

(기본적으로 dp와 greedy는 특별한 알고리즘이라기보다는 문제해결법이므로 해결법을 찾는게 어려운듯)

## 조건

- Optimal Substructure
    
    문제가 부분문제로 표현될 수 있어야한다.
    다른말로, 점화식을 만들수 있어야 한다. (예시: fibo(N) = fibo(N-2) + fibo(N-1) )  
    
- Overlapping Subproblem
    
    부분문제가 반복돼서 나와야 한다.
    예를들어 모든 pro(N)이 한번만 나오면 dp를 하는 의미가 없다.
    100번씩은 나와야 뽕을 뽑는다
    

## 방식

- Top-down 방식
    
    재귀, dfs 등을 일반적으로 수행한 결과를 dp 배열에 저장하고, 나중에 똑같은 문제연산이 발생하면 dp 배열에 있는 값을 사용한다.
    대체로 함수의 parameter를 사용해 dp 배열을 만든다.
    
    일반적으로 Bottom-up 방식보다 느리고 overhead가 더 크지만, 
    꼭 필요한 subproblem만 계산하므로 더 빠를수도 있다.
    
- Bottom-up 방식
    
    dp 배열을 채워넣는다. 점화식을 이용하여, 초기조건→ 부분문제 → 원본문제를 해결한다.
    
    일반적으로 Top-down 방식보다 빠르지만, 
    모든 subproblem을 계산하므로 더 느릴수도 있다.
    

## 깨달읆

- 무엇을 parameter로 설정하고 무엇을 저장할지 잘 따져야한다.
    
    (문제의 모든 경우의 수를 수형도로 그려보면 어떤 SubProblem이 있고, 
    무엇이 Overlapping 되는지 알 지도…모른다…)
    
- 일반적으로 Top-down 방식이 뇌빼고 하기 좋으나, 시간이 더 오래걸린다.
그러나 위에서 말했듯 모든 경우의 수를 계산하지 않는다면 Top-down 방식이 좋은 선택이다.