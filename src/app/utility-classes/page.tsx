import SlideLayout from "@/components/SlideLayout";
import CardBuilder from "@/components/CardBuilder";
import FlexGridComparison from "@/components/FlexGridComparison";

export default function UtilityClasses() {
  return (
    <SlideLayout number="03" title="Core Utility Classes">
      {/* Demo 1 — Card Builder */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Building a Card with Utilities
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          One utility at a time.
        </p>
        <div className="mt-8 3xl:mt-12">
          <CardBuilder />
        </div>
      </section>

      {/* Spacer between sections */}
      <div className="mt-16 3xl:mt-24" />

      {/* Demo 2 — Flex vs. Grid */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Flex vs. Grid
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          Same children, different layout model.
        </p>
        <div className="mt-8 3xl:mt-12">
          <FlexGridComparison />
        </div>
      </section>
    </SlideLayout>
  );
}
