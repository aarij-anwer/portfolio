import { useParams } from 'wouter';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import NotFound from '@/pages/not-found';
import {
  launchgoodProject,
  esgProject,
  getBetterTogetherProject,
  portfolioProject,
} from '@/data/site';
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
  return <ProjectDetailPage project={project} />;
}
