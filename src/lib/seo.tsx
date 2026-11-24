import { createContext, useContext, useEffect } from 'react';
import { siteMeta } from '@/data/site';
import { parsedResume, summaryParagraphs } from '@/lib/resume';

type JsonLd = Record<string, unknown>;

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'profile' | 'article';
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
};

// Resolved, render-independent representation of a page's head metadata.
// Shared by the client-side DOM updater and the server-side tag renderer so
// the two never drift apart.
export type SeoData = {
  title: string;
  description: string;
  canonical: string;
  imageUrl: string;
  robots: string;
  type: string;
  jsonLd?: JsonLd | JsonLd[];
};

// During server-side pre-rendering the App is wrapped in this provider with a
// collector callback. <Seo> reports its resolved data so the prerender step can
// emit the matching <head> tags. On the client the context is absent (null) and
// only the DOM-updating effect runs.
export const SeoCollectorContext = createContext<
  ((data: SeoData) => void) | null
>(null);

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const envSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');

function siteUrl() {
  if (envSiteUrl) return envSiteUrl;
  if (typeof window !== 'undefined') return window.location.origin;
  return siteMeta.url;
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullPath = `${basePath}${normalizedPath}`.replace(/\/{2,}/g, '/');

  return `${siteUrl()}${fullPath === '/' ? '' : fullPath}`;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(id: string, value: JsonLd | JsonLd[]) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(value);
}

const PERSON_ID = '/#person';
const WEBSITE_ID = '/#website';

const personRef = () => ({ '@id': absoluteUrl('/') + PERSON_ID });
const websiteRef = () => ({ '@id': absoluteUrl('/') + WEBSITE_ID });

// Competency groups whose comma-separated values are concrete skills worth
// listing in `knowsAbout` (prose groups like "Stakeholder & Delivery" are skipped).
const SKILL_GROUPS = new Set([
  'Languages',
  'Frameworks & Libraries',
  'Architecture & Systems',
  'Cloud & DevOps',
]);

function resumeSkills(): string[] {
  const skills = parsedResume.competencies
    .filter((item) => SKILL_GROUPS.has(item.label))
    .flatMap((item) =>
      item.value
        .map((segment) => segment.text)
        .join('')
        .split(/,\s*/),
    )
    .map((skill) => skill.replace(/\s*\(.*?\)\s*/g, '').trim())
    .filter(Boolean);
  return [...new Set(skills)];
}

// Person entity built entirely from public/resume.tex.
export function personJsonLd(): JsonLd {
  const sameAs = parsedResume.contact
    .filter((item) => item.kind === 'linkedin' || item.kind === 'github')
    .map((item) => item.href!);
  const [locality, region] = parsedResume.location.split(/,\s*/);
  const current = parsedResume.experience.filter((job) => job.endDate === 'Present');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...personRef(),
    name: parsedResume.name,
    url: absoluteUrl('/'),
    image: absoluteUrl(siteMeta.image),
    email: `mailto:${parsedResume.email}`,
    jobTitle: parsedResume.summary.headline,
    description: summaryParagraphs[0],
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      ...(region ? { addressRegion: region } : {}),
      addressCountry: 'CA',
    },
    sameAs,
    knowsAbout: resumeSkills(),
    worksFor: current.map((job) => ({ '@type': 'Organization', name: job.company })),
    hasOccupation: current.map((job) => ({
      '@type': 'Occupation',
      name: job.role,
      occupationLocation: { '@type': 'Country', name: 'Canada' },
    })),
    alumniOf: parsedResume.education.map((item) => ({
      '@type': 'EducationalOrganization',
      name: item.school,
    })),
    hasCredential: parsedResume.education.map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.credential,
      recognizedBy: { '@type': 'EducationalOrganization', name: item.school },
    })),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...websiteRef(),
    name: siteMeta.name,
    url: absoluteUrl('/'),
    description: siteMeta.description,
    inLanguage: 'en',
    publisher: personRef(),
  };
}

// A profile page (home, resume) whose main subject is the Person.
export function profilePageJsonLd(path: string, name: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name,
    url: absoluteUrl(path),
    isPartOf: websiteRef(),
    mainEntity: personJsonLd(),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  image: string;
  tags: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
    keywords: project.tags.join(', '),
    author: personRef(),
    isPartOf: websiteRef(),
  };
}

