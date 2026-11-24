import { useParams } from 'wouter';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import NotFound from '@/pages/not-found';
import {
  launchgoodProject,
  esgProject,
  getBetterTogetherProject,
  portfolioProject,
  projects,
  siteMeta,
} from '@/data/site';
import Seo, { breadcrumbJsonLd, projectJsonLd } from '@/lib/seo';
import type { ProjectDetail } from '@/lib/types';

const projectsBySlug: Record<string, ProjectDetail> = {
  launchgood: launchgoodProject,
  'esg-financed-emissions': esgProject,
  'get-better-together': getBetterTogetherProject,
  'smart-portfolio-allocator': portfolioProject,
};

export default function ProjectDetailRoute() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsBySlug[slug] : undefined;
  if (!project) return <NotFound />;
  const projectSummary = projects.find((item) => item.slug === project.slug);
  const tags = project.techStack.flatMap((group) => group.items);

  return (
    <>
      <Seo
        title={`${project.seoTitle ?? project.title} | ${siteMeta.name}`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        image={project.heroImage.src}
        type="article"
        jsonLd={[
          projectJsonLd({
            title: project.title,
            summary: project.summary,
            slug: project.slug,
            image: project.heroImage.src,
            tags: projectSummary?.tags ?? tags,
          }),
          breadcrumbJsonLd([
            { name: siteMeta.name, path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetailPage project={project} />
    </>
  );
}
