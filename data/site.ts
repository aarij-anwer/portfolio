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
  portrait: {
    src: '/C1F0A34C-22D0-425C-9909-2A768B9C1864_1_105_c.jpeg',
    alt: 'Muhammad Anwer',
  },
  competencies: [
    {
      title: 'Engineering Leadership',
      description:
        'Mentoring teams, establishing best practices, and driving technical vision from conception to deployment.',
      icon: 'psychology',
    },
    {
      title: 'Languages',
      icon: 'code_blocks',
      tags: ['TypeScript', 'Python', 'Go'],
    },
    {
      title: 'Frameworks & Libraries',
      icon: 'layers',
      tags: ['React', 'Next.js', 'Tailwind CSS'],
    },
    {
      title: 'Architecture & Systems',
      description:
        'Designing resilient, microservices-based architectures and scalable data pipelines for high-traffic applications.',
      icon: 'architecture',
      wide: true,
    },
    {
      title: 'Cloud & DevOps',
      icon: 'cloud',
      tags: ['AWS', 'Docker', 'CI/CD'],
    },
  ] satisfies Competency[],
};

export const getBetterTogetherProject: ProjectDetail = {
  slug: 'get-better-together',
  title: 'Get Better Together',
  eyebrow: 'Back to Projects',
  summary:
    'A social fitness app that helps you stay accountable with friends through shared challenges, streak tracking, and friendly competition.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaZh5lxqv_iUtpWys2baqsFeQlssLEYuzFICVaLZjw-RxcGioaiDYjlMC6yvqXsWutyfZUM385qczhovGtTVi3OwKKbvGngY74de5cX8h-wg4JQtpWaTLzSThrQq_g2f0_M4_fTXz4RhdJw51kb6QSv0LSrrjE6tuH6P0IfuEpiA7Tq0wGzbkuXsU4SXLet_o-7moG_1E9RieA2Nho-AK8QPw5ollCu7tldo--uyD1Wltm-XqLrwIvRKmxuqaW8LAG_8bFlVb2tHw7',
    alt: 'Get Better Together dashboard showing challenges and progress tracking.',
  },
  gallery: [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6169kciwx78GQZlKNt2dhxsY59ZVhmPHR-LUexZTHbyWjeldIsS4PcRelfXa-VjAHAFtTKjWZZV1ZdNqkzefzKusgKtuVo70cvIyGU0spQPk3AxqyDu9SN29udy1lD2QBOQP0X7MPFf9ATXyUi2DEtQbCth8BLzfs09d_ADIKbjtcfZUqpHkxmRlYZhPRVhqP5gLRVJxtZfss2_c00OBZaJiPYA_x7uNBviMTF3yqsrD2eq6SXRhGbaj_-bERQwX43mOYz7wHOxwD',
      alt: 'Challenge overview screen.',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiX3IxHqjEGGLHNCLtoGdCHu9bar99Jy3dLUUI1BxWaGq83PWsvSqvK-gTDGImRYyh22NkBT4j5TKzemhAmveKJKP2sExusly80LL0WJF4bOQzBQt-nWjybUo0snptk0Lzi3qhOTBzxlDJMlDmRKnf712RN5-fp9usN0-aOUS64E6pzjJE6JCrk-7QWNy1Ij6j-cE9ztf3la-C_3PE8NqbBiquKTM4yxRRvr9es86qe58LxcofGxWCDSDRMMcjEA83sq918UYT85uQ',
      alt: 'Leaderboard and streak tracking.',
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
  eyebrow: 'Back to Projects',
  summary:
    'A global fundraising marketplace connecting fundraisers and donors, powering donations and recurring giving at scale.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
    alt: 'LaunchGood dashboard.',
  },
  gallery: [],
  overview: [
    'At LaunchGood, I ship full-stack features for a global fundraising marketplace. A key leadership priority was delivering a guest checkout for subscriptions end-to-end in one week. During this, I identified security vulnerabilities in the initial proposal and implemented safer alternatives. After launch, over 50% of new subscribers used guest checkout, improving conversions by ~40%.',
    'I led the technical direction for multi-step subscription funnels, utilizing an app-shell pattern for performance, and built follower-facing public profiles with companion admin dashboards backed by NestJS and REST APIs.',
    'Beyond feature development, I drove operational improvements by proactively building custom Retool dashboards for on-call triage, defining end-to-end Heap product analytics, and leading incident response and system design reviews across the platform.',
  ],
  features: [
    {
      title: 'Guest Checkout & Onboarding Funnels',
      description:
        'Delivered guest checkout in one week, securing vulnerabilities. Implemented multi-step funnels with Next.js and Redux, improving load times via an app-shell pattern.',
      icon: 'credit-card',
    },
    {
      title: 'Public Profiles & Recurring Dashboards',
      description:
        'Built social media–style public profiles and dashboard views for charities to manage recurring programs, fully backed by automated tests and REST APIs.',
      icon: 'users',
    },
    {
      title: 'Proactive Operational Tooling (Retool)',
      description:
        'Built internal dashboards without formal request, delivering a donor lookup console and scheduled-giving KPIs to identify spikes and triage billing issues.',
      icon: 'layout',
    },
    {
      title: 'Incident Response & System Design',
      description:
        'Led production triage using Datadog and AWS, authored runbooks to standardize mitigation, and contributed to system design via RFCs.',
      icon: 'activity',
    },
  ],
  metrics: [
    'Delivered an end-to-end subscription guest checkout in 1 week (leadership priority).',
    'Improved subscription conversions by ~40%, with >50% of new subscribers utilizing guest checkout.',
    'Coordinated CI-gated monorepo releases and mitigated regression risks through rigorous design and code reviews.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: [
        'Next.js (React)',
        'Redux',
        'Tailwind CSS',
        'Jest',
        'React Testing Library',
      ],
    },
    {
      label: 'Backend',
      items: ['NestJS', 'Prisma', 'PostgreSQL', 'REST APIs'],
    },
    {
      label: 'Infrastructure & Ops',
      items: ['AWS', 'RabbitMQ', 'Datadog', 'GitHub Actions'],
    },
    { label: 'Tools', items: ['Heap Analytics', 'Retool'] },
  ],
  actions: [],
};

