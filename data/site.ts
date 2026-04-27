export type NavLink = {
  label: string;
  href: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type Competency = {
  title: string;
  description?: string;
  icon: string;
  tags?: string[];
  wide?: boolean;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  image: ImageAsset;
  href?: string;
};

export type ProjectFeature = {
  title: string;
  description: string;
  icon: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  overview: string[];
  features: ProjectFeature[];
  metrics: string[];
  techStack: Array<{
    label: string;
    items: string[];
  }>;
  actions: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
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
    'Full-stack engineer focused on building high-impact products: from rapid 0→1 MVPs to scalable, production systems. I combine product thinking, strong systems design, and execution speed to deliver meaningful results.”',
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

export const projects: ProjectSummary[] = [
  {
    slug: 'get-better-together',
    title: 'Get Better Together',
    summary:
      'A social fitness challenge app designed to drive long-term consistency through accountability and competition. Users create private challenges, invite friends, track daily progress, maintain streaks, and compete via real-time leaderboards. Features guest onboarding (no signup), smart backlog filling, and a mobile-first UX to minimize friction and maximize engagement.',
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Product Design',
      'Buildathon',
    ],
    href: '/projects/get-better-together',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrc_jCzWD-CVrnV9EGeafSQWkxgZxq-uptsHJwWayF4_Cof7qXD9k-1NCQokKpsfn97svZMOzeF_wMcvT9Pyd-hIQ1tVPEdoVemich8YZ2yxdbG303CGVGgmRByAUAlpoy71eAiVaesc-Qwv0GUKZxFA6R5amjdEyz0UdgZCvPtI5MxtPSxvfYmU4D-0I069f424ii9WinM66F9iGGbEPnWWeBTrtB2uaQr3E01l6pYDaLOFrrPaeamOPUL8ej0vPovZwZfMaWH3Cx',
      alt: 'Social fitness challenge dashboard with streak tracking and leaderboards.',
    },
  },
  {
    slug: 'launchgood',
    title: 'LaunchGood',
    summary:
      'A global fundraising platform where I ship full-stack features across high-scale donation and subscription systems. Delivered a guest checkout for subscriptions end-to-end in one week, driving a 40% increase in successful subscriptions. Built multi-step onboarding funnels, recurring giving dashboards, and partner-facing public profiles, while leading incident response and improving reliability across a microservices architecture.',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Redux',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'AWS',
      'Microservices',
      'Event-driven Systems',
      'Incident Management',
      'Product Analytics',
    ],
    href: '/projects/launchgood',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
      alt: 'Fundraising platform dashboard with campaigns and donation analytics.',
    },
  },
  {
    slug: 'esg-financed-emissions',
    title: 'ESG Financed Emissions',
    summary:
      'An enterprise platform for calculating and reporting financed emissions for financial institutions. Led 0→1 development of an AI-assisted MVP in under 4 weeks, winning a competitive pilot with Desjardins. Designed backend services, APIs, and data models, then led a refactor to a modular NestJS architecture to support scalability, reliability, and long-term maintainability.',
    tags: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'NestJS',
      'PostgreSQL',
      'Drizzle ORM',
      'System Design',
      'Product Engineering',
      'AI-assisted Development',
    ],
    href: '/projects/esg-financed-emissions',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_uaOUYZfFUhxfRN5WjwGCj5p8uW58Ng9YdPjxaGPWQogP2AJR-ZWPBo1CMD0lQLDeUtu5ksAKiCuYQe6m9k-W7PenIghBrDOX8dKNfKIphvOWcsTJh4dslbOisA1l5T7fJtGvJLz2AipPYkiw9Boj4UmqilwtoVvHYuWXTrYsCGLWUrfvRx1754BV3NUK0GsZz9vueJYh8m9027kEzDGcRDC3x_Wi5qipp9xOq7DdEOHhl0E3tqfi9MFrhQBzEHdZlJV7se7S73-',
      alt: 'Enterprise analytics dashboard for emissions and financial data.',
    },
  },
  {
    slug: 'smart-portfolio-allocator',
    title: 'Smart Portfolio Allocator',
    summary:
      'An interactive portfolio allocation tool that helps users model and optimize investment strategies across assets with instant feedback. Users can adjust allocations, evaluate trade-offs, and understand portfolio behavior in real time through a fast, client-rendered experience. Built with Next.js for performance and clarity, enabling rapid experimentation and intuitive financial decision-making.',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Financial Modeling',
      'Client-side Performance',
    ],
    href: '/projects/smart-portfolio-allocator',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7QTsKlHPEz5svlMjHPSJTl70K5mx29DZHwjhfVJJf97rXaV-UHCX9Vj9ClJsbW0OUmbs2u5rhU6F8AWNbbb148am6RnmIOdrKsBY3SO9XSKzWJ5xsusS_lJImwQCECuq7eCJ1j8msh5NwCyA_iaOnnEiIAWapxbTYfe4C7vUm2j_bIfLdPMS7G20RXnMU9W7kP56uhDhRvN40LrFnbBaJcbFi8x70V8203wV8O3DNzDoviqMW8y_9iIRbLC4geYHXIEUcMCJi8pE',
      alt: 'Interactive portfolio allocation tool with real-time projections.',
    },
  },
];

