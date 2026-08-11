"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4" dir="rtl">
      <h2 className="text-2xl font-bold text-destructive">
        حدث خطأ ما
      </h2>
      <p className="text-muted-foreground">
        نعتذر، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
      </p>
      <Button onClick={reset} variant="default">
        إعادة المحاولة
      </Button>
    </div>
  );
}