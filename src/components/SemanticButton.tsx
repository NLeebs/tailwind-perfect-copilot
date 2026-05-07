"use client";
import CodeCallout from "@/components/CodeCallout";

const BTN_CSS_DEFINITION = `.btn {\n  background-color: #06b6d4;\n  color: white;\n  font-weight: 600;\n  font-size: 0.875rem;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.5rem;\n}`;

export default function SemanticButton() {
  return (
    <div>
      <style>{`
        .btn {
          background-color: #06b6d4;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
        }
        .dark .btn {
          background-color: #0891b2;
        }
      `}</style>

      <button type="button" className="btn">
        Button
      </button>

      <div className="mt-4 3xl:mt-8 4xl:mt-10">
        <CodeCallout classes={BTN_CSS_DEFINITION} />
      </div>
    </div>
  );
}
