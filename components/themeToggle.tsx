'use client';

import { useEffect, useRef, useState } from 'react';
import posthog from 'posthog-js';
import { SunIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const themeOptions: Array<{ mode: ThemeMode; label: string }> = [
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
  { mode: 'system', label: 'System' },
];

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

function getStoredMode(): ThemeMode {
  const storedTheme = window.localStorage.getItem('theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return 'system';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') {
    return getSystemTheme();
  }

  return mode;
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMode = getStoredMode();
    const initialResolvedTheme = resolveTheme(initialMode);

    applyTheme(initialResolvedTheme);
    setMode(initialMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (getStoredMode() !== 'system') {
        return;
      }

      const nextTheme = event.matches ? 'dark' : 'light';
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener('change', syncSystemTheme);

    return () => mediaQuery.removeEventListener('change', syncSystemTheme);
  }, []);

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function selectTheme(nextMode: ThemeMode) {
    if (nextMode === 'system') {
      window.localStorage.removeItem('theme');
    } else {
      window.localStorage.setItem('theme', nextMode);
    }

    const nextTheme = resolveTheme(nextMode);
    applyTheme(nextTheme);
    setMode(nextMode);
    setIsOpen(false);
    posthog.capture('theme_selected', {
      mode: nextMode,
      resolvedTheme: nextTheme,
    });
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label={`Theme menu, current theme ${mode}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="rounded-md p-2 text-on-surface-variant transition-all duration-200 hover:bg-surface-container-high hover:text-on-surface"
        onClick={() => setIsOpen((open) => !open)}
      >
        <SunIcon className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-11 z-50 w-36 overflow-hidden rounded-lg border border-outline-variant bg-surface-container shadow-glow"
        >
          {themeOptions.map((option) => (
            <button
              key={option.mode}
              type="button"
              role="menuitemradio"
              aria-checked={mode === option.mode}
              className={cn(
                'flex w-full items-center justify-between px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface',
                mode === option.mode &&
                  'bg-surface-container-high text-on-surface'
              )}
              onClick={() => selectTheme(option.mode)}
            >
              <span>{option.label}</span>
              {mode === option.mode ? (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
