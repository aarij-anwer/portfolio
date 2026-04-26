import { SiteShell } from '@/components/SiteShell';
import { ProjectCard } from '@/components/ProjectCard';
import { PageContainer, SectionTitle } from '@/components/ui';
import { projects } from '@/data/site';

export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageContainer className="space-y-16 md:space-y-24">
        <SectionTitle
          title="Projects"
          description="A collection of projects that I've worked on, showcasing my skills and experience in various domains. Each project highlights the challenges I faced, the solutions I implemented, and the impact it had."
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