export const getBetterTogetherProject: ProjectDetail = {
  slug: 'get-better-together',
  title: 'Get Better Together',
  eyebrow: 'Back to Projects',
  summary:
    'A social fitness challenge app focused on helping users stay consistent through accountability, competition, and shared progress.',
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
    'Get Better Together was built to solve a simple but persistent problem: people struggle to stay consistent when working alone. The app introduces social accountability through shared challenges, leaderboards, and visible progress.',
    'The focus was on reducing friction — users can join challenges instantly via invite links, log activity quickly, and track progress in real time. The experience is mobile-first and optimized for fast interactions.',
  ],
  features: [
    {
      title: 'Private Challenges',
      description:
        'Create time-bound challenges and invite friends via simple shareable links.',
      icon: 'users',
    },
    {
      title: 'Progress & Streak Tracking',
      description:
        'Track daily progress, maintain streaks, and visualize consistency over time.',
      icon: 'chart-line',
    },
    {
      title: 'Leaderboards',
      description:
        'Compete with others in real time to stay motivated and accountable.',
      icon: 'trophy',
    },
    {
      title: 'Guest Mode',
      description:
        'Join challenges instantly without signup to minimize onboarding friction.',
      icon: 'zap',
    },
  ],
  metrics: [
    'Designed and built end-to-end in a rapid iteration cycle, validating core product assumptions quickly.',
    'Reduced onboarding friction through guest mode, enabling instant participation via invite links.',
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
    'A global fundraising platform powering donations and recurring giving at scale.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
    alt: 'LaunchGood dashboard.',
  },
  gallery: [],
  overview: [
    'At LaunchGood, I ship full-stack features across high-scale donation and subscription systems used globally.',
    'A key initiative was delivering a guest checkout for subscriptions in one week — reducing friction and driving a 40% increase in successful subscriptions.',
  ],
  features: [
    {
      title: 'Guest Checkout for Subscriptions',
      description:
        'Enabled users to subscribe without account creation, with seamless post-donation onboarding.',
      icon: 'credit-card',
    },
    {
      title: 'Recurring Giving Systems',
      description:
        'Built dashboards and flows to manage subscription-based donations at scale.',
      icon: 'repeat',
    },
    {
      title: 'Incident Response',
      description:
        'Led production debugging and reliability improvements across distributed services.',
      icon: 'activity',
    },
  ],
  metrics: [
    'Drove a 40% increase in successful subscriptions through guest checkout.',
    'Shipped high-impact features across a global platform handling large-scale traffic.',
  ],
  techStack: [
    { label: 'Frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind CSS'] },
    { label: 'Backend', items: ['NestJS', 'Prisma', 'PostgreSQL'] },
    { label: 'Infrastructure', items: ['AWS', 'RabbitMQ'] },
  ],
  actions: [],
};

