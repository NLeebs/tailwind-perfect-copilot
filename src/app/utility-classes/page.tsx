import SlideLayout from "@/components/SlideLayout";
import CardBuilder from "@/components/CardBuilder";
import ColorPalette from "@/components/ColorPalette";
import FlexGridComparison from "@/components/FlexGridComparison";
import Link from "next/link";

export default function UtilityClasses() {
  return (
    <SlideLayout number="03" title="Style with Utility">
      {/* Demo 1 — Card Builder */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Building a Card with Utilitiy Classes
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          One utility at a time.{" "}
          <Link
            href="https://tailwindcss.com/docs/styling-with-utility-classes"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
            target="_blank"
          >
            Utility Class Docs.
          </Link>
        </p>
        <div className="mt-8 3xl:mt-12">
          <CardBuilder />
        </div>
      </section>

      {/* Spacer between sections */}
      <div className="mt-16 3xl:mt-24" />

      {/* Demo 2 — Tailwind Colors */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Built-in Colors
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          Using Tailwind&apos;s default color palette.{" "}
          <Link
            href="https://tailwindcss.com/docs/colors"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
            target="_blank"
          >
            Tailwind Color Docs.
          </Link>
        </p>
        <div className="mt-8 3xl:mt-12">
          <ColorPalette />
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* Demo 3 — Flex vs. Grid */}
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
