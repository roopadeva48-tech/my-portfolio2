export enum SectionType {
  HOME = 'HOME',
  CERTIFICATE = 'CERTIFICATE',
  PROJECT = 'PROJECT',
  ROADMAP = 'ROADMAP',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export interface Milestone {
  title: string;
  date: string;
  completed: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  score: string;
  year?: string;
  imagePlaceholder: string;
}