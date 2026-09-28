export type CloneId = 
  | 'natural-scene-bd'
  | 'ai-persona-clone'
  | 'ecommerce-clone'
  | 'social-clone'
  | 'kanban-clone'
  | 'instant-cloner';

export interface CloneMeta {
  id: CloneId;
  name: string;
  tagline: string;
  category: string;
  iconName: string;
  badge?: string;
  description: string;
}

export interface NaturalSpot {
  id: string;
  name: string;
  bengaliName: string;
  region: string;
  category: 'Beach' | 'Hill' | 'Forest' | 'River' | 'Haor';
  image: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  entryFee: string;
  rating: number;
  reviewsCount: number;
  latitude: number;
  longitude: number;
}

export interface AIPersona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  voiceType: 'Natural Warm' | 'Analytical Crisp' | 'Deep Storyteller' | 'Friendly Enthusiastic';
  pitch: number;
  speed: number;
  personality: string[];
  systemPrompt: string;
  sampleResponses: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  description: string;
  inStock: boolean;
  tag?: string;
}

export interface SocialPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: string;
  };
  image?: string;
  content: string;
  timestamp: string;
  likes: number;
  likedByMe?: boolean;
  commentsCount: number;
  shares: number;
  tags: string[];
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  column: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  tags: string[];
}