export const esgProject: ProjectDetail = {
  slug: 'esg-financed-emissions',
  title: 'ESGTree Financed Emissions',
  eyebrow: 'Back to Projects',
  summary:
    'An enterprise platform for calculating and reporting financed emissions for banks, portfolio managers and their clients.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_uaOUYZfFUhxfRN5WjwGCj5p8uW58Ng9YdPjxaGPWQogP2AJR-ZWPBo1CMD0lQLDeUtu5ksAKiCuYQe6m9k-W7PenIghBrDOX8dKNfKIphvOWcsTJh4dslbOisA1l5T7fJtGvJLz2AipPYkiw9Boj4UmqilwtoVvHYuWXTrYsCGLWUrfvRx1754BV3NUK0GsZz9vueJYh8m9027kEzDGcRDC3x_Wi5qipp9xOq7DdEOHhl0E3tqfi9MFrhQBzEHdZlJV7se7S73-',
    alt: 'Enterprise analytics dashboard for financed emissions reporting.',
  },
  gallery: [],
  overview: [
    'At ESGTree, I ship full-stack features and lead product engineering for emissions calculations software for banks, portfolio managers and their clients.',
    'I led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks, guiding a team of 2 engineers and owning architecture and delivery. I made deliberate tradeoffs to prioritize speed and validation. The product won a competitive vendor demo with Desjardins, securing a paid pilot with onboarding in progress.',
    'After validating product-market fit, I led a backend refactor (migration to NestJS) to introduce modular architecture, enforce clear boundaries, and improve reliability and data integrity — transitioning the system from rapid prototype to production-grade platform.',
  ],
  features: [
    {
      title: 'AI-Driven 0→1 MVP Delivery',
      description:
        'Led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks, making deliberate tradeoffs to prioritize speed and validation.',
      icon: 'rocket',
    },
    {
      title: 'End-to-End System Ownership',
      description:
        'Designed backend services, data models, and APIs while contributing across the stack.',
      icon: 'cpu',
    },
    {
      title: 'Modular Backend Architecture',
      description:
        'Led a backend refactor to NestJS to introduce modular architecture, enforce clear boundaries, and improve reliability and data integrity.',
      icon: 'layers',
    },
    {
      title: 'Full-stack Leadership',
      description:
        'Coordinated execution, reviewed PRs, and unblocked engineers to maintain velocity under tight timelines. Partnered closely with stakeholders to iterate quickly on product requirements.',
      icon: 'layout',
    },
  ],
  metrics: [
    'Led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks.',
    'Won a competitive vendor demo with Desjardins, securing a paid pilot with onboarding in progress.',
    'Transitioned the system from a rapid prototype to a production-grade platform by leading a NestJS backend refactor.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['Vite (React)', 'TypeScript', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['NestJS', 'Drizzle', 'PostgreSQL'],
    },
    {
      label: 'Focus',
      items: [
        'System Design',
        'Product Engineering',
        'Enterprise Software',
        'AI-driven Development',
      ],
    },
  ],
  actions: [],
};

