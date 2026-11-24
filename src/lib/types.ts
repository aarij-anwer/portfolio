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
  /** Intrinsic pixel size; rendered as width/height attributes to prevent layout shift. */
  width?: number;
  height?: number;
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
  /** Descriptive page title for search results (falls back to `title`). */
  seoTitle?: string;
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

export type ResumeContactKind = 'location' | 'phone' | 'email' | 'linkedin' | 'github' | 'link';

export type ResumeContact = {
  kind: ResumeContactKind;
  label: string;
  href?: string;
  icon: string;
};

export type ResumeTextSegment = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

export type ResumeCompetency = {
  label: string;
  value: ResumeTextSegment[];
  icon: string;
};

export type ResumeExperience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: ResumeTextSegment[][];
  current?: boolean;
};

export type ResumeEducation = {
  /** Degree / diploma name. */
  credential: string;
  /** Institution name. */
  school: string;
  location: string;
};

export type ResumeSummary = {
  headline: string;
  paragraphs: ResumeTextSegment[][];
};

export type ParsedResume = {
  name: string;
  location: string;
  email: string;
  contact: ResumeContact[];
  summary: ResumeSummary;
  competencies: ResumeCompetency[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  interests: string[];
};
