import CodeCallout from "@/components/CodeCallout";

interface SwatchCell {
  label: string;
  bg: string;
  text: string;
}

interface SwatchRow {
  name: string;
  shades: SwatchCell[];
}

const PALETTE: SwatchRow[] = [
  {
    name: "slate",
    shades: [
      { label: "100", bg: "bg-slate-100", text: "text-slate-800" },
      { label: "300", bg: "bg-slate-300", text: "text-slate-800" },
      { label: "500", bg: "bg-slate-500", text: "text-white" },
      { label: "700", bg: "bg-slate-700", text: "text-white" },
      { label: "900", bg: "bg-slate-900", text: "text-white" },
    ],
  },
  {
    name: "red",
    shades: [
      { label: "100", bg: "bg-red-100", text: "text-slate-800" },
      { label: "300", bg: "bg-red-300", text: "text-slate-800" },
      { label: "500", bg: "bg-red-500", text: "text-white" },
      { label: "700", bg: "bg-red-700", text: "text-white" },
      { label: "900", bg: "bg-red-900", text: "text-white" },
    ],
  },
  {
    name: "orange",
    shades: [
      { label: "100", bg: "bg-orange-100", text: "text-slate-800" },
      { label: "300", bg: "bg-orange-300", text: "text-slate-800" },
      { label: "500", bg: "bg-orange-500", text: "text-white" },
      { label: "700", bg: "bg-orange-700", text: "text-white" },
      { label: "900", bg: "bg-orange-900", text: "text-white" },
    ],
  },
  {
    name: "amber",
    shades: [
      { label: "100", bg: "bg-amber-100", text: "text-slate-800" },
      { label: "300", bg: "bg-amber-300", text: "text-slate-800" },
      { label: "500", bg: "bg-amber-500", text: "text-white" },
      { label: "700", bg: "bg-amber-700", text: "text-white" },
      { label: "900", bg: "bg-amber-900", text: "text-white" },
    ],
  },
  {
    name: "yellow",
    shades: [
      { label: "100", bg: "bg-yellow-100", text: "text-slate-800" },
      { label: "300", bg: "bg-yellow-300", text: "text-slate-800" },
      { label: "500", bg: "bg-yellow-500", text: "text-white" },
      { label: "700", bg: "bg-yellow-700", text: "text-white" },
      { label: "900", bg: "bg-yellow-900", text: "text-white" },
    ],
  },
  {
    name: "green",
    shades: [
      { label: "100", bg: "bg-green-100", text: "text-slate-800" },
      { label: "300", bg: "bg-green-300", text: "text-slate-800" },
      { label: "500", bg: "bg-green-500", text: "text-white" },
      { label: "700", bg: "bg-green-700", text: "text-white" },
      { label: "900", bg: "bg-green-900", text: "text-white" },
    ],
  },
  {
    name: "teal",
    shades: [
      { label: "100", bg: "bg-teal-100", text: "text-slate-800" },
      { label: "300", bg: "bg-teal-300", text: "text-slate-800" },
      { label: "500", bg: "bg-teal-500", text: "text-white" },
      { label: "700", bg: "bg-teal-700", text: "text-white" },
      { label: "900", bg: "bg-teal-900", text: "text-white" },
    ],
  },
  {
    name: "blue",
    shades: [
      { label: "100", bg: "bg-blue-100", text: "text-slate-800" },
      { label: "300", bg: "bg-blue-300", text: "text-slate-800" },
      { label: "500", bg: "bg-blue-500", text: "text-white" },
      { label: "700", bg: "bg-blue-700", text: "text-white" },
      { label: "900", bg: "bg-blue-900", text: "text-white" },
    ],
  },
  {
    name: "violet",
    shades: [
      { label: "100", bg: "bg-violet-100", text: "text-slate-800" },
      { label: "300", bg: "bg-violet-300", text: "text-slate-800" },
      { label: "500", bg: "bg-violet-500", text: "text-white" },
      { label: "700", bg: "bg-violet-700", text: "text-white" },
      { label: "900", bg: "bg-violet-900", text: "text-white" },
    ],
  },
  {
    name: "pink",
    shades: [
      { label: "100", bg: "bg-pink-100", text: "text-slate-800" },
      { label: "300", bg: "bg-pink-300", text: "text-slate-800" },
      { label: "500", bg: "bg-pink-500", text: "text-white" },
      { label: "700", bg: "bg-pink-700", text: "text-white" },
      { label: "900", bg: "bg-pink-900", text: "text-white" },
    ],
  },
];

const SAMPLE_CLASS = "bg-blue-500 text-white";

export default function ColorPalette() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 3xl:p-6 mt-8 3xl:mt-12">
      <div className="space-y-3 3xl:space-y-5">
        {PALETTE.map((row) => (
          <div key={row.name}>
            <div className="flex gap-1 3xl:gap-2">
              {row.shades.map((cell) => (
                <div
                  key={cell.label}
                  className={`${cell.bg} h-12 w-16 3xl:h-16 3xl:w-24 rounded flex items-center justify-center`}
                >
                  <span className={`${cell.text} text-[10px] 3xl:text-xs font-mono font-semibold`}>
                    {cell.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400 3xl:text-sm">
              {row.name}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 3xl:mt-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
          Class Format
        </p>
        <CodeCallout classes={SAMPLE_CLASS} />
      </div>
    </div>
  );
}
