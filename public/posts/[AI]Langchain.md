---
title: "Langchain 기본"
date: "2025-07-20"
category: "AI 활용"
excerpt: "Langchain의 기본 체계"
---

1. 프롬프트 템플릿 (Prompt Templates)
LangChain은 하드코딩된 텍스트 대신, 상황에 따라 동적으로 변하는 템플릿을 사용하여 프롬프트를 조직합니다.

- 변수 주입 (Variable Injection): 사용자의 입력값이나 검색된 데이터를 프롬프트의 특정 위치(예: {question}, {context})에 쏙 끼워 넣을 수 있도록 뼈대를 만듭니다.

- 역할 부여 (System & Human Messages): 채팅 모델(Chat Models)을 위해 '시스템(AI의 역할 설정)'과 '사용자(실제 질문)'의 메시지를 명확히 구분하여 프롬프트를 구조화합니다.

- Few-Shot 프롬프팅: 모델이 참고할 수 있도록 예시 질문과 답변 쌍을 템플릿에 쉽게 포함하여 원하는 출력 형식을 유도합니다.

2. 문맥 제공 (Context Injection)
LLM이 학습하지 않은 최신 정보나 회사의 내부 문서를 기반으로 답변해야 할 때, LangChain은 두 가지 주요 방식으로 Context를 조직하여 프롬프트에 전달합니다.

- RAG (검색 증강 생성): 1. 방대한 문서를 잘게 쪼개어 벡터 데이터베이스에 저장합니다.
2. 사용자가 질문하면 관련된 문서 조각(Context)을 검색합니다.
3. 검색된 문서를 프롬프트 템플릿의 {context} 영역에 주입하여 LLM에게 전달합니다.

- 메모리 (Memory): 챗봇처럼 이전 대화의 맥락이 중요한 경우, 과거의 대화 기록(Con  text)을 기억하고 있다가 현재 질문을 처리할 때 프롬프트에 자동으로 포함시킵니다.

3. 체인(Chains)을 통한 파이프라인 조립
LangChain의 핵심은 흩어져 있는 Prompt, Context, 그리고 LLM을 하나의 매끄러운 흐름(Chain)으로 엮어내는 것입니다. 최근에는 LCEL(LangChain Expression Language)을 사용하여 이 과정을 매우 직관적으로 표현합니다.

작동 흐름 요약:

1. 입력 (Input): 사용자의 질문이 들어옵니다.
2. 문맥 검색 (Retriever): 질문과 관련된 정보(Context)를 데이터베이스나 메모리에서 가져옵니다.
3. 조립 (PromptTemplate): 템플릿에 '사용자 질문'과 '검색된 문맥'이 변수로 채워지며 최종 프롬프트 텍스트가 완성됩니다.
4. 추론 (LLM): 완성된 프롬프트가 LLM에 전달되어 답변을 생성합니다.
5. 출력 (OutputParser): 생성된 텍스트를 JSON, 리스트 등 사용하기 쉬운 형태로 정제합니다.