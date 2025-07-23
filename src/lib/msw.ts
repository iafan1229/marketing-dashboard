"use client";

export async function enableMocking() {
  if (typeof window === "undefined") {
    return;
  }

  const { worker } = await import("../mocks/browsers");

  // Start the worker
  await worker.start({
    onUnhandledRequest: "bypass",
  });

  console.log("🔧 MSW enabled for browser");
}
