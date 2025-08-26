export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  bulletPoints: string[];
  content?: string;
  detailedContent?: string;
  keyPoints?: string[];
  examples?: string[];
  statistics?: string[];
  imageQuery: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  layout: 'title' | 'content' | 'image' | 'split' | 'conclusion' | 'detailed' | 'comparison';
  backgroundColor?: string;
}

export interface Presentation {
  id: string;
  topic: string;
  style: PresentationStyle;
  slides: Slide[];
  createdAt: string;
}

export type PresentationStyle = 'professional' | 'minimal' | 'creative';

export interface APIResponse {
  slides: {
    title: string;
    subtitle?: string;
    bulletPoints: string[];
    content?: string;
    detailedContent?: string;
    keyPoints?: string[];
    examples?: string[];
    statistics?: string[];
    imageQuery: string;
    imageUrl?: string;
    secondaryImageUrl?: string;
    layout: 'title' | 'content' | 'image' | 'split' | 'conclusion' | 'detailed' | 'comparison';
    backgroundColor?: string;
  }[];
}
