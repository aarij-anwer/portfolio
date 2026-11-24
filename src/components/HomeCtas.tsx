import { ButtonLink } from '@/components/ui';

export default function HomeCtas() {
  return (
    <div className="flex flex-wrap gap-4 pt-4">
      <ButtonLink
        href="/projects"
      >
        View Projects
      </ButtonLink>
      <ButtonLink
        href="/resume"
        variant="secondary"
      >
        My Resume
      </ButtonLink>
    </div>
  );
}
