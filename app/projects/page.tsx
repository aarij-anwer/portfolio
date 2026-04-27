import ProjectCard from '@/components/ProjectCard';
import SiteShell from '@/components/SiteShell';
import { PageContainer, SectionTitle } from '@/components/ui';
import { projects } from '@/data/site';

export default function ProjectsPage() {
  return (
    <SiteShell>
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
