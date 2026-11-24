import type { NavLink, ProjectDetail, ProjectSummary, SocialLinks } from '@/lib/types';
import { contactHref, parsedResume, summaryParagraphs, truncateText } from '@/lib/resume';
import { staticRoutes } from '@/lib/staticRoutes';

// Fail the build if a Recent Wins card links to a page that doesn't exist.
// A #fragment or ?query on a site path is fine; the path itself must be a route.
parsedResume.wins.forEach((win) => {
  if (win.href?.startsWith('/') && !staticRoutes.includes(win.href.replace(/[?#].*$/, ''))) {
    throw new Error(`resume.tex: "web:win" card "${win.title}" links to ${win.href}, which is not a site route`);
  }
});

// Identity, headline, summary and contact details come from public/resume.tex
// (the single source of truth). Only curated, web-only content lives here.
const resumeHeadline = parsedResume.summary.headline;
const [summaryLead = '', ...summaryRest] = summaryParagraphs;

export const siteMeta = {
  name: parsedResume.name,
  title: `${parsedResume.name} | ${resumeHeadline}`,
  description: truncateText(`${parsedResume.name} (${parsedResume.location}): ${summaryLead}`),
  url: 'https://muhammadanwer.com',
  image: '/opengraph.jpg',
  email: parsedResume.email,
  jobTitle: resumeHeadline,
  location: parsedResume.location,
  navLinks: [
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: '/resume' },
  ] satisfies NavLink[],
  socialLinks: {
    github: contactHref('github') ?? 'https://github.com/aarij-anwer',
    linkedin: contactHref('linkedin') ?? 'https://www.linkedin.com/in/m-a-anwer',
  } satisfies SocialLinks,
};

export const homeContent = {
  title: parsedResume.name,
  accent: parsedResume.name.split(' ').slice(-1)[0],
  headline: resumeHeadline,
  /** Rich-text summary paragraphs (first is the lead) straight from resume.tex. */
  paragraphs: parsedResume.summary.paragraphs,
  description: summaryLead,
  howIWork: summaryRest.join(' '),
  /** Recent Wins cards: the `% web:win` lines in resume.tex. */
  recentWins: parsedResume.wins,
  portrait: {
    src: '/muhammad-anwer.webp',
    width: 640,
    height: 853,
    alt: 'Muhammad Anwer',
  },
};

export const getBetterTogetherProject: ProjectDetail = {
  slug: 'get-better-together',
  title: 'Get Better Together',
  seoTitle: 'Get Better Together: Social Fitness App',
  eyebrow: 'Back to Projects',
  summary:
    'A social fitness app that helps you stay accountable with friends through shared challenges, streak tracking, and friendly competition.',
  heroImage: {
    src: '/projects/get-better-together.webp',
    width: 1280,
    height: 720,
    alt: 'Get Better Together landing page showing the create-a-challenge flow and live leaderboard.',
  },
  gallery: [
    {
      src: '/gallery/get-better-together/gbt-1.webp',
      width: 1920,
      height: 1435,
      alt: 'Pushup challenge leaderboard showing user rankings, streaks, and progress.',
    },
    {
      src: '/gallery/get-better-together/gbt-2.webp',
      width: 1920,
      height: 1080,
      alt: 'Dynamic schedule of activities with variable routines and rest days.',
    },
    {
      src: '/gallery/get-better-together/gbt-3.webp',
      width: 1920,
      height: 1080,
      alt: 'User profile showing joined challenges, progress, and stats.',
    },
    {
      src: '/gallery/get-better-together/gbt-4.webp',
      width: 1920,
      height: 1389,
      alt: 'Create a challenge flow with customizable settings and friend invitations.',
    },
  ],
  overview: [
    'Get Better Together is built around one core idea: consistency is easier when you’re not doing it alone. Instead of tracking habits in isolation, users join private, time-bound challenges with friends, where progress is visible and everyone moves forward together.',
    'The app features a clean, mobile-first interface optimized for daily use. It supports joining multiple customizable challenges at once, utilizing smart progress tracking with quick logging, adaptive inputs, and automatic backfill for missed days. Optional variable routines and rest days are also supported to prevent plateaus and ensure sustainability.',
    'To drastically reduce friction in trying the product, I introduced an anonymous guest mode alongside an always-on demo ("10-Day Pushup Challenge") with seeded participants. Users can participate instantly and later utilize a seamless guest-to-account upgrade flow that preserves all their progress.',
  ],
  features: [
    {
      title: 'Customizable Private Challenges',
      description:
        'Create time-bound challenges with daily targets and flexible durations, inviting friends via unique links or codes for seamless onboarding.',
      icon: 'users',
    },
    {
      title: 'Smart Progress & Streak Tracking',
      description:
        'Visual day-by-day progress tracking with quick logging, automatic backfill for missed days, and optional rest days to build momentum.',
      icon: 'chart-line',
    },
    {
      title: 'Real-Time Leaderboards',
      description:
        'Keep motivation high without being discouraging using real-time leaderboards and streak-based ranking.',
      icon: 'trophy',
    },
    {
      title: 'Frictionless Guest Mode & Upgrades',
      description:
        'Join challenges instantly without creating an account, with a seamless guest-to-account upgrade flow to preserve logged progress.',
      icon: 'zap',
    },
  ],
  metrics: [
    'Launched an always-on demo challenge with seeded participants to enable immediate onboarding validation.',
    'Reduced barrier to entry by enabling guest join and logging flows, preserving progress upon account creation.',
    'Implemented smart tracking logic capable of automatic backfill and variable routines to support long-term consistency.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    },
    {
      label: 'Infrastructure',
      items: ['Replit'],
    },
    {
      label: 'Focus',
      items: ['Real-time UX', 'Growth & Engagement', 'Product Design'],
    },
  ],
  actions: [
    {
      label: 'View Live Site',
      href: 'https://get-better-together.replit.app',
      variant: 'primary',
    },
    {
      label: 'Source Code',
      href: 'https://github.com/aarij-anwer/Better-Together',
      variant: 'secondary',
    },
  ],
};

export const launchgoodProject: ProjectDetail = {
  slug: 'launchgood',
  title: 'LaunchGood',
  seoTitle: 'LaunchGood: Guest Checkout, Design System & Recurring Giving',
  eyebrow: 'Back to Projects',
  summary:
    'A global fundraising marketplace connecting fundraisers and donors, powering one-time donations and recurring giving at scale across 150+ countries.',
  heroImage: {
    src: '/projects/lg.webp',
    width: 1280,
    height: 720,
    alt: 'LaunchGood dashboard showing campaign analytics and recurring donation metrics.',
  },
  gallery: [
    {
      src: '/gallery/lg/lg-1.webp',
      width: 1920,
      height: 1635,
      alt: 'Guest checkout flow with multi-step subscription funnel.',
    },
    {
      src: '/gallery/lg/lg-2.webp',
      width: 1920,
      height: 1109,
      alt: 'Settings page for managing recurring donation preferences and payment methods.',
    },
    {
      src: '/gallery/lg/lg-3.webp',
      width: 1920,
      height: 2189,
      alt: 'Recurring giving admin dashboard with subscription health KPIs.',
    },
    {
      src: '/gallery/lg/lg-4.webp',
      width: 1920,
      height: 1570,
      alt: 'Influencer profile dashboard with stats on followers, donations, and impact.',
    },
  ],
  overview: [
    'From March 2022 to September 2026 I shipped full-stack features for LaunchGood, a global fundraising marketplace powering one-time donations and recurring giving across 150+ countries. The work spanned an Nx monorepo of 23 services and 17 shared libraries: Next.js, React, Redux and Tailwind CSS on the front end, NestJS, Prisma and PostgreSQL behind it, and RabbitMQ between domains like donations, payouts, settlements and notifications.',
    'A leadership priority was subscription guest checkout, which I delivered end-to-end in one week. I identified security risks in the initial proposal and implemented safer alternatives. After launch, over 50% of new subscribers used guest checkout, improving conversions by ~40%. I went on to lead the recurring-giving enrollment funnels, replacing the legacy flow with shared amount, review and giving-grid screens behind a server-rendered app shell.',
    'I also took the shared component library from an idea to a published package, Heart & Soul (@launchgood/heart-and-soul): an RFC, a component-by-component plan, and 11 components with Storybook, Vitest, Playwright and CI. Separately, I found that campaign pages returned about 160 bytes of HTML before JavaScript ran, so search and answer-engine crawlers indexed empty pages, and moved them to server rendering.',
    'Beyond features, I owned operational quality: a repeatable on-call triage practice, root-cause fixes for production incidents, Retool tooling that cut billing triage from hours to minutes, and product analytics across PostHog, Heap and Customer.io that the team used to validate launches.',
  ],
  features: [
    {
      title: 'Guest Checkout & Enrollment Funnels',
      description:
        'Delivered subscription guest checkout in one week with one-click account completion, replacing risky parts of the original proposal with safer alternatives. Led the recurring-giving enrollment flow: shared amount, review and giving-grid screens, a mobile currency drawer, and Redux state behind a server-rendered app shell.',
      icon: 'credit-card',
    },
    {
      title: 'Heart & Soul Design System',
      description:
        'Took the shared component library from RFC to a published private package: Figma as the source of truth, plain Tailwind CSS, and a Button pilot before a wider rewrite. Shipped 11 components (Button, Chip, Campaign Card, Tabs, Dropdown and more) with Storybook, Vitest, Playwright and CI.',
      icon: 'palette',
    },
    {
      title: 'Server-Rendered Campaign Pages',
      description:
        'Campaign routes returned about 160 bytes of HTML until JavaScript ran, so crawlers indexed empty pages. Removed the client-only gate so campaign stories render in the first response, and fixed hydration mismatches that showed goals as 0 USD and raised amounts below the true figure.',
      icon: 'search',
    },
    {
      title: 'Campaign Profiling & Product Analytics',
      description:
        'Turned an ambiguous metrics request into a v1 plan: identity, pageview rules, BigQuery fact tables and a read API. Moved the PostHog BigQuery export from daily to hourly, restored PostHog capture on the marketing site, added Customer.io behind CookieYes consent, and defined the Heap event model for checkout funnels and A/B tests.',
      icon: 'bar-chart-2',
    },
    {
      title: 'On-Call & Incident Management',
      description:
        'Turned website support into a repeatable triage practice and carried incidents to root-cause fixes: cut bulk-billing database load that pushed CPU over 85%, traced an SLO burn to a Redis auth failure after a deploy, and built Retool consoles that cut billing triage from hours to minutes.',
      icon: 'activity',
    },
    {
      title: 'Public Profiles & Event-Driven Services',
      description:
        'Built social-media-style public profiles and partner dashboards end-to-end, and maintained RabbitMQ producers and consumers across donation, charge, payout, settlement and notification services with publisher-owned exchanges and consumer-owned queues.',
      icon: 'users',
    },
  ],
  metrics: [
    'Delivered an end-to-end subscription guest checkout in 1 week (leadership priority).',
    'Improved subscription conversions by ~40%, with >50% of new subscribers using guest checkout.',
    'Took the Heart & Soul design system from RFC to a published package with 11 tested components.',
    'Fixed campaign pages that served about 160 bytes of HTML to crawlers by moving them to server rendering.',
    'Cut bulk-billing database load that pushed CPU over 85% on runs of about 6,800 subscriptions.',
    'Reduced on-call billing triage from hours to minutes with Retool donor-lookup and KPI tooling.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['Next.js (React)', 'Redux', 'Tailwind CSS', 'TypeScript', 'Storybook'],
    },
    {
      label: 'Backend',
      items: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'REST APIs', 'OpenAPI', 'Node.js'],
    },
    {
      label: 'Infrastructure & Ops',
      items: ['AWS', 'RabbitMQ', 'Datadog', 'GitHub Actions', 'Nx Monorepo', 'Docker', 'Incident.io'],
    },
    {
      label: 'Testing',
      items: ['Jest', 'React Testing Library', 'Vitest', 'Playwright'],
    },
    {
      label: 'Data & Tools',
      items: ['PostHog', 'BigQuery', 'Heap', 'Customer.io', 'Retool', 'Cursor'],
    },
  ],
  actions: [
    {
      label: 'Visit LaunchGood',
      href: 'https://www.launchgood.com',
      variant: 'primary',
    },
  ],
};

