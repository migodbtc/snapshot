"use client";

import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("[Global Error Caught]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* NextError is the standard Next.js error page component. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
