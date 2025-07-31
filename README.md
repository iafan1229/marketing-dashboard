# 대시보드 빌더

차트를 직접 선택하여 대시보드를 쉽게 만들 수 있는 웹 애플리케이션입니다.

## 🌐 데모

[https://dashboard-builder-two.vercel.app/](https://dashboard-builder-two.vercel.app/)

## 📸 스크린샷

### 메인 페이지

![메인 페이지](https://postfiles.pstatic.net/MjAyNTA3MjRfMjYx/MDAxNzUzMzMwNTQzNDQ1._WWqpUtaHyWbzhVMb3V2jjJ5-h2CN3LaZA5Gr-igjS4g.28twoacLIMas5wLq7nDw-LUzQ4IlcQY9OD-duNsIAwYg.PNG/1.png?type=w773)

### 대시보드 목록

![대시보드 목록](https://postfiles.pstatic.net/MjAyNTA3MzFfMTE2/MDAxNzUzOTQwNDM5ODcy.4mecPYSORwSpRYk5_ZOc2pSthBSyyPxzFU7W4UalrhAg.bJEWrS4MZ5wdXICZB-OYZHbRVN1J9Vjc-V_7LQmPiCwg.PNG/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-07-31_%EC%98%A4%ED%9B%84_12.49.56.png?type=w773)

### 대시보드 상세 보기

![대시보드 상세 보기](https://postfiles.pstatic.net/MjAyNTA3MzFfMjgg/MDAxNzUzOTQwNDQzNDA5.VtO4x7dmTqyrqwR8UHRcgWo8-beNhu9glI1siDmZOSIg.y6kHOjl4DujsnqT8bY3HbaMc0Vsqacc8u8mMm5Vogicg.PNG/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-07-31_%EC%98%A4%ED%9B%84_12.50.26.png?type=w773)

## 소개

Next.js와 TypeScript로 구축된 인터랙티브 차트 대시보드 생성 도구입니다.
구글 로그인으로 간편하게 시작하여 막대/선/숫자/파이/영역 차트를 조합한 나만의 대시보드를 만들어보세요.
아토믹 디자인 패턴을 적용한 확장 가능한 아키텍처로 개발되었으며, Tailwind CSS와 Recharts를 활용한 반응형 UI를 제공합니다.

## 🎨 핵심 특징

- **모던 React 패턴**: 아토믹 디자인 패턴 / Container-Presenter-Hook 패턴
- **확장 가능한 아키텍처**: 새로운 차트, 기능, UI 컴포넌트 추가가 쉬움
- **UI 컴포넌트**: 재사용 가능한 컴포넌트 시스템
- **UI 디자인**: Tailwind CSS
- **구글 인증**: NextAuth.js를 통한 간편 로그인

## ✨ 주요 기능

- **대시보드 생성**: 여러 차트가 포함된 커스텀 대시보드 구축
- **다양한 차트**: 막대 차트, 선 차트, 숫자 표시 지원
- **데이터 시각화**: Mock API를 통한 동적 데이터 시각화
- **반응형 디자인**: 모바일 친화적 인터페이스

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 14, React 18, TypeScript
- **스타일링**: Tailwind CSS 4.x
- **차트**: Recharts
- **인증**: NextAuth.js
- **상태 관리**: Zustand
- **개발**: MSW (Mock Service Worker)
- **프로덕션**: API route / Vercel

## 📊 사용 방법

1. **대시보드 둘러보기**: 인증 없이 기존 대시보드 보기
2. **구글 로그인**: 대시보드 생성을 위한 로그인
3. **대시보드 생성**:
   - 대시보드 제목 입력
   - 차트 추가 및 설정 (제목, 유형, 데이터 소스)
   - 대시보드 생성
4. **결과 확인**: 모의 데이터로 차트 시각화

## 📈 차트 유형

- **막대 차트**: 카테고리별 데이터 비교 (지역별 가입자 등)
- **선 차트**: 시계열 데이터 표시 (시간별 주문량 등)
- **숫자 차트**: 단일 지표 표시 (총 매출 등)

## 🎯 프로젝트 구조

```
src/
├── app/                   # Next.js 페이지
├── components/            # 아토믹 디자인 패턴
│   ├── features/          # 기능별 컴포넌트
│   └── ui/                # 공통 UI 컴포넌트
├── lib/                   # 설정
├── mocks/                 # Mock API 핸들러
└── types/                 # 타입 정의
```

## 🔧 개발 도구

- **MSW**: 개발 환경에서 API 모킹
- **모의 데이터**: 지역별 가입자, 시간별 주문량, 총 매출 등
- **TypeScript**: 타입 안전성
- **ESLint**: 코드 품질 관리
