// Vitest mock for `shiki`. Shiki's real `codeToHtml` uses WASM (oniguruma)
// which jsdom cannot load. This mock returns a deterministic HTML string so
// tests that render components importing `codeToHtml` work in jsdom.
// Aliased via `resolve.alias` in vitest.config.mts.

export async function codeToHtml(
  _code: string,
  _options: { lang: string; themes: { light: string; dark: string } }
): Promise<string> {
  return '<pre class="shiki"><code>MOCK</code></pre>';
}
