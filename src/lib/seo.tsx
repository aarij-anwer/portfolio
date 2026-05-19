import { useEffect } from 'react';
import { siteMeta } from '@/data/site';

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

export function personJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMeta.name,
    url: absoluteUrl('/'),
    image: absoluteUrl(siteMeta.image),
    email: siteMeta.email,
    jobTitle: siteMeta.jobTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressCountry: 'CA',
    },
    sameAs: [siteMeta.socialLinks.github, siteMeta.socialLinks.linkedin],
    knowsAbout: [
      'Full-stack software engineering',
      'React',
      'TypeScript',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Product engineering',
      'AI-assisted software development',
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMeta.name,
    url: absoluteUrl('/'),
    description: siteMeta.description,
    publisher: personJsonLd(),
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
    author: personJsonLd(),
  };
}

export default function Seo({
  title = siteMeta.title,
  description = siteMeta.description,
  path = '/',
  image = siteMeta.image,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const canonical = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);
    const robots = noindex ? 'noindex, nofollow' : 'index, follow';

    document.title = title;
    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[name="author"]', {
      name: 'author',
      content: siteMeta.name,
    });
    upsertMeta('meta[name="theme-color"]', {
      name: 'theme-color',
      content: '#0b57d0',
    });

    upsertLink('canonical', canonical);

    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteMeta.name,
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonical,
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
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
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    });

    if (jsonLd) {
      upsertJsonLd('page-json-ld', jsonLd);
    }
  }, [description, image, jsonLd, noindex, path, title, type]);

  return null;
}
