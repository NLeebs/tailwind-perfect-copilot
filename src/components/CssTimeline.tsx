"use client";

import { useRef, useState, useEffect } from "react";

type MilestoneItem = { text: string; links: Record<string, string> };

interface Era {
  color: string;
  textColor: string;
  darkColor: string;
  title: string;
  years: string;
  desc: string;
  milestones: Array<string | MilestoneItem>;
  tech: string[];
  patterns: string[];
  issues: string[];
}

const eras: Era[] = [
  {
    color: "#9FE1CB",
    textColor: "#085041",
    darkColor: "#9FE1CB",
    title: "The birth of CSS",
    years: "1994 – 1998",
    desc: "Håkon Wium Lie proposed CSS in 1994 at CERN. Before it existed, HTML carried all visual responsibility — font tags, bgcolor attributes, and inline presentation ruled. CSS1 was published as a W3C Recommendation in December 1996.",
    milestones: [
      "1994: Håkon Lie's original CSS proposal",
      "1996: CSS Level 1 becomes a W3C Recommendation",
      "1998: CSS Level 2 published, adding positioning and media types",
      "Netscape 4 and IE 4 ship partial, competing implementations",
    ],
    tech: ["CSS1", "CSS2", "HTML font tags (predecessor)"],
    patterns: [
      "Inline styles everywhere",
      "Font tags for presentation",
      "TABLE-based layout",
      "bgcolor / cellpadding as design tools",
    ],
    issues: [
      "Browsers ignored or partially implemented the spec",
      "Netscape used JSSS (a competing style standard)",
      "IE and Netscape rendered the same CSS differently",
      "No reliable box model — developers guessed",
    ],
  },
  {
    color: "#1D9E75",
    textColor: "#04342C",
    darkColor: "#4DD9A8",
    title: "The browser wars aftermath",
    years: "1999 – 2005",
    desc: "IE6 dominated the market with ~95% share but had severe CSS bugs. The Web Standards Project (WaSP) pushed browsers to implement CSS properly. CSS Zen Garden (2003) became a landmark demonstration of design-content separation.",
    milestones: [
      "2000: IE5 Mac — the best CSS implementation of its time",
      "2001: IE6 ships, then dominates for nearly a decade",
      "2003: CSS Zen Garden launched by Dave Shea",
      "2004: Firefox 1.0 — first serious standards-compliant competitor",
      "2005: WaSP pushes Microsoft toward better standards support",
    ],
    tech: ["CSS2.1 (drafts)", "IE6 conditional comments", "CSS Zen Garden"],
    patterns: [
      "Float-based layout (float + clear hacks)",
      "clearfix hack",
      "Negative margins for columns",
      "IE conditional comments for workarounds",
      "Box model hacks (* html, !important)",
    ],
    issues: [
      "IE box model bug (width included padding/border)",
      "Double-margin float bug in IE6",
      "hasLayout — mysterious IE rendering trigger",
      "PNG transparency didn't work in IE6",
    ],
  },
  {
    color: "#7F77DD",
    textColor: "#26215C",
    darkColor: "#B2ADFF",
    title: "Standards renaissance",
    years: "2006 – 2010",
    desc: "Firefox, Safari, and Chrome rose to challenge IE's dominance. CSS2.1 reached Recommendation status. jQuery abstracted away browser inconsistencies. CSS3 modules began drafting, bringing border-radius, gradients, and transforms.",
    milestones: [
      "2006: jQuery 1.0 ships — abstracts cross-browser CSS/DOM",
      "2008: Chrome 1.0 launches with V8 and fast CSS engine",
      "2009: CSS3 modules actively drafted (animations, transforms, flex)",
      "2010: IE9 previews with proper CSS2.1 support",
      "2011: CSS2.1 becomes a full W3C Recommendation",
    ],
    tech: [
      "jQuery",
      "Blueprint CSS",
      "YUI Grids",
      "960 Grid System",
      "CSS resets (Eric Meyer Reset, normalize.css)",
    ],
    patterns: [
      "12-column fixed grids (960px wide)",
      "CSS reset stylesheets",
      "Rounded corners via images or faux columns",
      "Sliding doors technique for flexible buttons",
      "Sprite sheets for icons",
    ],
    issues: [
      "Vendor prefixes proliferating (-webkit-, -moz-, -ms-)",
      "No native CSS variables or nesting",
      "Pixel-perfect cross-browser styling required massive hacks",
      "Fixed 960px width — no accommodation for mobile yet",
    ],
  },
  {
    color: "#AFA9EC",
    textColor: "#26215C",
    darkColor: "#C8C4F7",
    title: "The responsive revolution",
    years: "2010 – 2015",
    desc: "Ethan Marcotte coined 'Responsive Web Design' in 2010. Mobile traffic exploded with the iPhone (2007) and Android. CSS3 features landed in modern browsers, and preprocessors like Sass and LESS changed how CSS was authored.",
    milestones: [
      "2010: Ethan Marcotte's 'Responsive Web Design' article in A List Apart",
      "2011: Bootstrap 2 ships — the most widely used CSS framework ever",
      "2012: CSS3 Flexible Box Layout (Flexbox) reaches candidate recommendation",
      {
        text: "2013: Flat design replaces skeuomorphism across the industry",
        links: {
          skeuomorphism:
            "https://www.figma.com/resource-library/what-is-skeuomorphism/",
        },
      },
      "2014: Google announces Material Design",
    ],
    tech: [
      "Bootstrap",
      "Foundation",
      "Sass / SCSS",
      "LESS",
      "Modernizr",
      "Compass",
    ],
    patterns: [
      "Mobile-first design",
      "Fluid grids with percentage widths",
      "Media queries at breakpoints",
      "BEM (Block Element Modifier) naming convention",
      "SMACSS, OOCSS methodologies",
      "Sass partials and mixins for reuse",
    ],
    issues: [
      "Bootstrap overuse → every site looked the same",
      "Vendor prefix sprawl required Autoprefixer or Compass to manage",
      "No native variables — Sass variables were a workaround",
      "CSS specificity wars in large codebases",
      "Images not responsive by default",
    ],
  },
  {
    color: "#378ADD",
    textColor: "#042C53",
    darkColor: "#74BAFF",
    title: "The modern CSS platform",
    years: "2015 – 2020",
    desc: "CSS Custom Properties (variables) landed natively. CSS Grid arrived in 2017, finally solving 2D layout. PostCSS and CSS-in-JS emerged. Component-driven architecture via React influenced how CSS was organized.",
    milestones: [
      "2015: CSS Custom Properties (variables) ship in Chrome 49",
      "2017: CSS Grid Layout ships in all major browsers simultaneously",
      "2018: CSS-in-JS (styled-components, Emotion) goes mainstream",
      "2019: Tailwind CSS 1.0 — utility-first approach gains traction",
      "2020: Subgrid, logical properties, and :is() / :where() land",
    ],
    tech: [
      "CSS Grid",
      "CSS Custom Properties",
      "PostCSS",
      "styled-components",
      "Emotion",
      "Tailwind CSS",
      "CSS Modules",
    ],
    patterns: [
      "Utility-first CSS (Tailwind)",
      "CSS-in-JS with component scoping",
      "Design tokens",
      "CSS Grid for 2D layout + Flexbox for 1D",
      "Atomic CSS",
      "CSS Modules for scoping",
    ],
    issues: [
      "CSS-in-JS adds runtime cost (parsing styles in JS)",
      "Tailwind class noise in HTML markup",
      "Still no native nesting",
      "Cascade and specificity hard to manage at scale",
      "No native container queries",
    ],
  },
  {
    color: "#639922",
    textColor: "#173404",
    darkColor: "#A2D93A",
    title: "CSS today and beyond",
    years: "2021 – present",
    desc: "Native CSS is closing the gap on preprocessors. Container queries, cascade layers, the :has() selector, logical properties, and CSS nesting shipped. The platform is becoming powerful enough that many developers are reducing tooling.",
    milestones: [
      "2022: Container Queries ship — components can respond to their own width",
      "2022: Cascade Layers (@layer) allow explicit specificity control",
      "2023: :has() — the 'parent selector' lands in all major browsers",
      "2023: CSS Nesting ships natively",
      "2024: @starting-style and discrete animations expand CSS animation power",
      "2025: Anchor positioning, scroll-driven animations widely supported",
    ],
    tech: [
      "CSS Nesting",
      "@layer",
      "Container Queries",
      ":has()",
      "Anchor Positioning",
      "Scroll-driven Animations",
      "@starting-style",
      "color-mix()",
      "Subgrid",
    ],
    patterns: [
      "Design systems with CSS custom properties as tokens",
      "Progressive enhancement with @supports",
      "Intrinsic web design (min/max/clamp)",
      "Reduced reliance on preprocessors",
      "Single-file components with scoped native CSS",
    ],
    issues: [
      "Baseline compatibility still a concern for cutting-edge features",
      "Container query performance at large scale still being studied",
      "Migration cost from entrenched preprocessor/utility workflows",
      "CSS is now complex enough that the learning curve is steeper for newcomers",
    ],
  },
];

