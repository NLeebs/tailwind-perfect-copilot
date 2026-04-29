interface CodeCalloutProps {
  classes: string;
}

export default function CodeCallout({ classes }: Readonly<CodeCalloutProps>) {
  return (
    <p className="inline-block font-mono text-[13px] leading-relaxed bg-slate-100 text-slate-700 border border-slate-200 rounded-lg px-3 py-1 whitespace-pre-wrap break-all dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 3xl:text-base 3xl:px-4 3xl:py-2 3xl:rounded-xl">
      {classes}
    </p>
  );
}
