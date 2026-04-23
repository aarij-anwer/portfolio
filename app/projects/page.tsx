import { SiteShell } from "@/components/site-shell";
import { ProjectCard } from "@/components/project-card";
import { PageContainer, SectionTitle } from "@/components/ui";
import { projects } from "@/data/site";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageContainer className="space-y-16 md:space-y-24">
        <SectionTitle
          title="Selected Works"
          description="A collection of recent projects focusing on performance, scalability, and user experience."
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
