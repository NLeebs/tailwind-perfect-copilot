import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/test/**",
        "src/app/layout.tsx",
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: "@/components/ShikiBlock",
        replacement: path.resolve(
          __dirname,
          "./src/test/mocks/ShikiBlock.tsx"
        ),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "next/link",
        replacement: path.resolve(
          __dirname,
          "./src/test/mocks/next-link.tsx"
        ),
      },
      {
        find: "shiki",
        replacement: path.resolve(__dirname, "./src/test/mocks/shiki.ts"),
      },
    ],
  },
});
