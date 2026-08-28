import { useTabsContext } from "./Tabs";

export default function TabsContent({ value, children, className = "" }) {
  const { active } = useTabsContext();
  const isActive = active === value;

  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      data-value={value}
      data-state={isActive ? "active" : "inactive"}
      hidden={!isActive}
      tabIndex={0}
      className={`mt-4 focus-visible:outline-2 focus-visible:outline-offset-2 [&>*]:my-0 ${className}`}
    >
      {children}
    </div>
  );
}
