"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";

// ── Single-source const — same value used by CodeCallout.classes ──
// \n renders as a line break in CodeCallout (whitespace-pre-wrap)
const DATA_CALLOUT = "data-active:bg-purple-600\ndata-active:text-white\ndata-active:border-purple-600";

const OVERLINE =
  "text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base";

export default function DataActiveDemo() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-6 3xl:gap-12">
      {/* ── Left column: card with data-active attribute ── */}
      <div>
        <p className={`${OVERLINE} mb-4 3xl:mb-6`}>DATA ATTRIBUTE</p>
        <div
          data-active={isActive ? "" : undefined}
          className="rounded-xl p-6 3xl:p-8 border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-900
                     data-active:bg-purple-600 data-active:text-white
                     data-active:border-purple-600 transition-colors duration-200"
        >
          <p className="font-semibold text-sm 3xl:text-xl text-slate-900 dark:text-white">
            Status: {isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive((v) => !v)}
          className="mt-4 px-4 py-2 3xl:px-6 3xl:py-3 rounded-lg bg-slate-100 dark:bg-slate-800
                     text-sm 3xl:text-base font-semibold text-slate-700 dark:text-slate-300
                     hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Toggle Active
        </button>
      </div>

      {/* ── Right column: CodeCallout + explanation ── */}
      <div>
        <p className={`${OVERLINE} mb-4 3xl:mb-6`}>CLASSES</p>
        <CodeCallout classes={DATA_CALLOUT} />
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-xl">
          Headless UI libraries (Radix, Headless UI) use data-* attributes
          to drive styles without class toggling.
        </p>
      </div>
    </div>
  );
}
