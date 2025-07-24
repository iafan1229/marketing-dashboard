# Dashboard Builder

차트를 활용한 대시보드를 쉽게 생성할 수 있는 웹 애플리케이션입니다.

## 🌐 데모

[https://dashboard-builder-two.vercel.app/](https://dashboard-builder-two.vercel.app/)

## 📸 스크린샷

### 메인 페이지

![메인 페이지](https://postfiles.pstatic.net/MjAyNTA3MjRfMjYx/MDAxNzUzMzMwNTQzNDQ1._WWqpUtaHyWbzhVMb3V2jjJ5-h2CN3LaZA5Gr-igjS4g.28twoacLIMas5wLq7nDw-LUzQ4IlcQY9OD-duNsIAwYg.PNG/1.png?type=w773)

### 대시보드 생성

![대시보드 생성](https://postfiles.pstatic.net/MjAyNTA3MjRfMjM0/MDAxNzUzMzMwNTQzMzc2.3nM-ziO8OzwSWceogv6OWpiZKTXT2pfxAW2d68LQV1Qg.VczoouMw_IqPToMjs4Mj_MCimWXRk_kGGtvrL3CdY_sg.PNG/2.png?type=w3840)

### 대시보드 상세 보기

![대시보드 상세 보기](https://postfiles.pstatic.net/MjAyNTA3MjRfMjM0/MDAxNzUzMzMwNTQzMzgz.zi6Sb7girqjzISYhgc-CRR5B8AI7J5VPsdbw4QRqYBog.peXpLScUbPsQ5t3bhcUcJw6lbAOET2NBVuqLWw2-oo4g.PNG/3.png?type=w3840)

## ✨ 주요 기능

- **대시보드 생성**: 여러 차트를 포함한 커스텀 대시보드 제작
- **다양한 차트**: 막대, 선, 숫자형 차트 지원
- **실시간 데이터**: Mock API를 통한 동적 데이터 시각화
- **구글 로그인**: NextAuth.js를 통한 간편 인증
- **반응형 디자인**: 모바일 친화적 인터페이스

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **스타일링**: Tailwind CSS 4.x
- **차트**: Recharts
- **인증**: NextAuth.js
- **상태관리**: Zustand
- **개발도구**: MSW (Mock Service Worker)

## 📊 사용법

1. **대시보드 둘러보기**: 로그인 없이 기존 대시보드 조회 가능
2. **구글 로그인**: 대시보드 생성을 위한 인증
3. **대시보드 생성**:
   - 대시보드 제목 입력
   - 차트 추가 및 설정 (제목, 타입, 데이터 소스)
   - 미리보기 확인 후 생성
4. **결과 확인**: 실시간 Mock 데이터로 차트 시각화

## 📈 차트 타입

- **막대 차트**: 카테고리별 데이터 비교 (지역별 가입자 수 등)
- **선 차트**: 시계열 데이터 표시 (시간별 주문량 등)
- **숫자 차트**: 단일 지표 표시 (총 매출액 등)

## 🎯 프로젝트 구조

```
src/
├── app/                    # Next.js 페이지
├── components/
│   ├── features/          # 기능별 컴포넌트
│   └── ui/                # 공통 UI 컴포넌트
├── lib/                   # 유틸리티
├── mocks/                 # Mock API 핸들러
└── types/                 # 타입 정의
```

## 🔧 개발 도구

- **MSW**: 개발 환경에서 API 모킹
- **Mock 데이터**: 지역별 가입자, 시간별 주문량, 총 매출 등
- **TypeScript**: 타입 안전성 보장
- **ESLint**: 코드 품질 관리

## 🎨 디자인

- **브랜드 컬러**: 민트(#7fdccb), 퍼플(#bb54a8)
- **반응형**: 모바일 우선 설계
- **UI 컴포넌트**: 재사용 가능한 컴포넌트 시스템
