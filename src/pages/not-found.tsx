import SiteShell from '@/components/SiteShell';
import { ButtonLink, PageContainer, SurfaceCard } from '@/components/ui';
import { siteMeta } from '@/data/site';
import Seo from '@/lib/seo';

export default function NotFound() {
  return (
    <SiteShell>
      <Seo
        title={`Page Not Found | ${siteMeta.name}`}
        description="The page you were looking for doesn't exist. Browse projects or the resume instead."
        path="/404"
        noindex
      />
      <PageContainer className="max-w-[720px]">
        <SurfaceCard className="space-y-6 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">404</p>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-on-surface md:text-4xl">
            This page doesn&apos;t exist
          </h1>
          <p className="text-base leading-7 text-on-surface-variant">
            The link may be out of date, or the page has moved. Try one of these instead:
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Home</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Projects
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              Resume
            </ButtonLink>
          </div>
        </SurfaceCard>
      </PageContainer>
    </SiteShell>
  );
}
