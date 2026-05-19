import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import posthog from 'posthog-js';
import { GitHubIcon, LinkedInIcon, MenuIcon, XIcon } from '@/components/icons';
import { siteMeta } from '@/data/site';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

function isActive(pathname: string, href: string) {
  if (href === '/projects') {
    return pathname.startsWith('/projects');
  }
  return pathname === href;
}

export function TopNav() {
  const [pathname] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeMenu(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          className="text-sm font-bold tracking-tight text-on-surface md:text-base"
          href="/"
        >
          {siteMeta.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteMeta.navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'border-b-2 pb-1 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface',
                isActive(pathname, item.href)
                  ? 'border-primary-container text-primary-container'
                  : 'border-transparent',
              )}
              onClick={() =>
                posthog.capture('nav_link_clicked', {
                  label: item.label,
                  href: item.href,
                })
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <a
            aria-label="GitHub"
            className="rounded-md p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high hover:text-on-surface"
            href={siteMeta.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              posthog.capture('social_link_clicked', { platform: 'github' })
            }
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            aria-label="LinkedIn"
            className="rounded-md p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high hover:text-on-surface"
            href={siteMeta.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              posthog.capture('social_link_clicked', { platform: 'linkedin' })
            }
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="ml-1 rounded-md p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high hover:text-on-surface md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-nav-menu"
          className="border-t border-outline-variant bg-surface/95 px-6 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {siteMeta.navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface',
                  isActive(pathname, item.href) &&
                    'bg-surface-container-high text-on-surface',
                )}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  posthog.capture('nav_link_clicked', {
                    label: item.label,
                    href: item.href,
                  });
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
