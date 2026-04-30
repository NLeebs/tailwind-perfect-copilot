// Vitest mock for `src/components/ShikiBlock`. The real ShikiBlock is an
// async RSC that calls codeToHtml (WASM-based). React in jsdom cannot render
// async components. This synchronous mock renders a deterministic placeholder
// so tests that render pages importing ShikiBlock work in jsdom without
// triggering the "async Client Component" error.
// Aliased via `resolve.alias` in vitest.config.mts.

import React from "react";

interface ShikiBlockProps {
  code: string;
  lang: "css" | "typescript" | "javascript";
}

export default function ShikiBlock(
  _props: Readonly<ShikiBlockProps>
): React.ReactElement {
  return (
    <pre className="shiki">
      <code>MOCK</code>
    </pre>
  );
}
