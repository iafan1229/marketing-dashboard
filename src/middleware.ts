// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token, req }) => {
      // /dashboard/create 경로는 인증이 필요
      if (req.nextUrl.pathname === "/dashboard/create") {
        const isAuthorized = !!token;
        return isAuthorized;
      }
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/create",
    // 다른 보호할 경로들도 추가 가능
  ],
};
