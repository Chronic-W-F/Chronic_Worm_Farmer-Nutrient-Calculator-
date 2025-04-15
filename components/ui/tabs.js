import { useState } from "react";

export function Tabs({ defaultValue, value, onValueChange, children }) {
  return <div>{children}</div>;
}

export function TabsList({ children }) {
  return (
    <div className="flex space-x-2 mb-2">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, ...props }) {
  return (
    <button
      onClick={() => props.onClick?.(value)}
      className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
