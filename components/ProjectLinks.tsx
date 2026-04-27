import Link from "next/link";
import { projects } from "@/data/site";
import { ProjectLinksProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectLinks({ currentSlug, className }: ProjectLinksProps) {
  const otherProjects = projects.filter((p) => p.slug !== currentSlug);

  return (
    <section className={cn("space-y-8", className)}>
      <div className="border-t border-outline-variant pt-12">
        <h2 className="mb-8 text-2xl font-semibold tracking-[-0.02em] text-on-surface">
          Explore Other Projects
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {otherProjects.map((project) => (
            <Link
              key={project.slug}
              href={project.href || `/projects/${project.slug}`}
              className="group rounded-xl border border-outline-variant bg-surface-container-low p-6 transition-all hover:border-primary hover:bg-surface-container-high"
            >
              <h3 className="font-semibold text-on-surface group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
