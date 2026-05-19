import {
  NavLink,
  SocialLinks,
  ImageAsset,
  Competency,
  ProjectSummary,
  ProjectFeature,
  ProjectDetail,
} from '@/lib/types';

// Re-export types for backward compatibility
export type {
  NavLink,
  SocialLinks,
  ImageAsset,
  Competency,
  ProjectSummary,
  ProjectFeature,
  ProjectDetail,
};

export const siteMeta = {
  name: 'Muhammad Anwer',
  title: 'Muhammad Anwer | Full-Stack Software Engineer',
  description:
    'Portfolio of Muhammad Anwer, a full-stack software engineer building high-impact React, TypeScript, NestJS, and product engineering systems.',
  url: 'https://muhammadanwer.com',
  image: '/opengraph.jpg',
  email: 'maanwer0@gmail.com',
  jobTitle: 'Full-Stack Software Engineer',
  location: 'Toronto, Canada',
  navLinks: [
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: '/resume' },
  ] satisfies NavLink[],
  socialLinks: {
    github: 'https://github.com/aarij-anwer/',
    linkedin: 'https://www.linkedin.com/in/m-a-anwer/',
  } satisfies SocialLinks,
};

export const homeContent = {
  title: 'Muhammad Anwer',
  accent: 'Anwer',
  description:
    'Full-stack engineer focused on building high-impact products: from rapid 0→1 MVPs to scalable, production systems. I combine product thinking, strong systems design, and execution speed to deliver meaningful results.',
  howIWork:
    'I strongly believe in iterative approaches: identify a problem, prototype a solution, test it with real users, build/pivot accordingly. AI is part of that loop end-to-end, from scoping to development and beyond.',
  recentWins: [
    {
      stat: '1 week',
      title: 'Guest checkout, shipped',
      description:
        'End-to-end at LaunchGood. >50% of new subscribers adopted it, lifting conversions ~40%. Staple feature for onboarding and acquisition ever since.',
      href: '/projects/launchgood',
    },
    {
      stat: '0 → 1',
      title: 'MVP wins demo',
      description:
        'Built and led an emissions calculation platform from prototype to production, helping client win Desjardins demo.',
      href: '/projects/esg-financed-emissions',
    },
    {
      stat: '100% AI',
      title: 'Get Better Together',
      description:
        'Designed and shipped a social fitness app end-to-end using AI agents featuring leaderboards, user auth and an anonymous guest mode that lets users join challenges in seconds.',
      href: '/projects/get-better-together',
    },
  ],
  portrait: {
    src: '/C1F0A34C-22D0-425C-9909-2A768B9C1864_1_105_c.jpeg',
    alt: 'Muhammad Anwer',
  },
};

