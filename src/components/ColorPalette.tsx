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
      { label: "200", bg: "bg-slate-200", text: "text-slate-800" },
      { label: "300", bg: "bg-slate-300", text: "text-slate-800" },
      { label: "400", bg: "bg-slate-400", text: "text-slate-800" },
      { label: "500", bg: "bg-slate-500", text: "text-white" },
      { label: "600", bg: "bg-slate-600", text: "text-white" },
      { label: "700", bg: "bg-slate-700", text: "text-white" },
      { label: "800", bg: "bg-slate-800", text: "text-white" },
      { label: "900", bg: "bg-slate-900", text: "text-white" },
    ],
  },
  {
    name: "teal",
    shades: [
      { label: "100", bg: "bg-teal-100", text: "text-slate-800" },
      { label: "200", bg: "bg-teal-200", text: "text-slate-800" },
      { label: "300", bg: "bg-teal-300", text: "text-slate-800" },
      { label: "400", bg: "bg-teal-400", text: "text-slate-800" },
      { label: "500", bg: "bg-teal-500", text: "text-white" },
      { label: "600", bg: "bg-teal-600", text: "text-white" },
      { label: "700", bg: "bg-teal-700", text: "text-white" },
      { label: "800", bg: "bg-teal-800", text: "text-white" },
      { label: "900", bg: "bg-teal-900", text: "text-white" },
    ],
  },
  {
    name: "pink",
    shades: [
      { label: "100", bg: "bg-pink-100", text: "text-slate-800" },
      { label: "200", bg: "bg-pink-200", text: "text-slate-800" },
      { label: "300", bg: "bg-pink-300", text: "text-slate-800" },
      { label: "400", bg: "bg-pink-400", text: "text-slate-800" },
      { label: "500", bg: "bg-pink-500", text: "text-white" },
      { label: "600", bg: "bg-pink-600", text: "text-white" },
      { label: "700", bg: "bg-pink-700", text: "text-white" },
      { label: "800", bg: "bg-pink-800", text: "text-white" },
      { label: "900", bg: "bg-pink-900", text: "text-white" },
    ],
  },
];

const SAMPLE_CLASS = "bg-slate-500 text-white border-teal-700";

export default function ColorPalette() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 3xl:p-6 mt-8 3xl:mt-12">
      <div className="space-y-4 3xl:space-y-6">
        {PALETTE.map((row) => (
          <div key={row.name}>
            <div className="flex justify-between gap-1 3xl:gap-2">
              {row.shades.map((cell) => (
                <div
                  key={cell.label}
                  className={`${cell.bg} h-12 w-24 3xl:h-16 3xl:w-36 rounded flex items-center justify-center`}
                >
                  <span
                    className={`${cell.text} text-[10px] 3xl:text-xs font-mono font-semibold`}
                  >
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
