import { createContext, useContext, useState } from "react";

const TabsContext = createContext(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
}

export default function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div data-slot="tabs" className="flex flex-col gap-2">
        {children}
      </div>
    </TabsContext.Provider>
  );
}
