"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";

const TAILWIND_BTN_CLASSES =
  "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";

const BTN_CSS_DEFINITION = `.btn {\n  background-color: #06b6d4;\n  color: white;\n  font-weight: 600;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.5rem;\n}`;

export default function ButtonComparison() {
  const [showCss, setShowCss] = useState(false);

  return (
    <div className="space-y-8 3xl:space-y-16">
      <style>{`
        .btn {
          background-color: #06b6d4;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
        }
      `}</style>

      {/* Semantic .btn button */}
      <div>
        <button
          className="btn cursor-pointer"
          onClick={() => setShowCss(!showCss)}
        >
          Button
        </button>
        {showCss && (
          <div className="mt-4 3xl:mt-8">
            <CodeCallout classes={BTN_CSS_DEFINITION} />
          </div>
        )}
      </div>

      {/* Tailwind utilities button */}
      <div>
        <button className={TAILWIND_BTN_CLASSES}>Button</button>
        <div className="mt-4 3xl:mt-8">
          <CodeCallout classes={TAILWIND_BTN_CLASSES} />
        </div>
      </div>
    </div>
  );
}