const OG_LOCALE = 'en_CA';

const isIndexable = (data: SeoData) => !data.robots.startsWith('noindex');

// Resolve raw <Seo> props into the final, render-independent SeoData.
function buildSeoData({
  title = siteMeta.title,
  description = siteMeta.description,
  path = '/',
  image = siteMeta.image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps): SeoData {
  return {
    title,
    description,
    canonical: absoluteUrl(path),
    imageUrl: absoluteUrl(image),
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    type,
    jsonLd,
  };
}

// SeoData for a page that renders no <Seo> (used as a server-side fallback).
export function defaultSeo(): SeoData {
  return buildSeoData({});
}

// Apply SeoData to the live document head (client only).
function applySeoData(data: SeoData) {
  document.title = data.title;
  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: data.description,
  });
  upsertMeta('meta[name="robots"]', { name: 'robots', content: data.robots });
  upsertMeta('meta[name="author"]', { name: 'author', content: siteMeta.name });
  upsertMeta('meta[name="theme-color"]', {
    name: 'theme-color',
    content: '#0b57d0',
  });

  // A noindex page (404) must not declare a canonical URL.
  if (isIndexable(data)) {
    upsertLink('canonical', data.canonical);
  } else {
    document.head.querySelector('link[rel="canonical"]')?.remove();
  }

  upsertMeta('meta[property="og:locale"]', {
    property: 'og:locale',
    content: OG_LOCALE,
  });
  upsertMeta('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: siteMeta.name,
  });
  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: data.title,
  });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: data.description,
  });
  upsertMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: data.type,
  });
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: data.canonical,
  });
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: data.imageUrl,
  });
  upsertMeta('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: `${siteMeta.name} portfolio preview`,
  });

  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  });
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: data.title,
  });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: data.description,
  });
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: data.imageUrl,
  });

  if (data.jsonLd) {
    upsertJsonLd('page-json-ld', data.jsonLd);
  }
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Render SeoData to a string of <head> tags for static pre-rendering. Produces
// the same set of elements (and selectors) that applySeoData maintains, so the
// client-side effect reuses them in place after hydration instead of appending
// duplicates.
export function renderSeoTags(data: SeoData): string {
  const meta = (
    keyName: 'name' | 'property',
    key: string,
    content: string,
  ) =>
    `<meta ${keyName}="${key}" content="${escapeAttr(content)}" />`;

  const tags = [
    `<title>${escapeAttr(data.title)}</title>`,
    meta('name', 'description', data.description),
    meta('name', 'robots', data.robots),
    meta('name', 'author', siteMeta.name),
    meta('name', 'theme-color', '#0b57d0'),
    ...(isIndexable(data)
      ? [`<link rel="canonical" href="${escapeAttr(data.canonical)}" />`]
      : []),
    meta('property', 'og:site_name', siteMeta.name),
    meta('property', 'og:locale', OG_LOCALE),
    meta('property', 'og:title', data.title),
    meta('property', 'og:description', data.description),
    meta('property', 'og:type', data.type),
    meta('property', 'og:url', data.canonical),
    meta('property', 'og:image', data.imageUrl),
    meta('property', 'og:image:alt', `${siteMeta.name} portfolio preview`),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', data.title),
    meta('name', 'twitter:description', data.description),
    meta('name', 'twitter:image', data.imageUrl),
  ];

  if (data.jsonLd) {
    // Escape "<" so the payload can't terminate the script element early.
    const json = JSON.stringify(data.jsonLd).replace(/</g, '\\u003c');
    tags.push(
      `<script id="page-json-ld" type="application/ld+json">${json}</script>`,
    );
  }

  return tags.join('\n    ');
}

export default function Seo(props: SeoProps) {
  const data = buildSeoData(props);

  // Server-side: report resolved metadata to the prerender collector. Safe as a
  // render-time side effect because SSR renders in a single synchronous pass and
  // the collector is only present during pre-rendering.
  const collect = useContext(SeoCollectorContext);
  if (collect) {
    collect(data);
  }

  const { title, description, canonical, imageUrl, robots, type, jsonLd } = data;
  useEffect(() => {
    applySeoData({
      title,
      description,
      canonical,
      imageUrl,
      robots,
      type,
      jsonLd,
    });
  }, [title, description, canonical, imageUrl, robots, type, jsonLd]);

  return null;
}
