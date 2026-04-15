import Link from "next/link";

interface NavCardProps {
  number: string;
  title: string;
  tagline: string;
  href: string;
}

export default function NavCard({ number, title, tagline, href }: Readonly<NavCardProps>) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-50 hover:shadow-lg hover:shadow-cyan-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 3xl:p-8 4xl:p-10"
    >
      <span className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 3xl:text-sm 3xl:px-4">
        {number}
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-900 transition-colors duration-200 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300 3xl:text-xl 4xl:text-2xl">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 3xl:text-base 4xl:text-lg">{tagline}</p>
      </div>
      <span className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cyan-600 dark:text-slate-600 dark:group-hover:text-cyan-400">
        →
      </span>
    </Link>
  );
}
