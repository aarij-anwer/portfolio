"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteMeta } from "@/data/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/projects") {
    return pathname.startsWith("/projects");
  }
  return pathname === href;
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Link className="text-sm font-bold tracking-tight text-on-surface md:text-base" href="/">
          {siteMeta.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteMeta.navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b-2 pb-1 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface",
                isActive(pathname, item.href) ? "border-primary-container text-primary-container" : "border-transparent",
              )}
              onClick={() => posthog.capture("nav_link_clicked", { label: item.label, href: item.href })}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            aria-label="GitHub"
            className="rounded-md p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high hover:text-on-surface"
            href={siteMeta.socialLinks.github}
            onClick={() => posthog.capture("social_link_clicked", { platform: "github" })}
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            aria-label="LinkedIn"
            className="rounded-md p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high hover:text-on-surface"
            href={siteMeta.socialLinks.linkedin}
            onClick={() => posthog.capture("social_link_clicked", { platform: "linkedin" })}
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
