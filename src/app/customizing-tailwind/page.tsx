import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import ShikiBlock from "@/components/ShikiBlock";

const THEME_SNIPPET = `/* globals.css */
@import "tailwindcss";

@theme {
  --color-brand-500: #3b82f6;
}`;

const CUSTOM_UTILITY_CLASSES = `bg-brand-500`;

const UTILITY_SNIPPET = `/* globals.css */
@import "tailwindcss";

@utility glass {
  backdrop-filter: blur(12px);
  background: oklch(100% 0 0 / 0.1);
  border: 1px solid oklch(100% 0 0 / 0.2);
}`;

const GLASS_USAGE = `glass rounded-2xl p-6`;

const BASE_SNIPPET = `@layer base {
  h1 {
    @apply font-bold tracking-tight text-transparent
           bg-clip-text bg-linear-to-r
           from-slate-900 to-slate-500
           dark:from-white dark:to-slate-400;
  }
}`;

export default function CustomizingTailwind() {
  return (
    <SlideLayout number="05" title="Customizing Tailwind">
      {/* Section 1 — @theme */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white 3xl:text-5xl 4xl:text-6xl">
          Custom Colors
        </h2>
        <p className="mt-4 3xl:mt-6 4xl:mt-8 text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          UTILITY CLASSES FOR YOUR COLORS
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={THEME_SNIPPET} lang="css" />
          <div>
            <div className="h-16 w-full rounded-xl bg-brand-500 3xl:h-24" />
            <div className="mt-3">
              <CodeCallout classes={CUSTOM_UTILITY_CLASSES} />
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
              auto-generated from theme declaration — no config file needed!
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* Section 2 — @utility */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white 3xl:text-5xl 4xl:text-6xl">
          Custom Utilities
        </h2>
        <p className="mt-4 3xl:mt-6 4xl:mt-8 text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          BUILD YOUR OWN UTILITIES
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={UTILITY_SNIPPET} lang="css" />
          <div>
            <div className="flex items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-pink-500 p-10 3xl:p-14">
              <div className="glass rounded-2xl p-6 text-center text-white 3xl:p-8">
                <p className="text-lg font-bold 3xl:text-2xl">Frosted Glass</p>
                <p className="mt-1 text-sm opacity-75 3xl:text-base">
                  backdrop-filter + bg opacity + border
                </p>
              </div>
            </div>
            <div className="mt-3">
              <CodeCallout classes={GLASS_USAGE} />
            </div>
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
            <h1>Live h1 Demo</h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
              No class needed — this h1 inherits the gradient from @layer base.
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  );
}
