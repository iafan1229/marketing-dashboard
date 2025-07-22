// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // id 추가
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // User에도 id 추가
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string; // JWT에도 uid 추가
  }
}
