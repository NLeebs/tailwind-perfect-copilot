import CodeCallout from "@/components/CodeCallout";

const FLEX_CLASSES = "flex flex-row gap-4";
const GRID_CLASSES = "grid grid-cols-3 gap-4";

interface BoxConfig {
  num: string;
  className: string;
}

const BOXES: BoxConfig[] = [
  {
    num: "1",
    className:
      "flex items-center justify-center size-16 3xl:size-24 rounded-xl text-xs font-semibold 3xl:text-base bg-violet-200 dark:bg-violet-800 text-violet-900 dark:text-violet-100",
  },
  {
    num: "2",
    className:
      "flex items-center justify-center size-16 3xl:size-24 rounded-xl text-xs font-semibold 3xl:text-base bg-sky-200 dark:bg-sky-800 text-sky-900 dark:text-sky-100",
  },
  {
    num: "3",
    className:
      "flex items-center justify-center size-16 3xl:size-24 rounded-xl text-xs font-semibold 3xl:text-base bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100",
  },
];

export default function FlexGridComparison() {
  return (
    <div className="grid grid-cols-2 gap-6 3xl:gap-12">
      {/* Left column — Flex */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          FLEX
        </p>
        <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl 3xl:mt-4 3xl:p-6">
          <div className={FLEX_CLASSES}>
            {BOXES.map((box) => (
              <div key={box.num} className={box.className}>
                {box.num}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <CodeCallout classes={FLEX_CLASSES} />
        </div>
      </div>

      {/* Right column — Grid */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          GRID
        </p>
        <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl 3xl:mt-4 3xl:p-6">
          <div className={GRID_CLASSES}>
            {BOXES.map((box) => (
              <div key={box.num} className={box.className}>
                {box.num}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <CodeCallout classes={GRID_CLASSES} />
        </div>
      </div>
    </div>
  );
}
