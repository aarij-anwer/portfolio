import { Link } from 'wouter';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-container px-6 md:px-12', className)}>
      {children}
    </div>
  );
}

export function PageSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn('space-y-8', className)}>{children}</section>;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  className,
  variant = 'primary',
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold transition-colors duration-200',
    variant === 'primary'
      ? 'border-primary bg-primary text-on-primary hover:bg-primary-fixed'
      : 'border-outline bg-transparent text-on-surface hover:bg-surface-container-high',
    className,
  );

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border border-outline-variant bg-surface-container-high px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-colors',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SurfaceCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-outline-variant bg-surface-container shadow-glow',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn('space-y-4', className)}>
      <h1 className="text-4xl font-bold tracking-[-0.04em] text-on-surface md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="text-base leading-7 text-on-surface-variant md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
