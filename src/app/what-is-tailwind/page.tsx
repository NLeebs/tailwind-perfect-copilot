import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import ButtonComparison from "@/components/ButtonComparison";

const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";

export default function WhatIsTailwind() {
  return (
    <SlideLayout number="02" title="What is Tailwind?">
      <div className="grid grid-cols-2 gap-6 3xl:gap-12">
        {/* Left column — Semantic CSS / Button Comparison */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
            Semantic CSS
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
            The class name hides the implementation.
          </p>
          <div className="mt-4 3xl:mt-8">
            <ButtonComparison />
          </div>
        </div>

        {/* Right column — Utility-First Tailwind / Documentation Card */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
            Utility-First Tailwind
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
            Every style is visible inline.
          </p>
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
