"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";
import { cn } from "@/lib/utils";

interface StepConfig {
  label: string;
  newClasses: string;
  allClasses: string;
}

const STEPS: StepConfig[] = [
  {
    label: "Layout",
    newClasses: "w-full max-w-sm",
    allClasses: "w-full max-w-sm",
  },
  {
    label: "Spacing",
    newClasses: "p-6",
    allClasses: "w-full max-w-sm p-6",
  },
  {
    label: "Typo",
    newClasses: "text-sm font-semibold",
    allClasses: "w-full max-w-sm p-6 text-sm font-semibold",
  },
  {
    label: "Color",
    newClasses: "bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
    allClasses:
      "w-full max-w-sm p-6 text-sm font-semibold bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
  },
  {
    label: "Borders",
    newClasses:
      "border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm",
    allClasses:
      "w-full max-w-sm p-6 text-sm font-semibold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm",
  },
  {
    label: "Flex",
    newClasses: "flex flex-col gap-4",
    allClasses:
      "w-full max-w-sm p-6 text-sm font-semibold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-4",
  },
];

export default function CardBuilder() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      {/* Step navigator — full width above the two-column area */}
      <div className="flex items-center justify-between gap-4 mb-8 3xl:mb-12">
        {/* Prev button */}
        <button
          type="button"
          onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
          disabled={activeStep === 0}
          className={cn(
            "flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors 3xl:text-lg 3xl:px-6 3xl:py-3",
            activeStep === 0 && "opacity-40 cursor-not-allowed pointer-events-none"
          )}
        >
          ◄ Prev
        </button>

        {/* Step nodes row */}
        <div className="flex items-center gap-4">
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              type="button"
              onClick={() => setActiveStep(i)}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={cn(
                  "flex items-center justify-center size-10 rounded-full font-semibold text-sm 3xl:size-16 3xl:text-xl transition-colors",
                  i === activeStep
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-950 cursor-default"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600"
                )}
              >
                {i + 1}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 3xl:text-sm">
                {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => setActiveStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={activeStep === STEPS.length - 1}
          className={cn(
            "flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors 3xl:text-lg 3xl:px-6 3xl:py-3",
            activeStep === STEPS.length - 1 &&
              "opacity-40 cursor-not-allowed pointer-events-none"
          )}
        >
          Next ►
        </button>
      </div>

      {/* Two-column: card (left) + callout (right) */}
      <div className="grid grid-cols-2 gap-6 3xl:gap-12 mt-8 3xl:mt-12">
        {/* Left: demo card */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-4">
            RESULT
          </p>
          <div className={STEPS[activeStep].allClasses}>
            <h3>Tailwind Card</h3>
            <p>Utilities compose one step at a time.</p>
          </div>
        </div>

        {/* Right: CodeCallout */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-4">
            NEW CLASSES
          </p>
          <CodeCallout classes={STEPS[activeStep].newClasses} />
        </div>
      </div>
    </div>
  );
}
