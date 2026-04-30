"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";
import { cn } from "@/lib/utils";

type Tab = "mobile" | "tablet" | "desktop";

const LAYOUT_CLASSES: Record<Tab, string> = {
  mobile: "flex flex-col gap-4",
  tablet: "flex flex-row gap-4",
  desktop: "grid grid-cols-3 gap-4",
};

// Prefixed forms shown in the CodeCallout — teaches the responsive syntax
const CALLOUT_CLASSES: Record<Tab, string> = {
  mobile: "flex flex-col gap-4",
  tablet: "md:flex-row",
  desktop: "lg:grid-cols-3",
};

const TABS: Tab[] = ["mobile", "tablet", "desktop"];

const TAB_LABELS: Record<Tab, string> = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
};

const PROFILES = [
  { name: "Alex Rivera", role: "Frontend Engineer" },
  { name: "Sam Chen", role: "Design Systems Lead" },
  { name: "Jordan Park", role: "Product Designer" },
];

export default function ResponsiveDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("mobile");

  return (
    <div>
      {/* Tab navigator row */}
      <div className="flex items-center justify-center gap-3 mb-8 3xl:mb-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "font-semibold text-sm 3xl:text-lg px-5 py-2 3xl:px-8 3xl:py-3 rounded-lg transition-colors",
              tab === activeTab
                ? "bg-cyan-500 text-white ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-950 cursor-default"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Profile card container — layout class driven by LAYOUT_CLASSES[activeTab] */}
      <div
        className={cn(
          "mt-6 3xl:mt-8 p-6 3xl:p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl",
          LAYOUT_CLASSES[activeTab]
        )}
      >
        {PROFILES.map((profile) => (
          <div
            key={profile.name}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 3xl:p-6 flex flex-col items-center gap-2 3xl:gap-3"
          >
            <div className="size-12 3xl:size-16 rounded-full bg-slate-300 dark:bg-slate-600" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white 3xl:text-base">
              {profile.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 3xl:text-sm">
              {profile.role}
            </p>
          </div>
        ))}
      </div>

      {/* CodeCallout strip — single-source: same LAYOUT_CLASSES[activeTab] drives container + callout */}
      <div className="mt-6 3xl:mt-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
          LAYOUT CLASSES
        </p>
        <CodeCallout classes={CALLOUT_CLASSES[activeTab]} />
      </div>
    </div>
  );
}