export const getBetterTogetherProject: ProjectDetail = {
  slug: 'get-better-together',
  title: 'Get Better Together',
  eyebrow: 'Back to Projects',
  summary:
    'A social fitness app that helps you stay accountable with friends through shared challenges, streak tracking, and friendly competition.',
  heroImage: {
    src: '/projects/get-better-together.png',
    alt: 'Get Better Together landing page showing the create-a-challenge flow and live leaderboard.',
  },
  gallery: [],
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

// export const launchgoodProject: ProjectDetail = {
//   slug: 'launchgood',
//   title: 'LaunchGood',
//   eyebrow: 'Back to Projects',
//   summary:
//     'A global fundraising marketplace connecting fundraisers and donors, powering donations and recurring giving at scale.',
//   heroImage: {
//     src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
//     alt: 'LaunchGood dashboard.',
//   },
//   gallery: [],
//   overview: [
//     'At LaunchGood, I ship full-stack features for a global fundraising marketplace. A key leadership priority was delivering a guest checkout for subscriptions end-to-end in one week. During this, I identified security vulnerabilities in the initial proposal and implemented safer alternatives. After launch, over 50% of new subscribers used guest checkout, improving conversions by ~40%.',
//     'I led the technical direction for multi-step subscription funnels, utilizing an app-shell pattern for performance, and built follower-facing public profiles with companion admin dashboards backed by NestJS and REST APIs.',
//     'Beyond feature development, I drove operational improvements by proactively building custom Retool dashboards for on-call triage, defining end-to-end Heap product analytics, and leading incident response and system design reviews across the platform.',
//   ],
//   features: [
//     {
//       title: 'Guest Checkout & Onboarding Funnels',
//       description:
//         'Delivered guest checkout in one week, securing vulnerabilities. Implemented multi-step funnels with Next.js and Redux, improving load times via an app-shell pattern.',
//       icon: 'credit-card',
//     },
//     {
//       title: 'Public Profiles & Recurring Dashboards',
//       description:
//         'Built social media–style public profiles and dashboard views for charities to manage recurring programs, fully backed by automated tests and REST APIs.',
//       icon: 'users',
//     },
//     {
//       title: 'Proactive Operational Tooling (Retool)',
//       description:
//         'Built internal dashboards without formal request, delivering a donor lookup console and scheduled-giving KPIs to identify spikes and triage billing issues.',
//       icon: 'layout',
//     },
//     {
//       title: 'Incident Response & System Design',
//       description:
//         'Led production triage using Datadog and AWS, authored runbooks to standardize mitigation, and contributed to system design via RFCs.',
//       icon: 'activity',
//     },
//   ],
//   metrics: [
//     'Delivered an end-to-end subscription guest checkout in 1 week (leadership priority).',
//     'Improved subscription conversions by ~40%, with >50% of new subscribers utilizing guest checkout.',
//     'Coordinated CI-gated monorepo releases and mitigated regression risks through rigorous design and code reviews.',
//   ],
//   techStack: [
//     {
//       label: 'Frontend',
//       items: [
//         'Next.js (React)',
//         'Redux',
//         'Tailwind CSS',
//         'Jest',
//         'React Testing Library',
//       ],
//     },
//     {
//       label: 'Backend',
//       items: ['NestJS', 'Prisma', 'PostgreSQL', 'REST APIs'],
//     },
//     {
//       label: 'Infrastructure & Ops',
//       items: ['AWS', 'RabbitMQ', 'Datadog', 'GitHub Actions'],
//     },
//     { label: 'Tools', items: ['Heap Analytics', 'Retool'] },
//   ],
//   actions: [],
// };

export const launchgoodProject: ProjectDetail = {
  slug: 'launchgood',
  title: 'LaunchGood',
  eyebrow: 'Back to Projects',
  summary:
    'A global fundraising marketplace connecting fundraisers and donors, powering one-time donations and recurring giving at scale across 150+ countries.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
    alt: 'LaunchGood dashboard showing campaign analytics and recurring donation metrics.',
  },
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
      alt: 'Guest checkout flow with multi-step subscription funnel.',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
      alt: 'Recurring giving admin dashboard with subscription health KPIs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
      alt: 'Public follower profile page with active campaigns and giving history.',
    },
    {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Internal Retool console for on-call donor lookup and billing triage.',
    },
  ],
  overview: [
    'At LaunchGood, I ship full-stack features for a global fundraising marketplace serving millions of donors and tens of thousands of fundraisers each year. A key leadership priority was delivering a guest checkout for subscriptions end-to-end in one week. During this, I identified security vulnerabilities in the initial proposal and implemented safer alternatives. After launch, over 50% of new subscribers used guest checkout, improving conversions by ~40%.',
    'I led the technical direction for multi-step subscription funnels, utilizing an app-shell pattern for performance, and built follower-facing public profiles with companion admin dashboards backed by NestJS microservices and REST APIs. The work spans an NX monorepo of 23 services and 17 shared libraries, with RabbitMQ powering async messaging between domains like donations, payouts, settlements, and notifications.',
    'Beyond feature development, I drove operational improvements by proactively building custom Retool dashboards for on-call triage, defining end-to-end Heap product analytics, and leading incident response and system design reviews across the platform. I also contributed to the migration toward a client-library pattern that centralizes per-service RPC contracts, DTOs, and Prisma schemas, reducing cross-service coupling.',
    'Day to day, I partner closely with product and design to translate ambiguous goals into shipped software: writing RFCs for non-trivial changes, gating releases through CI checks in a conventional-commits workflow, and mentoring teammates on testing, observability, and safe rollouts.',
  ],
  features: [
    {
      title: 'Guest Checkout & Onboarding Funnels',
      description:
        'Delivered guest checkout in one week, securing vulnerabilities surfaced during design review. Implemented multi-step funnels with Next.js and Redux, improving load times via an app-shell pattern and code-split routes.',
      icon: 'credit-card',
    },
    {
      title: 'Public Profiles & Recurring Dashboards',
      description:
        'Built social-media-style public profiles and admin dashboard views for charities to manage recurring programs, fully backed by Jest + React Testing Library suites and REST APIs over NestJS services.',
      icon: 'users',
    },
    {
      title: 'Proactive Operational Tooling (Retool)',
      description:
        'Built internal dashboards without formal request, delivering a donor lookup console and scheduled-giving KPIs that let on-call engineers identify spikes and triage billing issues in minutes instead of hours.',
      icon: 'layout',
    },
    {
      title: 'Incident Response & System Design',
      description:
        'Led production triage using Datadog and AWS, authored runbooks to standardize mitigation, and contributed to system design via RFCs covering subscription billing, settlements, and event-driven messaging.',
      icon: 'activity',
    },
    {
      title: 'Event-Driven Microservices',
      description:
        'Implemented RabbitMQ producers/consumers across donation, charge, payout, and notification services, with publisher-owned exchanges and consumer-owned queues to keep contracts explicit.',
      icon: 'share-2',
    },
    {
      title: 'Product Analytics & Experimentation',
      description:
        'Defined end-to-end Heap analytics for checkout and subscription funnels, instrumented A/B experiments, and partnered with growth to convert insights into prioritized roadmap bets.',
      icon: 'bar-chart-2',
    },
  ],
  metrics: [
    'Delivered an end-to-end subscription guest checkout in 1 week (leadership priority).',
    'Improved subscription conversions by ~40%, with >50% of new subscribers utilizing guest checkout.',
    'Reduced on-call billing triage time from hours to minutes via custom Retool donor-lookup tooling.',
    'Coordinated CI-gated monorepo releases across 23 services and mitigated regression risks through rigorous design and code reviews.',
    'Authored and led RFCs adopted as the standard for recurring-giving and settlement workflows.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: [
        'Next.js (React)',
        'Redux',
        'Tailwind CSS',
        'TypeScript',
        'Jest',
        'React Testing Library',
      ],
    },
    {
      label: 'Backend',
      items: [
        'NestJS',
        'Prisma',
        'PostgreSQL',
        'REST APIs',
        'OpenAPI',
        'Node.js',
      ],
    },
    {
      label: 'Infrastructure & Ops',
      items: [
        'AWS',
        'RabbitMQ',
        'Datadog',
        'GitHub Actions',
        'NX Monorepo',
        'Docker',
        'Incident.io',
      ],
    },
    {
      label: 'Tools',
      items: ['Heap Analytics', 'Retool', 'Cursor', 'Cleric'],
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
  eyebrow: 'Back to Projects',
  summary:
    'An enterprise platform for calculating and reporting financed emissions for banks, portfolio managers and their SME portfolio companies.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_uaOUYZfFUhxfRN5WjwGCj5p8uW58Ng9YdPjxaGPWQogP2AJR-ZWPBo1CMD0lQLDeUtu5ksAKiCuYQe6m9k-W7PenIghBrDOX8dKNfKIphvOWcsTJh4dslbOisA1l5T7fJtGvJLz2AipPYkiw9Boj4UmqilwtoVvHYuWXTrYsCGLWUrfvRx1754BV3NUK0GsZz9vueJYh8m9027kEzDGcRDC3x_Wi5qipp9xOq7DdEOHhl0E3tqfi9MFrhQBzEHdZlJV7se7S73-',
    alt: 'Enterprise analytics dashboard for financed emissions reporting.',
  },
  gallery: [],
  overview: [
    'ESGTree is a multi-tenant SaaS platform that helps financial firms onboard SME portfolio companies, collect emissions data, and generate PCAF-aligned financed emissions reports. It serves two distinct personas through separate interfaces: a data-dense firm dashboard for analysts and a guided step-by-step wizard for SME users entering their own emissions data.',
    'I led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks, guiding a team of 2 engineers and owning architecture and delivery. I made deliberate tradeoffs to prioritize speed and validation. The product won a competitive vendor demo with Desjardins, securing a paid pilot with onboarding in progress.',
    'After validating product-market fit, I led a backend refactor to NestJS to introduce modular architecture, enforce clear boundaries, and improve reliability and data integrity. This included migrating to Drizzle ORM, adding session-based dual authentication (Replit OIDC and email/password), establishing a database-driven emissions activity model, and building a 400+ test suite covering unit, integration, and E2E flows — transitioning the system from a rapid prototype to a production-grade platform.',
  ],
  features: [
    {
      title: 'AI-Driven 0→1 MVP Delivery',
      description:
        'Led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks, making deliberate tradeoffs to prioritize speed and validation. Won a competitive vendor demo with Desjardins, securing a paid pilot.',
      icon: 'rocket',
    },
    {
      title: 'PCAF-Aligned Emissions Engine',
      description:
        'Built a calculation engine for Scope 1, 2, and 3 financed emissions using the PCAF standard: Attribution Factor, Gross Emissions, and Data Quality Scoring. Supports spend-based proxy estimation for all 5 activity types when direct data is unavailable.',
      icon: 'calculator',
    },
    {
      title: 'AI-Powered Document Parsing',
      description:
        'SMEs can upload CSV, Excel, or PDF files to auto-populate emissions forms. A multi-stage pipeline extracts data via header matching or OpenAI, then applies post-AI validation with human-in-the-loop verification before acceptance.',
      icon: 'file-scan',
    },
    {
      title: 'Dual-Interface Product Design',
      description:
        "Designed two tailored interfaces from a single backend: a data-dense firm dashboard for portfolio analysts and a guided step-by-step wizard for SME data entry — each optimized for its persona's workflow and context.",
      icon: 'layout',
    },
    {
      title: 'Modular Backend Architecture',
      description:
        'Led a backend refactor to NestJS to introduce modular architecture, enforce clear tenant boundaries, and improve reliability and data integrity. Established a database-driven activity model so emissions categories can be updated without code changes.',
      icon: 'layers',
    },
    {
      title: 'Multi-Country & Bilingual Support',
      description:
        'Supports 13 countries and bilingual (French/English) data entry. Emissions factors and sector data are seeded from Excel workbooks via a hash-gated system — changes to source data propagate automatically on deploy without code changes.',
      icon: 'globe',
    },
    {
      title: 'End-to-End System Ownership',
      description:
        'Designed the multi-tenant data model, session-based dual auth (Replit OIDC + email/password), invitation flows, bulk import pipeline, and a 400+ test suite across 15 files covering unit, integration, and E2E scenarios.',
      icon: 'cpu',
    },
  ],
  metrics: [
    'Led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks.',
    'Won a competitive vendor demo with Desjardins, securing a paid pilot with onboarding in progress.',
    'Transitioned the system from a rapid prototype to a production-grade platform by leading a NestJS backend refactor.',
    '400+  tests across 15 test files covering unit, integration, and E2E flows.',
    '5 emissions activity types across Scope 1, 2, and 3 with PCAF-aligned attribution calculations.',
    '13 countries supported via a hash-gated, Excel-driven seed system — zero code changes required to update emissions factors.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['Vite (React 18)', 'TypeScript', 'Tailwind CSS'],
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
      label: 'Testing',
      items: ['Vitest', '400+ tests — unit, integration, E2E'],
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
  eyebrow: 'Back to Projects',
  summary:
    'An intelligent allocation tool designed for Canadian investors to maximize every dollar of their monthly budget for DCA and ETF portfolio building.',
  heroImage: {
    src: '/projects/smart-portfolio-allocator.png',
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
      'Ship features for a global fundraising marketplace. Deliver high-impact features quickly, e.g. guest checkout in one week, improving conversions by ~40%.',
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
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
      alt: 'LaunchGood dashboard.',
    },
  },
  {
    slug: 'esg-financed-emissions',
    title: 'ESGTree Financed Emissions',
    summary:
      'Led AI-driven MVP development for an emissions platform in under 4 weeks, winning a pilot with Desjardins. Now leading a full rollout.',
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
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_uaOUYZfFUhxfRN5WjwGCj5p8uW58Ng9YdPjxaGPWQogP2AJR-ZWPBo1CMD0lQLDeUtu5ksAKiCuYQe6m9k-W7PenIghBrDOX8dKNfKIphvOWcsTJh4dslbOisA1l5T7fJtGvJLz2AipPYkiw9Boj4UmqilwtoVvHYuWXTrYsCGLWUrfvRx1754BV3NUK0GsZz9vueJYh8m9027kEzDGcRDC3x_Wi5qipp9xOq7DdEOHhl0E3tqfi9MFrhQBzEHdZlJV7se7S73-',
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
      src: '/projects/get-better-together.png',
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
      src: '/projects/smart-portfolio-allocator.png',
      alt: 'Smart Portfolio Allocator interface showing strategy selection and share allocation breakdown.',
    },
  },
];
