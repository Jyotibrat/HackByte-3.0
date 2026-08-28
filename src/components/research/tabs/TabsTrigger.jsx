import { useRef } from "react";
import { useTabsContext } from "./Tabs";

export default function TabsTrigger({ value, children, disabled = false }) {
  const { active, setActive } = useTabsContext();
  const isActive = active === value;
  const ref = useRef(null);

  function handleKeyDown(e) {
    const list = ref.current?.closest('[role="tablist"]');
    if (!list) return;
    const triggers = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])'));
    const idx = triggers.indexOf(ref.current);

    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % triggers.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + triggers.length) % triggers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = triggers.length - 1;
    else return;

    e.preventDefault();
    triggers[next]?.focus();
    triggers[next]?.click();
  }

  return (
    <button
      ref={ref}
      role="tab"
      data-slot="tabs-trigger"
      data-value={value}
      data-state={isActive ? "active" : "inactive"}
      aria-selected={isActive}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => !disabled && setActive(value)}
      onKeyDown={handleKeyDown}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-3 py-1.5 font-medium whitespace-nowrap transition-[background-color] cursor-pointer",
        isActive
          ? "bg-zinc-200 dark:bg-zinc-700"
          : "hover:bg-zinc-300 dark:hover:bg-zinc-600",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        disabled ? "pointer-events-none opacity-50" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
