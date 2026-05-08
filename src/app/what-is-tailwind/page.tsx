import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import SemanticButton from "@/components/SemanticButton";
import UtilityButton from "@/components/UtilityButton";
import Link from "next/link";

const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10 4xl:p-14";

const NAMING_CALLOUT = `.card-header\n.card-title\n.card-highlighted`;

export default function WhatIsTailwind() {
  return (
    <SlideLayout number="02" title="What is Tailwind?">
      {/* ══ Section 1: Philosophy Intro Banner (S2-01) ══ */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white 3xl:text-5xl 4xl:text-6xl">
          A Utility-First CSS Framework
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 4xl:text-2xl 3xl:mt-6 4xl:mt-8">
          Tailwind CSS is a utility-first CSS framework that provides low-level,
          single-purpose, composable utility classes to build designs directly
          in your markup.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 4xl:text-2xl 3xl:mt-4 4xl:mt-5">
          No context-switching. No naming things. No growing stylesheets.{" "}
          <Link
            href="https://tailwindcss.com/docs/styling-with-utility-classes"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
            target="_blank"
          ></Link>
        </p>
      </section>

      {/* Section spacer */}
      <div className="mt-8 3xl:mt-16 4xl:mt-24" />

      {/* ══ Section 2: Problem Cards (S2-02) ══ */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base 4xl:text-lg">
          Pros
        </p>
        <div className="grid grid-cols-3 gap-6 3xl:gap-12 4xl:gap-16 mt-2 3xl:mt-4 4xl:mt-5">
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
              Context Switching
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
              You write HTML, jump to a CSS file, write a rule, jump back. Every
              change lives in two places.
            </p>
          </div>
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
              Naming Things Is Hard
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
              What do you call the highlighted card? <code>.featured</code>?{" "}
              <code>.card--active</code>? <code>.highlight-wrapper</code>? You
              decide—forever.
            </p>
          </div>
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
              CSS Bloat
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
              Old rules never safely delete. Stylesheets grow. Nobody knows
              what&apos;s still in use.
            </p>
          </div>
        </div>

        {/* Section spacer */}
        <div className="mt-8 3xl:mt-12 4xl:mt-16" />

        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base 4xl:text-lg">
          Cons
        </p>
        <div className="grid grid-cols-3 gap-6 3xl:gap-12 4xl:gap-16 mt-2 3xl:mt-4 4xl:mt-5">
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
              Class Soup
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
              HTML can become visually noisy because styling is done directly in
              the markup.
            </p>
          </div>
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
              Utility Memorization
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
              Developers need to memorize utility classes or rely on
              documentation.
            </p>
          </div>
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
              Tool Dependency
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
              Adds complexity and dependency on build tools.
            </p>
          </div>
        </div>
      </section>

      {/* Section spacer */}
      <div className="mt-16 3xl:mt-24 4xl:mt-32" />

      {/* ══ Section 3, Row 1: Button demos — stacks on small screens (S2-03) ══ */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white 3xl:text-5xl 4xl:text-6xl">
          Tailwind at Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 3xl:gap-12 4xl:gap-16 mt-4 3xl:mt-6 4xl:mt-8">
          {/* Left: Semantic CSS button */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base 4xl:text-lg">
              Semantic CSS
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 4xl:text-2xl 3xl:mt-4 4xl:mt-5">
              The class name hides the implementation.
            </p>
            <div className="mt-4 3xl:mt-8 4xl:mt-10">
              <SemanticButton />
            </div>
          </div>

          {/* Right: Utility-First Tailwind button */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base 4xl:text-lg">
              Utility-First Tailwind
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 4xl:text-2xl 3xl:mt-4 4xl:mt-5">
              Every style is visible inline.
            </p>
            <div className="mt-4 3xl:mt-8 4xl:mt-10">
              <UtilityButton />
            </div>
          </div>
        </div>

        {/* Row spacer */}
        <div className="mt-10 3xl:mt-14 4xl:mt-20" />

        {/* ══ Section 3, Row 2: Card components — stacks on small screens (S2-04) ══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 3xl:gap-12 4xl:gap-16">
          {/* Left: Naming card — D-13 locks this to the left column */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base 4xl:text-lg">
              Semantic CSS
            </p>
            <div className={`${CARD_CLASSES} mt-2 3xl:mt-4 4xl:mt-5`}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
                Card Component
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
                The same component would require you to coin these class names:
              </p>
            </div>
            <div className="mt-4 3xl:mt-8 4xl:mt-10">
              <CodeCallout classes={NAMING_CALLOUT} />
            </div>
          </div>

          {/* Right: Tailwind card */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base 4xl:text-lg">
              Utility-First Tailwind
            </p>
            <div className={`${CARD_CLASSES} mt-2 3xl:mt-4 4xl:mt-5`}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl 4xl:text-2xl">
                Card Component
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 4xl:text-lg 3xl:mt-3 4xl:mt-4">
                This card&apos;s entire visual style is declared right here in
                its class list. No separate stylesheet needed.
              </p>
            </div>
            <div className="mt-4 3xl:mt-8 4xl:mt-10">
              <CodeCallout classes={CARD_CLASSES} />
            </div>
          </div>
        </div>
      </section>
    </SlideLayout>
  );
}
