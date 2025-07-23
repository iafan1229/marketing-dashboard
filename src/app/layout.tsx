"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 항상 MSW 활성화
    import("../lib/msw").then(({ enableMocking }) => {
      enableMocking();
    });
  }, []);
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
