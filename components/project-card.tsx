import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { Tag } from "@/components/ui";
import type { ProjectSummary } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  const content = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          className="object-cover grayscale opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="space-y-4 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-on-surface">{project.title}</h2>
          {project.href ? (
            <span className="text-on-surface-variant transition-colors group-hover:text-primary">
              <ArrowUpRightIcon className="h-5 w-5" />
            </span>
          ) : null}
        </div>
        <p className="line-clamp-3 text-sm leading-7 text-on-surface-variant md:text-base">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </>
  );

  if (project.href) {
    return (
      <Link
        href={project.href}
        className="group block overflow-hidden rounded-2xl border border-surface-variant bg-surface-container-low transition-all duration-300 hover:border-outline"
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "group block cursor-default overflow-hidden rounded-2xl border border-surface-variant bg-surface-container-low transition-all duration-300 hover:border-outline",
      )}
    >
      {content}
    </article>
  );
}
