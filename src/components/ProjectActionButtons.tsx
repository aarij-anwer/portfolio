import { ButtonLink } from '@/components/ui';

type Action = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
};

export default function ProjectActionButtons({ actions }: { actions: Action[] }) {
  if (actions.length === 0) return null;
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-outline-variant pt-6">
      {actions.map((action) => (
        <ButtonLink
          key={action.label}
          href={action.href}
          variant={action.variant}
        >
          {action.label}
        </ButtonLink>
      ))}
    </div>
  );
}
