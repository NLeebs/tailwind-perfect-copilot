import Link from "next/link";

interface SlideLayoutProps {
  number: string;
  title: string;
  children?: React.ReactNode;
}

export default function SlideLayout({
  number,
  title,
  children,
}: SlideLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <nav className="flex items-center justify-between border-b border-slate-200 px-8 py-4 dark:border-slate-800 3xl:px-16 3xl:py-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-500 transition-colors duration-200 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 3xl:text-base"
        >
          ← Back to Overview
        </Link>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 3xl:text-sm 3xl:px-4">
          {number}
        </span>
      </nav>

      <main className="mx-auto max-w-5xl px-8 py-20 3xl:max-w-7xl 3xl:px-16 3xl:py-28 4xl:max-w-600">
        <h1 className="mb-16 text-5xl 3xl:text-7xl 4xl:text-8xl">
          {title}
        </h1>
        {children ?? (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 py-32 text-slate-400 dark:border-slate-700 dark:text-slate-500">
            Content coming soon
          </div>
        )}
      </main>
    </div>
  );
}
