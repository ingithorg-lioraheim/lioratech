export interface PlaybookFeature {
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  WHY_US = 'why-us',
  PROCESS = 'process',
  PLAYBOOK = 'playbook',
  CONSULTATION = 'consultation',
  NEWSLETTER = 'newsletter'
}