function renderMilestoneText(
  item: string | MilestoneItem,
  textColor: string,
  darkColor: string,
): React.ReactNode {
  if (typeof item === "string") return item;
  const { text, links } = item;
  const entries = Object.entries(links);
  if (entries.length === 0) return text;
  const pattern = entries
    .map(([phrase]) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g"));
  return (
    <>
      {parts.map((part, i) => {
        const url = links[part];
        if (url) {
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={
                { "--c": textColor, "--cd": darkColor } as React.CSSProperties
              }
              className="[color:var(--c)] dark:[color:var(--cd)] underline underline-offset-2 hover:opacity-75 transition-opacity font-medium"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 mt-1 size-4 3xl:size-7 4xl:size-9 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface TimelineEntryProps {
  era: Era;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineEntry({
  era,
  index,
  isExpanded,
  onToggle,
}: TimelineEntryProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);
  const panelId = `era-panel-${index}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`relative pl-14 pb-10 last:pb-0 3xl:pl-20 3xl:pb-16 4xl:pl-24 4xl:pb-20 ${inView ? "animate-reveal-up" : "opacity-0"}`}
    >
      <div
        style={{ backgroundColor: era.color }}
        className="absolute left-[1.125rem] top-2 size-9 rounded-full -translate-x-1/2 ring-4 ring-slate-50 dark:ring-slate-950 3xl:left-7 3xl:size-14 3xl:ring-8 3xl:top-3 4xl:left-8 4xl:size-16 4xl:ring-[10px]"
      />

      <div
        style={{ borderColor: isExpanded ? era.color : undefined }}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300"
      >
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          className="w-full text-left p-6 flex items-start justify-between gap-4 3xl:p-10 4xl:p-14"
        >
          <div className="min-w-0">
            <span className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase 3xl:text-base 4xl:text-xl">
              {era.years}
            </span>
            <div
              role="heading"
              aria-level={2}
              className="mt-1 text-xl font-semibold text-slate-900 dark:text-white 3xl:text-4xl 3xl:mt-2 4xl:text-5xl 4xl:mt-3"
            >
              {era.title}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-3 3xl:leading-relaxed 4xl:text-2xl 4xl:mt-4">
              {era.desc}
            </p>
          </div>
          <ChevronIcon expanded={isExpanded} />
        </button>

        <div
          id={panelId}
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="px-6 pb-6 pt-0 space-y-5 border-t border-slate-100 dark:border-slate-800 3xl:px-10 3xl:pb-10 3xl:space-y-8 4xl:px-14 4xl:pb-14 4xl:space-y-10">
              <div className="pt-5 3xl:pt-8 4xl:pt-10">
                <h3 className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3 3xl:text-base 3xl:mb-4 4xl:text-xl 4xl:mb-5">
                  Key Milestones
                </h3>
                <ul className="space-y-2 3xl:space-y-3 4xl:space-y-4">
                  {era.milestones.map((m) => {
                    const key = typeof m === "string" ? m : m.text;
                    return (
                      <li
                        key={key}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg 3xl:gap-3 4xl:text-xl 4xl:gap-4"
                      >
                        <span
                          style={{ backgroundColor: era.color }}
                          className="mt-[0.4rem] size-1.5 rounded-full shrink-0 3xl:size-2.5 3xl:mt-2 4xl:size-3 4xl:mt-2.5"
                        />
                        {renderMilestoneText(m, era.textColor, era.darkColor)}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3 3xl:text-base 3xl:mb-4 4xl:text-xl 4xl:mb-5">
                  Technologies & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2 3xl:gap-3 4xl:gap-4">
                  {era.tech.map((t) => (
                    <span
                      key={t}
                      style={
                        {
                          "--c": era.textColor,
                          "--cd": era.darkColor,
                          backgroundColor: `${era.color}22`,
                          borderColor: `${era.color}66`,
                        } as React.CSSProperties
                      }
                      className="px-3 py-1 rounded-full text-xs font-medium border [color:var(--c)] dark:[color:var(--cd)] 3xl:text-base 3xl:px-5 3xl:py-2 4xl:text-lg 4xl:px-6 4xl:py-2.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3 3xl:text-base 3xl:mb-4 4xl:text-xl 4xl:mb-5">
                  Patterns & Strategies
                </h3>
                <div className="flex flex-wrap gap-2 3xl:gap-3 4xl:gap-4">
                  {era.patterns.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 3xl:text-base 3xl:px-5 3xl:py-2 4xl:text-lg 4xl:px-6 4xl:py-2.5"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3 3xl:text-base 3xl:mb-4 4xl:text-xl 4xl:mb-5">
                  Biggest Issues
                </h3>
                <ul className="space-y-2 3xl:space-y-3 4xl:space-y-4">
                  {era.issues.map((issue) => (
                    <li
                      key={issue}
                      className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-500 3xl:text-lg 3xl:gap-3 4xl:text-xl 4xl:gap-4"
                    >
                      <span className="mt-[0.4rem] size-1.5 rounded-full shrink-0 bg-slate-300 dark:bg-slate-600 3xl:size-2.5 3xl:mt-2 4xl:size-3 4xl:mt-2.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CssTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="relative">
      <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 3xl:left-7 3xl:w-0.5 4xl:left-8 4xl:w-[3px]" />

      <ol className="relative">
        {eras.map((era, i) => (
          <TimelineEntry
            key={era.title}
            era={era}
            index={i}
            isExpanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
      </ol>
    </section>
  );
}
