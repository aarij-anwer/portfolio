import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon, SymbolIcon } from '@/components/icons';
import { ProjectActionButtons } from '@/components/ProjectActionButtons';
import { ProjectLinks } from '@/components/ProjectLinks';
import { SiteShell } from '@/components/SiteShell';
import { PageContainer, SurfaceCard, Tag } from '@/components/ui';
import { esgProject } from '@/data/site';

export default function GetBetterTogetherPage() {
  const project = esgProject;

  return (
    <SiteShell>
      <PageContainer className="space-y-16 md:space-y-24">
        <header className="space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-fixed-dim"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {project.eyebrow}
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-on-surface md:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-on-surface-variant">
              {project.summary}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low md:col-span-3 md:aspect-[21/9]">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              fill
              className="object-cover transition-all duration-700"
              sizes="100vw"
            />
          </div>
          {project.gallery.map((image) => (
            <div
              key={image.src}
              className="relative aspect-video overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-8 md:col-span-8">
            <SurfaceCard className="p-8">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-on-surface">
                <SymbolIcon
                  name="architecture"
                  className="h-6 w-6 text-primary"
                />
                Technical Overview
              </h2>
              <div className="space-y-6 text-base leading-7 text-on-surface-variant">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </SurfaceCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.features.map((feature) => (
                <SurfaceCard
                  key={feature.title}
                  className="bg-surface-container-low p-6"
                >
                  <SymbolIcon
                    name={feature.icon}
                    className="mb-4 h-8 w-8 text-primary"
                  />
                  <h3 className="mb-2 text-xl font-semibold tracking-[-0.02em] text-on-surface">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-7 text-on-surface-variant">
                    {feature.description}
                  </p>
                </SurfaceCard>
              ))}
            </div>

            <SurfaceCard className="p-8">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-on-surface">
                <SymbolIcon
                  name="monitoring"
                  className="h-6 w-6 text-primary"
                />
                Performance &amp; Impact
              </h2>
              <ul className="space-y-4 text-base leading-7 text-on-surface-variant">
                {project.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-primary" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </div>

          <aside className="space-y-8 md:col-span-4">
            <SurfaceCard className="p-8 md:sticky md:top-24">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-on-surface">
                <SymbolIcon name="terminal" className="h-6 w-6 text-primary" />
                Tech Stack
              </h2>
              <div className="space-y-6">
                {project.techStack.map((group) => (
                  <div key={group.label}>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
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
              <ProjectActionButtons
                actions={project.actions}
                projectSlug={project.slug}
              />
            </SurfaceCard>
          </aside>
        </section>
        <ProjectLinks currentSlug={project.slug} />
      </PageContainer>
    </SiteShell>
  );
}
