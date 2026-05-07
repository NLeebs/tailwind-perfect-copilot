import CodeCallout from "@/components/CodeCallout";

const TAILWIND_BTN_CLASSES =
  "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold text-sm 3xl:text-xl px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";

export default function UtilityButton() {
  return (
    <div>
      <button type="button" className={TAILWIND_BTN_CLASSES}>
        Button
      </button>

      <div className="mt-4 3xl:mt-8 4xl:mt-10">
        <CodeCallout classes={TAILWIND_BTN_CLASSES} />
      </div>
    </div>
  );
}
