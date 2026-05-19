import ProjectCard from '@/components/ProjectCard';
import SiteShell from '@/components/SiteShell';
import { PageContainer, SectionTitle } from '@/components/ui';
import { projects, siteMeta } from '@/data/site';
import Seo, { absoluteUrl } from '@/lib/seo';

export default function ProjectsPage() {
  const description =
    'Selected software engineering projects by Muhammad Anwer across full-stack product development, React, TypeScript, NestJS, PostgreSQL, fintech, and AI-assisted delivery.';

  return (
    <SiteShell>
      <Seo
        title={`Projects | ${siteMeta.name}`}
        description={description}
        path="/projects"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Projects | ${siteMeta.name}`,
          description,
          url: absoluteUrl('/projects'),
          mainEntity: projects.map((project) => ({
            '@type': 'CreativeWork',
            name: project.title,
            description: project.summary,
            url: absoluteUrl(project.href ?? `/projects/${project.slug}`),
          })),
        }}
      />
      <PageContainer className="space-y-16 md:space-y-24">
        <SectionTitle
          title="Projects"
          description="A selection of products I’ve built highlighting the problems tackled, the systems designed, and the impact delivered."
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </PageContainer>
    </SiteShell>
  );
}
