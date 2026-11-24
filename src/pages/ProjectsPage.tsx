import ProjectCard from '@/components/ProjectCard';
import SiteShell from '@/components/SiteShell';
import { PageContainer, SectionTitle } from '@/components/ui';
import { projects, siteMeta } from '@/data/site';
import Seo, { absoluteUrl } from '@/lib/seo';

export default function ProjectsPage() {
  const description =
    `Software projects by ${siteMeta.name}: fundraising checkout at LaunchGood, an emissions platform at ESGTree, and AI-built apps with React and NestJS.`;

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
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index < 2} />
          ))}
        </div>
      </PageContainer>
    </SiteShell>
  );
}
