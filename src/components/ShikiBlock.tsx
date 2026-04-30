import { codeToHtml } from "shiki";

const DARK_OVERRIDES = `.dark .shiki, .dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}`;

interface ShikiBlockProps {
  code: string;
  lang: "css" | "typescript" | "javascript";
}

export default async function ShikiBlock({
  code,
  lang,
}: Readonly<ShikiBlockProps>) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DARK_OVERRIDES }} />
      <div
        className="overflow-x-auto rounded-xl text-sm leading-relaxed 3xl:text-base"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
