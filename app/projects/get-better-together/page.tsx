import ProjectDetailPage from '@/components/ProjectDetailPage';
import { getBetterTogetherProject } from '@/data/site';

export default function Page() {
  return <ProjectDetailPage project={getBetterTogetherProject} />;
}
