import { Link } from 'wouter';
import HomeCtas from '@/components/HomeCtas';
import { ArrowUpRightIcon, SymbolIcon } from '@/components/icons';
import RichText from '@/components/RichText';
import SiteShell from '@/components/SiteShell';
import { PageContainer, PageSection, SurfaceCard } from '@/components/ui';
import { homeContent } from '@/data/site';
import { defaultResume } from '@/lib/default-resume';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const resumeData = defaultResume;
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
            <p className="max-w-xl text-base leading-7 text-on-surface-variant">
              {homeContent.howIWork}
            </p>
            <HomeCtas />
          </div>

          <div className="group relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-surface-container-high md:h-80 md:w-80">
              <img
                src={homeContent.portrait.src}
                alt={homeContent.portrait.alt}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </PageSection>

        <PageSection className="space-y-8">
          <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-[-0.02em] text-on-surface md:text-4xl">
            <SymbolIcon
              name="bolt"
              className="h-7 w-7 text-primary md:h-8 md:w-8"
            />
            Recent Wins
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {homeContent.recentWins.map((win) => {
              const card = (
                <SurfaceCard
                  className={`flex h-full flex-col gap-4 p-7 transition-all duration-300 ${
                    win.href ? 'group-hover:-translate-y-1 group-hover:border-primary' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-4xl font-bold tracking-[-0.04em] text-primary md:text-5xl">
                      {win.stat}
                    </span>
                    {win.href ? (
                      <span className="text-on-surface-variant transition-colors group-hover:text-primary">
                        <ArrowUpRightIcon className="h-5 w-5" />
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-on-surface">
                    {win.title}
                  </h3>
                  <p className="text-sm leading-7 text-on-surface-variant">
                    {win.description}
                  </p>
                </SurfaceCard>
              );

              return win.href ? (
                <Link
                  key={win.title}
                  href={win.href}
                  className="group block h-full"
                >
                  {card}
                </Link>
              ) : (
                <div key={win.title} className="h-full">
                  {card}
                </div>
              );
            })}
          </div>
        </PageSection>

        <PageSection className="space-y-12">
          <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-[-0.02em] text-on-surface md:text-4xl">
            <SymbolIcon
              name="core_competencies"
              className="h-7 w-7 text-primary md:h-8 md:w-8"
            />
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {resumeData.competencies.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  'flex gap-4 pt-6',
                  index > 0 && 'border-t border-outline-variant/60',
                  index === 1 && 'md:border-t-0 md:pt-6',
                )}
              >
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
                  <SymbolIcon name={item.icon} className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-on-surface">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    <RichText text={item.value} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </PageContainer>
    </SiteShell>
  );
}
