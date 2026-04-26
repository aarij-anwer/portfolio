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
    'Software Engineer focused on architecting scalable systems and delivering intuitive, rapid user interfaces. Specialized in modern web technologies and cloud infrastructure.',
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
      'A collaborative learning platform designed to connect peers for study sessions and skill sharing. Built with real-time features and a highly scalable backend architecture to support concurrent users.',
    tags: ['React', 'Node.js', 'Socket.io'],
    href: '/projects/get-better-together',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrc_jCzWD-CVrnV9EGeafSQWkxgZxq-uptsHJwWayF4_Cof7qXD9k-1NCQokKpsfn97svZMOzeF_wMcvT9Pyd-hIQ1tVPEdoVemich8YZ2yxdbG303CGVGgmRByAUAlpoy71eAiVaesc-Qwv0GUKZxFA6R5amjdEyz0UdgZCvPtI5MxtPSxvfYmU4D-0I069f424ii9WinM66F9iGGbEPnWWeBTrtB2uaQr3E01l6pYDaLOFrrPaeamOPUL8ej0vPovZwZfMaWH3Cx',
      alt: 'Abstract data visualization dashboard with glowing blue lines on a dark background.',
    },
  },
  {
    slug: 'launchgood',
    title: 'LaunchGood',
    summary:
      'Crowdfunding platform specifically tailored for global communities. Involved optimizing the payment gateway integration and revamping the user dashboard for better campaign management.',
    tags: ['Next.js', 'TypeScript', 'Stripe API'],
    href: '/projects/launchgood',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvori9QWZo3Lv_pX8Sj8MaOpAsgu8Vvu5MoFYn-eJ6oD_Tk5WblYL8Of_SZtviuP0r-qbZLM71GlvouPnT4Y5ViH7f2WsncS1C67VMqU4LQD3mTw2y9G9AKi_7650zAh2r0Xi0M3oF_IJ3ORk6-luZsQTHDcxNapPBDCImbIPgqrJZM8N3fDaEEt3YAwYNe4-PutaGtgmRek-EpTXorXlqjzdDWzt7bPt3hhvHFYaHPnJNh6zxKux8qoGIJFVAnyUn8eHcVLX_MikO',
      alt: 'Diverse group of people collaborating around a table with a laptop.',
    },
  },
  {
    slug: 'esg-financed-emissions',
    title: 'ESG Financed Emissions',
    summary:
      'An enterprise-grade analytical tool to calculate and report financed emissions for financial institutions, ensuring compliance with global ESG standards and providing actionable insights.',
    tags: ['Python', 'Pandas', 'AWS'],
    href: '/projects/esg-financed-emissions',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_uaOUYZfFUhxfRN5WjwGCj5p8uW58Ng9YdPjxaGPWQogP2AJR-ZWPBo1CMD0lQLDeUtu5ksAKiCuYQe6m9k-W7PenIghBrDOX8dKNfKIphvOWcsTJh4dslbOisA1l5T7fJtGvJLz2AipPYkiw9Boj4UmqilwtoVvHYuWXTrYsCGLWUrfvRx1754BV3NUK0GsZz9vueJYh8m9027kEzDGcRDC3x_Wi5qipp9xOq7DdEOHhl0E3tqfi9MFrhQBzEHdZlJV7se7S73-',
      alt: 'Financial charts and graphs displayed on a modern dark interface.',
    },
  },
  {
    slug: 'stock-allocation-calculator',
    title: 'Stock Allocation Calculator',
    summary:
      'A fast, client-side utility for quick financial modeling and stock projection. Designed with a focus on immediate feedback, complex math visualization, and an extremely lightweight footprint.',
    tags: ['Vue.js', 'Tailwind CSS', 'Vite'],
    href: '/projects/stock-allocation-calculator',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7QTsKlHPEz5svlMjHPSJTl70K5mx29DZHwjhfVJJf97rXaV-UHCX9Vj9ClJsbW0OUmbs2u5rhU6F8AWNbbb148am6RnmIOdrKsBY3SO9XSKzWJ5xsusS_lJImwQCECuq7eCJ1j8msh5NwCyA_iaOnnEiIAWapxbTYfe4C7vUm2j_bIfLdPMS7G20RXnMU9W7kP56uhDhRvN40LrFnbBaJcbFi8x70V8203wV8O3DNzDoviqMW8y_9iIRbLC4geYHXIEUcMCJi8pE',
      alt: 'Minimalist stock market visuals against a black background.',
    },
  },
];

