"use client";

import posthog from "posthog-js";
import { ButtonLink } from "@/components/ui";

export function HomeCtas() {
  return (
    <div className="flex flex-wrap gap-4 pt-4">
      <ButtonLink
        href="/projects"
        onClick={() => posthog.capture("home_cta_clicked", { label: "View Projects", href: "/projects" })}
      >
        View Projects
      </ButtonLink>
      <ButtonLink
        href="/resume"
        variant="secondary"
        onClick={() => posthog.capture("home_cta_clicked", { label: "My Resume", href: "/resume" })}
      >
        My Resume
      </ButtonLink>
    </div>
  );
}
