import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import ConditionalPanels from "@/components/ConditionalPanels";
import DataActiveDemo from "@/components/DataActiveDemo";

// ── Section 2 single-source consts — same value used by element + CodeCallout ──
const MERGE_CALLOUT = "cn('bg-red-500', 'bg-blue-500')\n→ 'bg-blue-500'";
const PEER_CALLOUT = "peer\npeer-invalid:visible text-red-500";

const OVERLINE =
  "text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base";

export default function ConditionalStyling() {
  return (
    <SlideLayout number="06" title="Conditional Styling">

      {/* ══ Section 1: Three-panel comparison (S6-01) ══ */}
      <section>
        <p className={OVERLINE}>CONDITIONAL VARIANTS</p>
        <div className="mt-8 3xl:mt-12">
          <ConditionalPanels />
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* ══ Section 2: cn() merge + peer-invalid (S6-02 + S6-03) ══ */}
      <section>
        <div className="grid grid-cols-2 gap-6 3xl:gap-12">

          {/* Left column: cn() merge demo */}
          <div>
            <p className={`${OVERLINE} mb-4 3xl:mb-6`}>CN() MERGE</p>
            {/* Swatch shows blue wins — tailwind-merge resolved bg-red-500 vs bg-blue-500 */}
            <div className="h-16 3xl:h-24 w-full rounded-xl bg-blue-500" />
            <div className="mt-3">
              <CodeCallout classes={MERGE_CALLOUT} />
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-xl">
              tailwind-merge resolves conflicting utility classes — the last applicable class wins.
            </p>
          </div>

          {/* Right column: peer-invalid form */}
          <div>
            <p className={`${OVERLINE} mb-4 3xl:mb-6`}>PEER VARIANTS</p>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 3xl:text-base block">
                Email address
              </label>
              {/*
                CRITICAL DOM ORDER: <input> MUST come before <p> in JSX.
                CSS subsequent-sibling combinator (.peer ~ .sibling) only matches
                elements that follow the peer in the DOM. Reversing this order
                silently breaks peer-invalid:visible — the error never appears.
              */}
              <input
                type="email"
                className="peer w-full rounded-lg border border-slate-200 dark:border-slate-700
                           bg-white dark:bg-slate-900 px-3 py-2 text-sm 3xl:text-base 3xl:px-4 3xl:py-3
                           focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
              />
              {/* Invisible by default; peer-invalid:visible shows when input is invalid */}
              <p className="invisible peer-invalid:visible text-red-500 text-xs 3xl:text-sm mt-1">
                Please enter a valid email address.
              </p>
            </div>
            <div className="mt-3">
              <CodeCallout classes={PEER_CALLOUT} />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* ══ Section 3: data-active attribute toggle (S6-04) ══ */}
      <section>
        <DataActiveDemo />
      </section>

    </SlideLayout>
  );
}
