import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon } from '@/components/icons';
import ProjectActionButtons from '@/components/ProjectActionButtons';
import ProjectGallery from '@/components/ProjectGallery';
import SiteShell from '@/components/SiteShell';
import { PageContainer, Tag } from '@/components/ui';
import type { ProjectDetail } from '@/lib/types';

interface ProjectDetailPageProps {
  project: ProjectDetail;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <SiteShell>
      <PageContainer className="space-y-14 md:space-y-20">
        <header className="max-w-4xl space-y-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-fixed-dim"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {project.eyebrow}
            </p>

            <h1 className="text-4xl font-bold tracking-[-0.05em] text-on-surface md:text-6xl">
              {project.title}
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-on-surface-variant">
              {project.summary}
            </p>
          </div>
        </header>

        <ProjectGallery images={[project.heroImage, ...project.gallery]} />

        <main className="grid gap-14 border-t border-outline-variant pt-12 md:grid-cols-[minmax(0,1fr)_320px] md:gap-16">
          <article className="max-w-3xl space-y-12">
            <section className="space-y-5">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-on-surface">
                Overview
              </h2>

              <div className="space-y-5 text-base leading-8 text-on-surface-variant">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-on-surface">
                What I built
              </h2>

              <div className="space-y-6">
                {project.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="border-l border-outline-variant pl-5"
                  >
                    <h3 className="text-lg font-semibold text-on-surface">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-base leading-7 text-on-surface-variant">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-on-surface">
                Results
              </h2>

              <ul className="space-y-4 text-base leading-7 text-on-surface-variant">
                {project.metrics.map((metric) => (
                  <li key={metric} className="flex gap-3">
                    <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="space-y-10 md:sticky md:top-24 md:self-start">
            <section className="space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                Tech Stack
              </h2>

              <div className="space-y-6">
                {project.techStack.map((group) => (
                  <div key={group.label} className="space-y-3">
                    <h3 className="text-base font-semibold text-on-surface">
                      {group.label}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <ProjectActionButtons
              actions={project.actions}
              projectSlug={project.slug}
            />
          </aside>
        </main>
      </PageContainer>
    </SiteShell>
  );
}