export const esgProject: ProjectDetail = {
  slug: 'esg-financed-emissions',
  title: 'ESGTree Financed Emissions',
  seoTitle: 'ESGTree Financed Emissions: Idea to Full-Scale Rollout',
  eyebrow: 'Back to Projects',
  summary:
    'A multi-tenant platform for calculating and reporting PCAF-aligned financed emissions for banks, portfolio managers and their SME portfolio companies. Idea to paid pilot in under 4 weeks, then a full-scale rollout.',
  heroImage: {
    src: '/projects/esg.webp',
    width: 1280,
    height: 720,
    alt: 'Enterprise analytics dashboard for financed emissions reporting.',
  },
  gallery: [
    {
      src: '/gallery/esg/esg-1.webp',
      width: 1920,
      height: 1080,
      alt: 'Invite SMEs and portfolio companies via secure invitation codes.',
    },
    {
      src: '/gallery/esg/esg-2.webp',
      width: 1920,
      height: 1080,
      alt: 'Activity log feature.',
    },
    {
      src: '/gallery/esg/esg-3.webp',
      width: 1920,
      height: 1080,
      alt: 'SME and portfolio company view.',
    },
    {
      src: '/gallery/esg/esg-4.webp',
      width: 1920,
      height: 1080,
      alt: 'SME and portfolio company wizard for guided data entry with AI parsing of documents.',
    },
    {
      src: '/gallery/esg/esg-5.webp',
      width: 1920,
      height: 1191,
      alt: 'Emissions estimation',
    },
    {
      src: '/gallery/esg/esg-6.webp',
      width: 1920,
      height: 1191,
      alt: 'File and bull uploads, powered by AI parsing and human-in-the-loop verification.',
    },
    {
      src: '/gallery/esg/esg-7.webp',
      width: 1920,
      height: 1185,
      alt: 'Summary of completed data entered by SME users, showing calculated emissions and data quality scores.',
    },
  ],
  overview: [
    'ESGTree is a multi-tenant SaaS platform that helps financial institutions onboard SME portfolio companies, collect emissions data, and generate PCAF-aligned financed emissions reports. It serves two personas from one backend: a data-dense firm dashboard for portfolio analysts and a guided step-by-step wizard for SMEs entering their own data.',
    'As Senior Software Engineer (contract) since August 2025, I built the engineering team and lead architecture and delivery. With a team of 2, I took the product from an idea to production in under 4 weeks, making deliberate tradeoffs for speed and validation. It won a competitive vendor demo with Desjardins, secured a paid pilot, and I then led the full-scale rollout.',
    'To move from prototype to production platform, I led a refactor to modular NestJS with tenant-aware data access, Drizzle ORM, session-based dual authentication, invitation flows and bulk import, plus a database-driven activity model and an Excel seed system for 13 countries in English and French.',
    'I also set how the team ships. CI runs typecheck, unit, backend e2e on Postgres 16 and Playwright, with AI code and security review on every pull request. Every PR gets a throwaway Railway preview with its own database, the suite has grown to 300+ test files, and client-facing work ships behind PostHog feature flags with Sentry error tracking.',
  ],
  features: [
    {
      title: 'Idea to Paid Pilot to Rollout',
      description:
        'Took the product from an idea to production in under 4 weeks with a team of 2. Won a competitive vendor demo with Desjardins, secured the paid pilot, and led the full-scale rollout.',
      icon: 'rocket',
    },
    {
      title: 'PCAF-Aligned Emissions Engine',
      description:
        'Built a calculation engine for Scope 1, 2, and 3 financed emissions using the PCAF standard: Attribution Factor, Gross Emissions, and Data Quality Scoring. Supports spend-based proxy estimation for all 5 activity types when direct data is unavailable.',
      icon: 'calculator',
    },
    {
      title: 'AI-Powered Document Ingestion',
      description:
        'SMEs upload CSV, Excel, or PDF files to fill emissions forms. A multi-stage pipeline extracts data through header matching or OpenAI, validates it, and sends it for human review before acceptance.',
      icon: 'file-scan',
    },
    {
      title: 'Dual-Interface Product Design',
      description:
        "Two tailored interfaces from a single backend: a data-dense firm dashboard for portfolio analysts and a guided step-by-step wizard for SME data entry, each built for its persona's workflow.",
      icon: 'layout',
    },
    {
      title: 'Modular Multi-Tenant Architecture',
      description:
        'Led the move to modular NestJS with tenant-aware data access, session-based dual authentication, invitation flows and bulk import. A database-driven activity model and hash-gated Excel seeds for 13 countries and bilingual entry let emissions factors change without code changes.',
      icon: 'layers',
    },
    {
      title: 'CI, AI Review & Preview Environments',
      description:
        'Split GitHub Actions into typecheck/build, unit, backend e2e on Postgres 16, and Playwright, with path filters and cancel-on-push. A Claude code review and a security review run on pull requests, and every PR gets an isolated Railway app and database, seeded with test logins for each user type.',
      icon: 'git-pull-request',
    },
    {
      title: 'Safe Releases & Observability',
      description:
        'Grew the suite to 300+ test files across unit, integration, backend e2e and Playwright. Client-facing work ships behind PostHog feature flags with Sentry error tracking, and the server binds its port before migrations so a bad deploy serves 503 while the database catches up.',
      icon: 'shield',
    },
  ],
  metrics: [
    'Took the product from idea to production in under 4 weeks with a team of 2.',
    'Won a competitive vendor demo with Desjardins, secured the paid pilot, and led the full-scale rollout.',
    'Built the engineering team and set its scoping, review, and testing standard.',
    '300+ test files across unit, integration, backend e2e, and Playwright.',
    'An isolated Railway preview app and database for every pull request.',
    '13 countries and bilingual (EN/FR) entry via a hash-gated, Excel-driven seed system: no code changes to update emissions factors.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['Vite', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['NestJS', 'Drizzle ORM', 'PostgreSQL', 'Passport.js', 'Zod'],
    },
    {
      label: 'AI / Integrations',
      items: ['OpenAI (document parsing)', 'Resend (email)', 'Replit OIDC'],
    },
    {
      label: 'Testing & Delivery',
      items: ['Vitest', 'Playwright', 'GitHub Actions', 'Railway previews', 'Claude code review'],
    },
    {
      label: 'Observability',
      items: ['PostHog (feature flags, errors)', 'Sentry'],
    },
    {
      label: 'Focus',
      items: [
        'System Design',
        'Product Engineering',
        'Multi-tenant SaaS',
        'Regulatory Reporting (PCAF)',
        'AI-driven Development',
        'Bilingual (FR/EN)',
      ],
    },
  ],
  actions: [
    {
      label: 'Visit ESGTree',
      href: 'https://finem.esgtree.com',
      variant: 'primary',
    },
  ],
};

