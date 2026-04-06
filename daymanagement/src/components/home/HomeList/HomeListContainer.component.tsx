import { cn } from "@/lib/utils";
import React from "react";

function HomeListContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[calc(100vh-24px)] p-1 mx-auto rounded-2xl bg-secondary w-full"
      )}
    >
      {children}
    </div>
  );
}

export default HomeListContainer;