export const esgProject: ProjectDetail = {
  slug: 'esg-financed-emissions',
  title: 'ESG Financed Emissions',
  eyebrow: 'Back to Projects',
  summary:
    'An enterprise platform for calculating and reporting financed emissions for financial institutions, built from 0→1 and scaled into a production-ready system.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_uaOUYZfFUhxfRN5WjwGCj5p8uW58Ng9YdPjxaGPWQogP2AJR-ZWPBo1CMD0lQLDeUtu5ksAKiCuYQe6m9k-W7PenIghBrDOX8dKNfKIphvOWcsTJh4dslbOisA1l5T7fJtGvJLz2AipPYkiw9Boj4UmqilwtoVvHYuWXTrYsCGLWUrfvRx1754BV3NUK0GsZz9vueJYh8m9027kEzDGcRDC3x_Wi5qipp9xOq7DdEOHhl0E3tqfi9MFrhQBzEHdZlJV7se7S73-',
    alt: 'Enterprise analytics dashboard for financed emissions reporting.',
  },
  gallery: [],
  overview: [
    'This project focused on building an enterprise-grade platform to calculate and report financed emissions for financial institutions, aligning with emerging ESG reporting standards.',
    'I led the development of the product from an early prototype to a production-ready MVP in under 4 weeks, prioritizing speed, validation, and iterative delivery. The system was designed to handle complex financial data modeling and emissions calculations across portfolios.',
    'After securing a pilot, I led a backend refactor to NestJS, introducing a modular architecture with clear service boundaries, improved data integrity, and a foundation for long-term scalability.',
  ],
  features: [
    {
      title: 'Emissions Calculation Engine',
      description:
        'Designed and implemented backend services to compute financed emissions across financial portfolios based on configurable inputs and methodologies.',
      icon: 'cpu',
    },
    {
      title: '0→1 MVP Delivery',
      description:
        'Took the product from prototype to production-ready MVP in under 4 weeks, balancing speed with architectural soundness.',
      icon: 'rocket',
    },
    {
      title: 'Modular Backend Architecture',
      description:
        'Refactored the backend to NestJS, introducing modular services, clearer boundaries, and improved maintainability.',
      icon: 'layers',
    },
    {
      title: 'Full-stack Ownership',
      description:
        'Designed APIs, data models, and frontend interfaces while coordinating execution and guiding implementation.',
      icon: 'layout',
    },
  ],
  metrics: [
    'Delivered a production-ready MVP in under 4 weeks from an early prototype.',
    'Won a competitive vendor demo, securing a paid pilot with a major financial institution.',
    'Led backend refactor to transition from rapid prototype to scalable production architecture.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['NestJS', 'PostgreSQL', 'Drizzle ORM'],
    },
    {
      label: 'Focus',
      items: [
        'System Design',
        'Product Engineering',
        'Enterprise Software',
        'AI-assisted Development',
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
    'An interactive tool for modeling and optimizing portfolio allocations with real-time feedback.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7QTsKlHPEz5svlMjHPSJTl70K5mx29DZHwjhfVJJf97rXaV-UHCX9Vj9ClJsbW0OUmbs2u5rhU6F8AWNbbb148am6RnmIOdrKsBY3SO9XSKzWJ5xsusS_lJImwQCECuq7eCJ1j8msh5NwCyA_iaOnnEiIAWapxbTYfe4C7vUm2j_bIfLdPMS7G20RXnMU9W7kP56uhDhRvN40LrFnbBaJcbFi8x70V8203wV8O3DNzDoviqMW8y_9iIRbLC4geYHXIEUcMCJi8pE',
    alt: 'Portfolio allocation interface.',
  },
  gallery: [],
  overview: [
    'Built as a fast, client-side tool to help users experiment with portfolio allocations and understand trade-offs instantly.',
    'Focused on performance and clarity, enabling rapid iteration without backend dependencies.',
  ],
  features: [
    {
      title: 'Real-time Calculations',
      description: 'Instant feedback as users adjust portfolio allocations.',
      icon: 'zap',
    },
    {
      title: 'Interactive Modeling',
      description:
        'Explore different strategies and visualize outcomes dynamically.',
      icon: 'bar-chart',
    },
  ],
  metrics: [
    'Designed for instant feedback with fully client-side computation.',
  ],
  techStack: [
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
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
