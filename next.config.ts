import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude non-runtime agent system files and logs from server file tracing
  outputFileTracingExcludes: {
    "*": [
      "./.agents/**/*",
      "./.gemini/**/*",
      "./audit_log.txt",
      "./brain/**/*",
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/.git/**",
        "**/.agents/**",
        "**/.gemini/**",
        "**/node_modules/**",
        "**/audit_log.txt",
      ],
    };
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  org: "miguel-justin",
  project: "portfolio-project",

  // Only print logs in CI
  silent: !process.env.CI,

  // Only widen source maps in CI to speed up local builds
  widenClientFileUpload: Boolean(process.env.CI || process.env.SENTRY_AUTH_TOKEN),

  // Disable expensive source map generation and upload during local builds unless credentials exist
  sourcemaps: {
    disable: !process.env.CI && !process.env.SENTRY_AUTH_TOKEN,
  },

  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
