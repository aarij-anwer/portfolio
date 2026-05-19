import posthog from 'posthog-js';
import { ButtonLink } from '@/components/ui';

type Action = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
};

export default function ProjectActionButtons({
  actions,
  projectSlug,
}: {
  actions: Action[];
  projectSlug: string;
}) {
  if (actions.length === 0) return null;
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-outline-variant pt-6">
      {actions.map((action) => (
        <ButtonLink
          key={action.label}
          href={action.href}
          variant={action.variant}
          onClick={() =>
            posthog.capture('project_action_clicked', {
              label: action.label,
              href: action.href,
              project_slug: projectSlug,
            })
          }
        >
          {action.label}
        </ButtonLink>
      ))}
    </div>
  );
}
