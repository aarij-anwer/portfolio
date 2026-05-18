import type { ParsedResume, ResumeTextSegment } from "@/lib/types";

const text = (value: string): ResumeTextSegment[] => [{ text: value }];
const mixed = (...segments: ResumeTextSegment[]): ResumeTextSegment[] => segments;
const plain = (value: string): ResumeTextSegment => ({ text: value });
const bold = (value: string): ResumeTextSegment => ({ text: value, bold: true });

export const defaultResume: ParsedResume = {
  name: "Muhammad Anwer",
  contact: [
    { label: "647-779-0703", icon: "phone" },
    { label: "maanwer0@gmail.com", href: "mailto:maanwer0@gmail.com", icon: "mail" },
    { label: "m-a-anwer", href: "https://www.linkedin.com/in/m-a-anwer", icon: "open_in_new" },
    { label: "aarij-anwer", href: "https://github.com/aarij-anwer", icon: "open_in_new" },
  ],
  competencies: [
    {
      label: "Engineering Leadership",
      value: text(
        "System design (RFCs), design reviews, product/engineering collaboration, analytics instrumentation (Heap), roadmap input, code reviews, mentoring distributed teams",
      ),
      icon: "psychology",
    },
    {
      label: "Languages",
      value: text("TypeScript, JavaScript, Python, SQL"),
      icon: "code",
    },
    {
      label: "Frameworks & Libraries",
      value: text("React, Redux, NestJS, Next.js, Vite, Prisma, Tailwind CSS, Jest, React Testing Library, Scikit-learn"),
      icon: "layers",
    },
    {
      label: "Architecture & Systems",
      value: text("Microservices, event-driven systems, RabbitMQ, REST/OpenAPI (contract-first APIs), type-safe clients, cross-service integration"),
      icon: "architecture",
    },
    {
      label: "Reliability & Operations",
      value: text("Incident management, production triage and mitigation, root cause analysis (RCA), runbooks, post-incident hardening, on-call rotations, Datadog (logs, monitors)"),
      icon: "monitoring",
    },
    {
      label: "Cloud & DevOps",
      value: text("AWS, Docker, Git, GitHub Actions, CI/CD, monitoring and alerting"),
      icon: "cloud",
    },
    {
      label: "ML & AI",
      value: text("TensorFlow, PyTorch, Langbase, Agentic workflows (OpenAI, Cursor, Cleric, Mendral)"),
      icon: "generative_ai",
    },
  ],
  experience: [
    {
      role: "Senior Software Engineer (Contract)",
      companyLine: "ESGTree | Remote | Aug 2025 - Present",
      current: true,
      bullets: [
        mixed(plain("Ship full-stack features and lead product engineering for emissions calculations software for banks, portfolio managers and their clients. Stack: "), bold("Vite (React)"), plain(", "), bold("Tailwind CSS"), plain(", "), bold("NestJS"), plain(" and "), bold("Drizzle/PostgreSQL"), plain(".")),
        mixed(bold("0 -> 1 MVP and pilot win"), plain(": led full AI-driven development of a full-stack MVP from prototype to production in under 4 weeks, guiding a team of 2 engineers and owning architecture and delivery. Made deliberate tradeoffs to prioritize speed and validation. The product won a competitive vendor demo with Desjardins, securing a paid pilot with onboarding in progress.")),
        mixed(bold("End-to-end system ownership"), plain(": designed backend services, data models, and APIs while contributing across the stack. Coordinated execution, reviewed PRs, and unblocked engineers to maintain velocity under tight timelines. Partnered closely with stakeholders to iterate quickly on product requirements.")),
        mixed(bold("Refactor for scale and long-term maintainability"), plain(": after validating product-market fit, led a backend refactor (migration to NestJS) to introduce modular architecture, enforce clear boundaries, and improve reliability and data integrity - transitioning the system from rapid prototype to production-grade platform.")),
      ],
    },
    {
      role: "Full Stack Software Engineer",
      companyLine: "LaunchGood | Remote | Jul 2022 - Present",
      current: true,
      bullets: [
        mixed(plain("Ship full-stack features for a fundraising marketplace connecting fundraisers and donors. Stack: "), bold("Next.js (React)"), plain(", "), bold("Redux"), plain(", "), bold("Tailwind CSS"), plain(", "), bold("NestJS"), plain(", "), bold("Prisma/PostgreSQL"), plain(", and "), bold("RabbitMQ"), plain(".")),
        mixed(bold("Guest checkout for subscriptions"), plain(": delivered end-to-end in one week (leadership priority). Built with Next.js, Redux, Tailwind, and NestJS to support subscription creation and one-click account completion. Identified security vulnerabilities in the initial proposal and implemented safer alternatives. After launch, over 50% of new subscribers used guest checkout, improving conversions by ~40%.")),
        mixed(bold("Multi-step subscription onboarding funnels"), plain(": implemented across all subscription programs in Next.js with Redux. Set technical direction with product, reviewed PRs, refactored legacy flows, and shipped reusable UI components with test coverage (Jest, React Testing Library). Improved performance using an app-shell pattern combining a client-side interactive shell with server-side layouts for fast initial loads.")),
        mixed(bold("Public profiles for partners and influencers"), plain(": built a social media-style, follower-facing experience in Next.js with a companion admin dashboard for engagement and audience insights. Led end-to-end delivery, including a NestJS backend, database schema, and REST APIs, with automated tests covering critical paths.")),
        mixed(bold("Recurring fundraising for charities"), plain(": improved information architecture and navigation so organizers can manage recurring programs with clarity and minimal friction. Built reusable Next.js components and dashboard-style views surfacing status, configuration, and key metrics at a glance, backed by automated tests.")),
        mixed(bold("Incident management and on-call troubleshooting"), plain(": led production incident response using Datadog and AWS to triage, reproduce, and isolate root causes. Resolved unstable behavior, runtime errors, redirect loops, fragile API handling, and weak user-facing error paths; validated fixes in staging and monitored post-release. Authored runbooks and led retrospectives to standardize mitigation and improve processes.")),
        mixed(bold("Retool dashboards for operations and on-call"), plain(": built and adopted without a formal request. Delivered a donor lookup console aggregating transactions, subscriptions, and failed charges with recharge actions across multiple data sources. Shipped a scheduled-giving dashboard with daily KPIs and hourly breakdowns (scheduled/processing/succeeded/failed, USD impact) to quickly identify spikes and triage billing issues.")),
        mixed(bold("Product analytics instrumentation (Heap)"), plain(": defined and implemented end-to-end tracking for funnels, key actions, and failure points under a consistent event model. Partnered with product on measurement strategy, implemented tracking in code, and used data to validate launches and feature performance.")),
        mixed(bold("RFCs, design reviews, and monorepo releases"), plain(": contributed to system design, upheld a high bar in code reviews, and coordinated CI-gated releases via GitHub Actions. Mitigated regression risk by driving risk-aware decisions (including reverts) to restore stability while planning safer follow-ups.")),
      ],
    },
    {
      role: "Owner, E-Commerce Ventures",
      companyLine: "Self-employed | Remote | Jan 2010 - Dec 2019",
      bullets: [
        text("Bootstrapped and scaled two online ventures: an e-learning platform and an Amazon FBA storefront."),
        mixed(bold("Product and growth"), plain(": built and marketed digital products and physical goods, acquiring and retaining a global customer base.")),
        mixed(bold("Operations and ownership"), plain(": managed suppliers, inventory, content, and P&L across both ventures, leading to a successful exit with ongoing royalty income.")),
      ],
    },
  ],
  education: [
    {
      school: "Honours Bachelor of Computer Science",
      credential: "University of Waterloo",
      details: "Waterloo ON",
    },
    {
      school: "Graduate Certificate in AI & Machine Learning",
      credential: "Fanshawe College",
      details: "London ON",
    },
    {
      school: "Full-Stack Web Development Diploma",
      credential: "Lighthouse Labs",
      details: "Online",
    },
  ],
  interests: [
    "Personal interests: badminton, basketball, swimming, strength training, parenting, finance, history",
    "Founder & President, London Badminton Club (2022-Present) - organize weekly sessions and local tournaments",
  ],
};
