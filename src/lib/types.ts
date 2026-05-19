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

export type ResumeContact = {
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
  companyLine: string;
  bullets: ResumeTextSegment[][];
  current?: boolean;
};

export type ResumeEducation = {
  school: string;
  credential: string;
  details: string;
};

export type ParsedResume = {
  name: string;
  contact: ResumeContact[];
  competencies: ResumeCompetency[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  interests: string[];
};

export interface ProjectLinksProps {
  currentSlug: string;
  className?: string;
}
