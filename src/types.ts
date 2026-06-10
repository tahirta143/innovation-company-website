export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: string;
  tags: string[];
  challenge: string;
  solution: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  points: string[];
}