export const getBetterTogetherProject: ProjectDetail = {
  slug: 'get-better-together',
  title: 'Get Better Together',
  eyebrow: 'Back to Projects',
  summary:
    'A collaborative platform designed to help teams and individuals track progress, share goals, and build better habits through mutual accountability.',
  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaZh5lxqv_iUtpWys2baqsFeQlssLEYuzFICVaLZjw-RxcGioaiDYjlMC6yvqXsWutyfZUM385qczhovGtTVi3OwKKbvGngY74de5cX8h-wg4JQtpWaTLzSThrQq_g2f0_M4_fTXz4RhdJw51kb6QSv0LSrrjE6tuH6P0IfuEpiA7Tq0wGzbkuXsU4SXLet_o-7moG_1E9RieA2Nho-AK8QPw5ollCu7tldo--uyD1Wltm-XqLrwIvRKmxuqaW8LAG_8bFlVb2tHw7',
    alt: 'Dark collaborative dashboard shown across multiple screens.',
  },
  gallery: [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6169kciwx78GQZlKNt2dhxsY59ZVhmPHR-LUexZTHbyWjeldIsS4PcRelfXa-VjAHAFtTKjWZZV1ZdNqkzefzKusgKtuVo70cvIyGU0spQPk3AxqyDu9SN29udy1lD2QBOQP0X7MPFf9ATXyUi2DEtQbCth8BLzfs09d_ADIKbjtcfZUqpHkxmRlYZhPRVhqP5gLRVJxtZfss2_c00OBZaJiPYA_x7uNBviMTF3yqsrD2eq6SXRhGbaj_-bERQwX43mOYz7wHOxwD',
      alt: 'Gallery image one for Get Better Together.',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiX3IxHqjEGGLHNCLtoGdCHu9bar99Jy3dLUUI1BxWaGq83PWsvSqvK-gTDGImRYyh22NkBT4j5TKzemhAmveKJKP2sExusly80LL0WJF4bOQzBQt-nWjybUo0snptk0Lzi3qhOTBzxlDJMlDmRKnf712RN5-fp9usN0-aOUS64E6pzjJE6JCrk-7QWNy1Ij6j-cE9ztf3la-C_3PE8NqbBiquKTM4yxRRvr9es86qe58LxcofGxWCDSDRMMcjEA83sq918UYT85uQ',
      alt: 'Gallery image two for Get Better Together.',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSuT2ADu1C1ywJge3Jb-poex7KlylM1XnOemn48LHd9kMNSZmxQAcUfnxhrCqFT2G7szG9acHnMdjPsIk5PyiS1Kx3LCtkDIDIA2ZqTF-2VUWVaIveJvGCSoBAUiuX9HYgpWMBrfBlvJzNxDwK79GL9a2j0n2pgNLLskRZ8UKQN5HaczAbQhiXVeCOvXj31_n0tKC_H2d8u9KpbYHMOAhRKlIHeazHqNH5LNnnHBhp__sdR9j9YxezHask_VafrrjTrI4OjFdHxyPE',
      alt: 'Gallery image three for Get Better Together.',
    },
  ],
  overview: [
    'Get Better Together was architected as a real-time, event-driven application focused on high concurrency and low latency. The core challenge was synchronizing state across multiple clients instantly when collaborative goals were updated.',
    'We implemented a CQRS (Command Query Responsibility Segregation) pattern on the backend to separate read and write operations, allowing us to independently scale the real-time notification engine. The frontend leverages a robust state management solution paired with WebSockets to maintain a seamless, optimistic UI.',
  ],
  features: [
    {
      title: 'Real-time Sync',
      description:
        'Sub-50ms latency for cross-client state synchronization using optimized WebSocket payloads.',
      icon: 'bolt',
    },
    {
      title: 'Event Sourcing',
      description:
        'Immutable audit log of all user actions to enable complex undo operations and historical analytics.',
      icon: 'database',
    },
  ],
  metrics: [
    'Achieved 99.9% uptime over the first 6 months post-launch, handling over 10,000 concurrent users.',
    'Reduced API response times by 40% through aggressive Redis caching strategies.',
    'Increased user engagement by 25% after introducing the real-time notification system.',
  ],
  techStack: [
    { label: 'Frontend', items: ['React', 'TypeScript', 'Zustand'] },
    { label: 'Backend', items: ['Node.js', 'PostgreSQL', 'Redis'] },
    { label: 'Infrastructure', items: ['AWS', 'Docker'] },
  ],
  actions: [
    { label: 'View Live Site', href: '#', variant: 'primary' },
    { label: 'Source Code', href: '#', variant: 'secondary' },
  ],
};
