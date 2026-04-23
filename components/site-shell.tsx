import type { ReactNode } from "react";
import { TopNav } from "@/components/top-nav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="pb-24 pt-32">{children}</main>
    </>
  );
}
