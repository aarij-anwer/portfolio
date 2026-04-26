import Image from 'next/image';
import { SymbolIcon } from '@/components/icons';
import { HomeCtas } from '@/components/home-ctas';
import { RichText } from '@/components/rich-text';
import { SiteShell } from '@/components/site-shell';
import { PageContainer, PageSection, SurfaceCard } from '@/components/ui';
import { homeContent } from '@/data/site';
import { getResumeFromTex } from '@/lib/resume';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const resumeData = await getResumeFromTex();
  const titleParts = homeContent.title.split(homeContent.accent);

  return (
    <SiteShell>
      <PageContainer className="space-y-24 md:space-y-32">
        <PageSection className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="max-w-2xl flex-1 space-y-6">
            <h1 className="text-5xl font-bold tracking-[-0.045em] text-on-surface md:text-6xl">
              {titleParts[0]}
              <span className="text-primary">{homeContent.accent}</span>
              {titleParts[1]}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-on-surface-variant">
              {homeContent.description}
            </p>
            <HomeCtas />
          </div>

          <div className="group relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-surface-container-high md:h-80 md:w-80">
              <Image
                src={homeContent.portrait.src}
                alt={homeContent.portrait.alt}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>
        </PageSection>

        <PageSection className="space-y-12">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-on-surface md:text-4xl">
            Core Competencies
          </h2>
          <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumeData.competencies.map((item) => (
              <SurfaceCard key={item.label} className="h-full min-h-72 p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-highest text-outline">
                  <SymbolIcon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-on-surface">
                  {item.label}
                </h3>
                <p className="text-base leading-7 text-on-surface-variant">
                  <RichText text={item.value} />
                </p>
              </SurfaceCard>
            ))}
          </div>
        </PageSection>
      </PageContainer>
    </SiteShell>
  );
}