export const portfolioProject: ProjectDetail = {
  slug: 'smart-portfolio-allocator',
  title: 'Smart Portfolio Allocator',
  seoTitle: 'Smart Portfolio Allocator: DCA Investing Tool',
  eyebrow: 'Back to Projects',
  summary:
    'An intelligent allocation tool designed for Canadian investors to maximize every dollar of their monthly budget for DCA and ETF portfolio building.',
  heroImage: {
    src: '/projects/smart-portfolio-allocator.webp',
    width: 1280,
    height: 720,
    alt: 'Smart Portfolio Allocator interface showing strategy selection and share allocation breakdown.',
  },
  gallery: [],
  overview: [
    'Smart Portfolio Allocator is an interactive planning tool designed to take the manual calculation out of monthly Dollar Cost Averaging (DCA). It allows users to choose from preset strategies or create custom mixes with up to 10 holdings.',
    'Under the hood, I built a custom allocation engine that handles real-time USD to CAD conversions, debounced live quote resolution, and precise purchase calculations.',
    'To maximize capital efficiency, the algorithm utilizes an initial floor allocation followed by a greedy fill strategy with priority rebalancing. It explicitly shows users how many shares to buy (supporting both whole and fractional shares) and exactly how much cash remains.',
  ],
  features: [
    {
      title: 'Intelligent Allocation Engine',
      description:
        'Calculates exact share quantities using a greedy fill algorithm and priority rebalancing, ensuring every dollar is put to work.',
      icon: 'calculator',
    },
    {
      title: 'Whole & Fractional Shares',
      description:
        'Flexible calculation modes that support both whole share constraints and fractional share purchasing.',
      icon: 'pie-chart',
    },
    {
      title: 'Live Quotes & FX Polling',
      description:
        'Integrates debounced ticker resolution and automated 5-minute polling for real-time USD/CAD exchange rates.',
      icon: 'globe',
    },
    {
      title: 'Preset & Custom Strategies',
      description:
        'Enables users to quickly apply curated portfolio mixes or build custom allocations with up to 10 distinct holdings.',
      icon: 'sliders',
    },
  ],
  metrics: [
    'Engineered a custom greedy-fill allocation algorithm that optimizes leftover cash and handles cross-border (USD/CAD) pricing.',
    'Optimized API usage by implementing debounced quote resolution and isolated 5-minute background polling for FX rates.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      label: 'Core Logic',
      items: ['Custom Allocation Algorithms', 'Debounced React Hooks'],
    },
  ],
  actions: [
    {
      label: 'View Live Site',
      href: 'https://smart-portfolio-allocator.vercel.app',
      variant: 'primary',
    },
    {
      label: 'Source Code',
      href: 'https://github.com/aarij-anwer/stock-investment-calculator',
      variant: 'secondary',
    },
  ],
};

