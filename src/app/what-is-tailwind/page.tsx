import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import SemanticButton from "@/components/SemanticButton";
import UtilityButton from "@/components/UtilityButton";

const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";

const NAMING_CALLOUT = `.card-header {}\n.card-title {}\n.card-highlighted {}`;

export default function WhatIsTailwind() {
  return (
    <SlideLayout number="02" title="What is Tailwind?">
      {/* ══ Section 1: Philosophy Intro Banner (S2-01) ══ */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white 3xl:text-5xl">
          A Utility-First CSS Framework
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-6">
          Tailwind gives you composable, single-purpose utility classes that you apply directly in your markup.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          No context-switching. No naming things. No growing stylesheets.
        </p>
      </section>

      {/* Section spacer */}
      <div className="mt-16 3xl:mt-24" />

      {/* ══ Section 2: Problem Cards (S2-02) ══ */}
      <section>
        <div className="grid grid-cols-3 gap-6 3xl:gap-12">
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl">
              Context Switching
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 3xl:mt-3">
              You write HTML, jump to a CSS file, write a rule, jump back. Every change lives in two places.
            </p>
          </div>
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl">
              Naming Things Is Hard
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 3xl:mt-3">
              What do you call the highlighted card? <code>.featured</code>? <code>.card--active</code>? <code>.highlight-wrapper</code>? You decide—forever.
            </p>
          </div>
          <div className={CARD_CLASSES}>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl">
              CSS Bloat
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 3xl:mt-3">
              Old rules never safely delete. Stylesheets grow. Nobody knows what&apos;s still in use.
            </p>
          </div>
        </div>
      </section>

      {/* Section spacer */}
      <div className="mt-16 3xl:mt-24" />

      {/* ══ Section 3: Two-Column Demo Grid (S2-03, S2-04) ══ */}
      <div className="grid grid-cols-2 gap-6 3xl:gap-12">
        {/* Left column — Semantic CSS narrative end-to-end (D-10) */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
            Semantic CSS
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
            The class name hides the implementation.
          </p>
          <div className="mt-4 3xl:mt-8">
            <SemanticButton />
          </div>

          {/* Naming card (S2-04) — D-13 locks this to the LEFT column */}
          <div className="mt-4 3xl:mt-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
              With Semantic CSS
            </p>
            <div className={`${CARD_CLASSES} mt-2 3xl:mt-4`}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl">
                Card Component
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 3xl:mt-3">
                The same component would require you to coin these class names:
              </p>
            </div>
            <div className="mt-4 3xl:mt-8">
              <CodeCallout classes={NAMING_CALLOUT} />
            </div>
          </div>
        </div>

        {/* Right column — Utility-First Tailwind narrative end-to-end (D-11) */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
            Utility-First Tailwind
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
            Every style is visible inline.
          </p>
          <div className="mt-4 3xl:mt-8">
            <UtilityButton />
          </div>
          <div className="mt-4 3xl:mt-8">
            <div className={CARD_CLASSES}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-2xl">
                Card Component
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
                This card&apos;s entire visual style is declared right here in its
                class list. No separate stylesheet needed.
              </p>
            </div>
            <div className="mt-4 3xl:mt-8">
              <CodeCallout classes={CARD_CLASSES} />
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
