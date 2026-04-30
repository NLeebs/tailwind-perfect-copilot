import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import ShikiBlock from "@/components/ShikiBlock";

const THEME_SNIPPET = `@theme {
  --color-brand-500: #3b82f6;
}`;

const UTILITY_SNIPPET = `@utility scrollbar-hidden {
  scrollbar-width: none;
}`;

const BASE_SNIPPET = `@layer base {
  h1 {
    @apply font-bold tracking-tight text-transparent
           bg-clip-text bg-linear-to-r
           from-slate-900 to-slate-500
           dark:from-white dark:to-slate-400;
  }
}`;

const V3_EQUIVALENT = `@layer utilities {
  .scrollbar-hidden {
    scrollbar-width: none;
  }
}`;

export default function CustomizingTailwind() {
  return (
    <SlideLayout number="05" title="Customizing Tailwind">
      {/* Section 1 — @theme */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          CSS-FIRST CONFIG
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={THEME_SNIPPET} lang="css" />
          <div>
            <div className="h-16 w-full rounded-xl bg-brand-500 3xl:h-24" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
              bg-brand-500 — auto-generated from the token above
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* Section 2 — @utility */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          CUSTOM UTILITIES
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={UTILITY_SNIPPET} lang="css" />
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
              V3 EQUIVALENT
            </p>
            <CodeCallout classes={V3_EQUIVALENT} />
          </div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* Section 3 — @layer base */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          BASE LAYER RULES
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={BASE_SNIPPET} lang="css" />
          <div>
            <h1 className="text-3xl 3xl:text-5xl">Live h1 Demo</h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
              No class needed — this h1 inherits the gradient from @layer base.
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  );
}