export const projects: ProjectSummary[] = [
  {
    slug: 'launchgood',
    title: 'LaunchGood',
    summary:
      'Shipped features for a global fundraising marketplace (2022-2026): guest checkout in one week (~40% conversion lift), the Heart & Soul design system, and server-rendered campaign pages.',
    tags: [
      'Next.js',
      'React',
      'Redux',
      'Tailwind CSS',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'AWS',
      'Datadog',
      'Retool',
      'Heap',
    ],
    href: '/projects/launchgood',
    image: {
      src: '/projects/lg.webp',
      width: 1280,
      height: 720,
      alt: 'LaunchGood dashboard.',
    },
  },
  {
    slug: 'esg-financed-emissions',
    title: 'ESGTree Financed Emissions',
    summary:
      'Took a financed-emissions platform from idea to production in under 4 weeks with a team of 2, won a paid pilot with Desjardins, and led the full-scale rollout.',
    tags: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'NestJS',
      'PostgreSQL',
      'Drizzle ORM',
      'System Design',
      'Product Engineering',
      'AI-driven Development',
    ],
    href: '/projects/esg-financed-emissions',
    image: {
      src: '/projects/esg.webp',
      width: 1280,
      height: 720,
      alt: 'Enterprise analytics dashboard for financed emissions reporting.',
    },
  },
  {
    slug: 'get-better-together',
    title: 'Get Better Together',
    summary:
      'A social fitness app for shared challenges. Features smart progress tracking, real-time leaderboards, and a frictionless guest mode for instant onboarding.',
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Replit',
      'Buildathon',
      'Product Design',
    ],
    href: '/projects/get-better-together',
    image: {
      src: '/projects/get-better-together.webp',
      width: 1280,
      height: 720,
      alt: 'Get Better Together landing page showing the create-a-challenge flow and live leaderboard.',
    },
  },
  {
    slug: 'smart-portfolio-allocator',
    title: 'Smart Portfolio Allocator',
    summary:
      'An allocation tool for Canadian investors to optimize DCA strategies. Features a custom greedy-fill algorithm handling live FX rates and fractional shares.',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Algorithms',
      'Financial Modeling',
    ],
    href: '/projects/smart-portfolio-allocator',
    image: {
      src: '/projects/smart-portfolio-allocator.webp',
      width: 1280,
      height: 720,
      alt: 'Smart Portfolio Allocator interface showing strategy selection and share allocation breakdown.',
    },
  },
];
