"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";
import { cn } from "@/lib/utils";

// ── Single-source consts ── same value used by element className AND CodeCallout.classes ──

const HOVER_CLASSES = "hover:bg-sky-50 dark:hover:bg-slate-700";

// GROUP_CALLOUT is what the CodeCallout displays for Panel 2
const GROUP_CALLOUT = "group-hover:scale-105\ngroup-hover:text-sky-700";
// The actual classes applied to child elements inside the group parent
const GROUP_AVATAR_CLASSES =
  "group-hover:scale-105 group-hover:bg-sky-200 dark:group-hover:bg-sky-900";
const GROUP_TEXT_CLASSES =
  "group-hover:text-sky-700 dark:group-hover:text-sky-300";

// STATE_CALLOUT shows the cn() call as a readable string for the audience
const STATE_CALLOUT =
  "cn('rounded-xl p-6 transition-colors',\n  isActive && 'bg-blue-500 text-white')";

// ── Lookup-table map — complete static strings, no dynamic interpolation ──
const PANEL3_CLASSES: Record<"active" | "inactive", string> = {
  active: "bg-blue-500 text-white shadow-md",
  inactive:
    "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
};

const OVERLINE =
  "text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base";
const SUBLABEL =
  "text-xs text-slate-500 dark:text-slate-400 3xl:text-sm mt-2";

export default function ConditionalPanels() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-6 3xl:gap-8">
      {/* ── Panel 1: CSS VARIANTS ── */}
      <div className="flex flex-col">
        <p className={`${OVERLINE} mb-4 3xl:mb-6`}>CSS VARIANTS</p>
        <div
          className={cn(
            "rounded-xl p-6 3xl:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-colors duration-200 cursor-pointer",
            HOVER_CLASSES
          )}
        >
          <p className="font-semibold text-slate-900 dark:text-white text-sm 3xl:text-xl">
            Hover me
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 3xl:text-xl 3xl:mt-3">
            Pure CSS variant — no JS
          </p>
        </div>
        <div className="mt-3">
          <CodeCallout classes={HOVER_CLASSES} />
        </div>
        <p className={SUBLABEL}>No JavaScript — pure CSS <code>:hover</code></p>
      </div>

      {/* ── Panel 2: GROUP VARIANTS ── */}
      <div className="flex flex-col">
        <p className={`${OVERLINE} mb-4 3xl:mb-6`}>GROUP VARIANTS</p>
        <div
          className="group rounded-xl p-6 3xl:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors duration-200"
        >
          {/* Avatar — scales and changes color on parent hover */}
          <div
            className={cn(
              "size-10 3xl:size-14 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 transition-all duration-200",
              GROUP_AVATAR_CLASSES
            )}
          />
          {/* Text — shifts color on parent hover */}
          <p
            className={cn(
              "text-sm 3xl:text-xl text-slate-600 dark:text-slate-400 transition-colors duration-200",
              GROUP_TEXT_CLASSES
            )}
          >
            Hover the card
          </p>
        </div>
        <div className="mt-3">
          <CodeCallout classes={GROUP_CALLOUT} />
        </div>
        <p className={SUBLABEL}>
          Parent <code>group</code> drives all children simultaneously
        </p>
      </div>

      {/* ── Panel 3: REACT STATE ── */}
      <div className="flex flex-col">
        <p className={`${OVERLINE} mb-4 3xl:mb-6`}>REACT STATE</p>
        <div
          className={cn(
            "rounded-xl p-6 3xl:p-8 transition-colors duration-200",
            PANEL3_CLASSES[isActive ? "active" : "inactive"]
          )}
        >
          <p className="font-semibold text-sm 3xl:text-xl">
            Status: {isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive((v) => !v)}
          className="mt-4 px-4 py-2 3xl:px-6 3xl:py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm 3xl:text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-start"
        >
          Toggle
        </button>
        <div className="mt-3">
          <CodeCallout classes={STATE_CALLOUT} />
        </div>
        <p className={SUBLABEL}>Explicit React state — full programmatic control</p>
      </div>
    </div>
  );
}
