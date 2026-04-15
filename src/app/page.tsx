import NavCard from "@/components/NavCard";

const slides = [
  {
    number: "01",
    title: "The History of CSS",
    tagline: "From inline styles to the cascade — how we got here.",
    href: "/history-of-css",
  },
  {
    number: "02",
    title: "What is Tailwind?",
    tagline: "Utility-first CSS and why it changes everything.",
    href: "/what-is-tailwind",
  },
  {
    number: "03",
    title: "Tailwind Utility Classes",
    tagline: "The building blocks — spacing, color, typography, and more.",
    href: "/utility-classes",
  },
  {
    number: "04",
    title: "Responsiveness & Dark Mode",
    tagline: "Breakpoints and dark mode built right into your class names.",
    href: "/responsiveness-dark-mode",
  },
  {
    number: "05",
    title: "Customizing Tailwind",
    tagline: "Make Tailwind yours with a custom design system.",
    href: "/customizing-tailwind",
  },
  {
    number: "06",
    title: "Conditional Styling",
    tagline: "Dynamic styles with variants, groups, and peers.",
    href: "/conditional-styling",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-8 py-20 3xl:max-w-7xl 3xl:px-16 3xl:py-28 4xl:max-w-600 4xl:py-36">
        <header className="mb-20 3xl:mb-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-500 3xl:w-12" />
            <span className="text-xs font-semibold tracking-widest text-cyan-600 uppercase dark:text-cyan-400 3xl:text-sm">
              A Talk by Nathan Lieberman
            </span>
          </div>
          <h1 className="mb-4 text-6xl leading-tight 3xl:text-8xl 4xl:text-[10rem]">
            Tailwind CSS
          </h1>
          <p className="max-w-lg text-xl leading-relaxed text-slate-500 dark:text-slate-400 3xl:text-2xl 3xl:max-w-2xl 4xl:text-3xl">
            The Perfect Wingman for Frontend Projects
          </p>
        </header>

        <section>
          <p className="mb-8 text-sm font-medium tracking-widest text-slate-400 uppercase dark:text-slate-500 3xl:text-base 3xl:mb-10">
            Topics
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-6 4xl:gap-8">
            {slides.map((slide) => (
              <NavCard key={slide.href} {...slide} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
