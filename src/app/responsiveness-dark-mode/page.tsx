import SlideLayout from "@/components/SlideLayout";
import ResponsiveDemo from "@/components/ResponsiveDemo";
import CodeCallout from "@/components/CodeCallout";

// Single-source consts — each string drives both a card element className and a CodeCallout prop.
// DARK_CLASSES: multi-line string; whitespace-pre-wrap in CodeCallout renders each pair on its own line.
const DARK_CLASSES =
  "dark:bg-slate-800   (header zone)\ndark:bg-slate-900   (body zone)\ndark:text-white     (title)\ndark:text-slate-400 (body text)\ndark:border-slate-700\ndark:bg-slate-700 dark:text-slate-200   (badge)\ndark:bg-cyan-600    (button)";

// STACKED_CLASSES: the dark:md:hover: classes on the action button — shown in the stacked variants callout.
const STACKED_CLASSES = "dark:md:hover:bg-sky-600 dark:md:hover:text-white";

export default function ResponsivenessDarkMode() {
  return (
    <SlideLayout number="04" title="Responsiveness & Dark Mode">
      {/* Section 1 — Responsive Layouts */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Responsive Layouts
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          Click a breakpoint to see how prefix classes reflow the layout.
        </p>
        <div className="mt-8 3xl:mt-12">
          <ResponsiveDemo />
        </div>
      </section>

      {/* Spacer between sections */}
      <div className="mt-16 3xl:mt-24" />

      {/* Section 2 — Dark Mode with dark: */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Dark Mode with dark:
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          Toggle dark mode — every utility shifts in one class prefix.
        </p>

        <div className="mt-8 3xl:mt-12">
          {/* DarkModeCard — pure RSC, ThemeToggle on <html> drives all dark: variants */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
            {/* Header zone */}
            <div className="bg-slate-100 dark:bg-slate-800 px-8 py-5 3xl:px-12 3xl:py-7 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-2xl">
                Your Dashboard
              </h3>
              <span className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-xs font-semibold px-2 py-0.5 rounded-full 3xl:text-sm">
                Pro
              </span>
            </div>

            {/* Body zone */}
            <div className="bg-white dark:bg-slate-900 px-8 py-6 3xl:px-12 3xl:py-8">
              <p className="text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
                Here&apos;s a summary of your recent activity. Toggle dark mode
                to see how every utility class responds.
              </p>
            </div>

            {/* Action zone */}
            <div className="bg-white dark:bg-slate-900 px-8 pb-6 3xl:px-12 3xl:pb-8">
              <button
                type="button"
                className="bg-cyan-500 text-white dark:bg-cyan-600 dark:text-white hover:bg-cyan-600 dark:hover:bg-cyan-700 dark:md:hover:bg-sky-600 dark:md:hover:text-white font-semibold text-sm 3xl:text-base px-5 py-2 3xl:px-7 3xl:py-3 rounded-lg transition-colors"
              >
                View Report
              </button>
            </div>
          </div>

          {/* Overline + Chip 1: all dark: pairs */}
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2 mt-6 3xl:mt-8">
            DARK MODE CLASSES
          </p>
          <CodeCallout classes={DARK_CLASSES} />

          {/* Overline + Chip 2: stacked variants */}
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2 mt-4 3xl:mt-6">
            STACKED VARIANTS
          </p>
          <CodeCallout classes={STACKED_CLASSES} />
        </div>
      </section>
    </SlideLayout>
  );
}
