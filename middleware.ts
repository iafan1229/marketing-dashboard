// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // 미들웨어에서 추가 로직이 필요한 경우 여기에 작성
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // /dashboard/create 경로는 인증이 필요
        if (req.nextUrl.pathname.startsWith("/dashboard/create")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/create/:path*"],
};