export const portfolioProject: ProjectDetail = {
  slug: 'smart-portfolio-allocator',
  title: 'Smart Portfolio Allocator',
  eyebrow: 'Back to Projects',
  summary:
    'An intelligent allocation tool designed for Canadian investors to maximize every dollar of their monthly budget for DCA and ETF portfolio building.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7QTsKlHPEz5svlMjHPSJTl70K5mx29DZHwjhfVJJf97rXaV-UHCX9Vj9ClJsbW0OUmbs2u5rhU6F8AWNbbb148am6RnmIOdrKsBY3SO9XSKzWJ5xsusS_lJImwQCECuq7eCJ1j8msh5NwCyA_iaOnnEiIAWapxbTYfe4C7vUm2j_bIfLdPMS7G20RXnMU9W7kP56uhDhRvN40LrFnbBaJcbFi8x70V8203wV8O3DNzDoviqMW8y_9iIRbLC4geYHXIEUcMCJi8pE',
    alt: 'Portfolio allocation interface.',
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
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrc_jCzWD-CVrnV9EGeafSQWkxgZxq-uptsHJwWayF4_Cof7qXD9k-1NCQokKpsfn97svZMOzeF_wMcvT9Pyd-hIQ1tVPEdoVemich8YZ2yxdbG303CGVGgmRByAUAlpoy71eAiVaesc-Qwv0GUKZxFA6R5amjdEyz0UdgZCvPtI5MxtPSxvfYmU4D-0I069f424ii9WinM66F9iGGbEPnWWeBTrtB2uaQr3E01l6pYDaLOFrrPaeamOPUL8ej0vPovZwZfMaWH3Cx',
      alt: 'Get Better Together dashboard showing challenges and progress tracking.',
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
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7QTsKlHPEz5svlMjHPSJTl70K5mx29DZHwjhfVJJf97rXaV-UHCX9Vj9ClJsbW0OUmbs2u5rhU6F8AWNbbb148am6RnmIOdrKsBY3SO9XSKzWJ5xsusS_lJImwQCECuq7eCJ1j8msh5NwCyA_iaOnnEiIAWapxbTYfe4C7vUm2j_bIfLdPMS7G20RXnMU9W7kP56uhDhRvN40LrFnbBaJcbFi8x70V8203wV8O3DNzDoviqMW8y_9iIRbLC4geYHXIEUcMCJi8pE',
      alt: 'Portfolio allocation interface.',
    },
  },
];
