# 대시보드 빌더

인터랙티브 차트로 대시보드를 쉽게 만들 수 있는 웹 애플리케이션입니다.

## 🌐 데모

[https://dashboard-builder-two.vercel.app/](https://dashboard-builder-two.vercel.app/)

## 📸 스크린샷

### 메인 페이지

![메인 페이지](https://postfiles.pstatic.net/MjAyNTA3MjRfMjYx/MDAxNzUzMzMwNTQzNDQ1._WWqpUtaHyWbzhVMb3V2jjJ5-h2CN3LaZA5Gr-igjS4g.28twoacLIMas5wLq7nDw-LUzQ4IlcQY9OD-duNsIAwYg.PNG/1.png?type=w773)

### 대시보드 목록

![대시보드 목록](https://postfiles.pstatic.net/MjAyNTA3MjRfMjM0/MDAxNzUzMzMwNTQzMzc2.3nM-ziO8OzwSWceogv6OWpiZKTXT2pfxAW2d68LQV1Qg.VczoouMw_IqPToMjs4Mj_MCimWXRk_kGGtvrL3CdY_sg.PNG/2.png?type=w3840)

### 대시보드 상세 보기

![대시보드 상세 보기](https://postfiles.pstatic.net/MjAyNTA3MjRfMjM0/MDAxNzUzMzMwNTQzMzgz.zi6Sb7girqjzISYhgc-CRR5B8AI7J5VPsdbw4QRqYBog.peXpLScUbPsQ5t3bhcUcJw6lbAOET2NBVuqLWw2-oo4g.PNG/3.png?type=w3840)

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