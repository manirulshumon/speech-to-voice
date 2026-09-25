import { NaturalSpot, AIPersona, ProductItem, SocialPost, KanbanTask, CloneMeta } from '../types';

export const CLONES_LIST: CloneMeta[] = [
  {
    id: 'natural-scene-bd',
    name: 'Natural Scene BD',
    tagline: 'Bangladesh Nature & Eco-Tourism Explorer',
    category: 'Travel & Nature',
    iconName: 'Palmtree',
    badge: 'Creator Match',
    description: 'Explore breathtaking scenic rivers, mangrove forests, tea hills, and serene beaches of Bangladesh with audio soundscapes.'
  },
  {
    id: 'instant-cloner',
    name: 'App Cloner Studio',
    tagline: 'Replicate & Clone Any Web App / URL',
    category: 'Developer Tool',
    iconName: 'Copy',
    badge: 'Engine',
    description: 'Clone applications from URL or prompt, inspect component hierarchy, view generated TSX/Tailwind code, and export.'
  },
  {
    id: 'ai-persona-clone',
    name: 'AI Persona & Voice Clone',
    tagline: 'Digital Twin & Persona Synthesizer',
    category: 'AI & Voice',
    iconName: 'Bot',
    badge: 'Interactive',
    description: 'Synthesize custom digital personas with voice tone, pitch, custom memory, and conversational intelligence.'
  },
  {
    id: 'ecommerce-clone',
    name: 'NovaStore Marketplace',
    tagline: 'High-Performance E-Commerce Experience',
    category: 'Store & Shop',
    iconName: 'ShoppingBag',
    description: 'Full-featured online store clone with product filtering, dynamic cart drawer, discount vouchers, and checkout.'
  },
  {
    id: 'social-clone',
    name: 'Pulse Social Feed',
    tagline: 'Modern Community & Story Platform',
    category: 'Social Media',
    iconName: 'MessageSquareShare',
    description: 'Instagram/Threads styled feed with interactive stories, likes, comment threads, and post creator.'
  },
  {
    id: 'kanban-clone',
    name: 'TaskFlow SaaS Dashboard',
    tagline: 'Agile Kanban & Sprint Analytics',
    category: 'Productivity',
    iconName: 'LayoutDashboard',
    description: 'Complete agile project board with drag columns, task prioritization, sprint metrics, and team collaboration.'
  }
];

export const NATURAL_SPOTS: NaturalSpot[] = [
  {
    id: 'sundarbans',
    name: 'Sundarbans Mangrove Forest',
    bengaliName: 'সুন্দরবন ম্যানগ্রোভ বন',
    region: 'Khulna & Bagerhat',
    category: 'Forest',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    description: 'The largest contiguous mangrove forest on Earth, UNESCO World Heritage site and home to the Royal Bengal Tiger and spotted deer.',
    highlights: ['Royal Bengal Tiger Habitat', 'Kotka Tiger Point', 'Canopy Boat Safari', 'Honey Collectors Trail'],
    bestSeason: 'November to February',
    entryFee: '৳150 (Local) / ৳1,000 (Foreign)',
    rating: 4.9,
    reviewsCount: 1420,
    latitude: 21.9497,
    longitude: 89.1833
  },
  {
    id: 'sajek-valley',
    name: 'Sajek Valley (Kingdom of Clouds)',
    bengaliName: 'সাজেক ভ্যালি',
    region: 'Rangamati Hill Tracts',
    category: 'Hill',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Perched high in the verdant Kasalong mountain range, Sajek offers dreamy vistas where white fluffy clouds drift beneath your cottage balconies.',
    highlights: ['Konglak Hilltop Peak', 'Ruilui Para Tribal Village', 'Starry Milky Way Nights', 'Helipad Sunset Point'],
    bestSeason: 'September to March',
    entryFee: 'Free (Army Escort required)',
    rating: 4.95,
    reviewsCount: 2310,
    latitude: 23.3822,
    longitude: 92.2938
  },
  {
    id: 'sreemangal',
    name: 'Sreemangal Tea Estates & Lawachara',
    bengaliName: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া',
    region: 'Sylhet / Moulvibazar',
    category: 'Forest',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    description: 'The tea capital of Bangladesh featuring undulating emerald carpet hills, seven-color layered tea, and Lawachara rainforest with rare Hoolock gibbons.',
    highlights: ['Endless Tea Valley Walks', '7-Color Layered Tea', 'Lawachara National Park Trail', 'Manipuri Artisan Village'],
    bestSeason: 'October to April',
    entryFee: '৳50 entry to forest',
    rating: 4.85,
    reviewsCount: 1890,
    latitude: 24.3065,
    longitude: 91.7296
  },
  {
    id: 'coxs-bazar',
    name: "Cox's Bazar Sea Beach",
    bengaliName: "কক্সবাজার সমুদ্র সৈকত",
    region: 'Chittagong Division',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: "The world's longest unbroken natural sandy sea beach stretching 120 km along the turquoise Bay of Bengal with unforgettable golden sunsets.",
    highlights: ['Marine Drive Scenic Highway', 'Inani Coral Reef Beach', 'Himchari Hilltop View', 'Fresh Coastal Seafood'],
    bestSeason: 'November to March',
    entryFee: 'Free public access',
    rating: 4.8,
    reviewsCount: 5200,
    latitude: 21.4272,
    longitude: 92.0058
  },
  {
    id: 'tanguar-haor',
    name: 'Tanguar Haor Wetland Sanctuary',
    bengaliName: 'টাঙ্গুয়ার হাওর',
    region: 'Sunamganj, Sylhet',
    category: 'Haor',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    description: 'A Ramsar ecological paradise spanning crystal-clear freshwater lagoons against the backdrop of the Meghalaya hills, best explored on luxury wooden houseboats.',
    highlights: ['Traditional Wooden Bajra Houseboats', 'Watchtower Panoramic Lagoon', 'Shimul Bagan Flower Fields', 'Jadukata River Sandbanks'],
    bestSeason: 'July to October (Monsoon Waters)',
    entryFee: 'Boat rental per group',
    rating: 4.92,
    reviewsCount: 1650,
    latitude: 25.1275,
    longitude: 91.0772
  },
  {
    id: 'bandarban-falls',
    name: 'Bandarban & Nafakhum Waterfall',
    bengaliName: 'বান্দরবান ও নাফাখুম জলপ্রপাত',
    region: 'Chittagong Hill Tracts',
    category: 'River',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    description: 'Known as the Niagara of Bangladesh, Nafakhum is a ferocious, dramatic waterfall nestled deep inside the mountains of Thanchi on the Remakri River.',
    highlights: ['Remakri River Canoe Journey', 'Trekking through Indigenous Villages', 'Amiakhum Canyon Adventure', 'Nilgiri Clouds Resort'],
    bestSeason: 'September to November',
    entryFee: 'Registered Guide required',
    rating: 4.9,
    reviewsCount: 980,
    latitude: 21.8493,
    longitude: 92.4965
  }
];

export const AI_PERSONAS: AIPersona[] = [
  {
    id: 'eco-guide',
    name: 'Tanvir (Eco-Tour Guide BD)',
    role: 'Natural Scene Bangladesh Expert',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    voiceType: 'Natural Warm',
    pitch: 1.05,
    speed: 1.0,
    personality: ['Welcoming', 'Culturally Proud', 'Eco-Conscious', 'Storyteller'],
    systemPrompt: 'You are Tanvir, an expert eco-travel explorer celebrating the natural wonders of Bangladesh, from Sajek cloud peaks to Sundarbans tigers and Sylhet tea gardens.',
    sampleResponses: [
      'Welcome to Natural Scene BD! Have you witnessed the sunset over Cox\'s Bazar or the morning fog over Sreemangal tea leaves?',
      'If you love misty mountain views, Sajek Valley during autumn or winter is pure magic. I can prepare a custom 3-day itinerary for you!',
      'For true wilderness, nothing compares to drifting through the Sundarbans creeks at dawn when the birds sing.'
    ]
  },
  {
    id: 'lead-dev',
    name: 'Aria (Principal Architect)',
    role: 'Full-Stack & Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    voiceType: 'Analytical Crisp',
    pitch: 0.95,
    speed: 1.1,
    personality: ['Precise', 'Optimized', 'Pragmatic', 'Architectural'],
    systemPrompt: 'You are Aria, a software architect specializing in scalable web systems, clean component patterns, and UI cloning pipelines.',
    sampleResponses: [
      'The component hierarchy is cleanly decomposed into reactive hooks and Tailwind primitives.',
      'Always separate your data fetching layers from display atoms to prevent unnecessary re-renders.',
      'We can export this cloned tree directly to an enterprise Vite + TypeScript bundle.'
    ]
  },
  {
    id: 'creative-writer',
    name: 'Kazi (Poet & Chronicler)',
    role: 'Creative Storyteller & Essayist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    voiceType: 'Deep Storyteller',
    pitch: 0.88,
    speed: 0.95,
    personality: ['Lyrical', 'Reflective', 'Imaginative', 'Inspiring'],
    systemPrompt: 'You are Kazi, a reflective essayist capturing the spirit of rivers, monsoon rains, and human connections in evocative prose.',
    sampleResponses: [
      'The Padma river carries the memories of centuries in every silt-laden crest under the moonlight.',
      'In Sreemangal, the rain does not fall; it whispers to each tea bud like an old lullaby.',
      'Let us craft words that evoke the damp smell of earth after the first Kalbaishakhi summer storm.'
    ]
  }
];

export const ECOMMERCE_PRODUCTS: ProductItem[] = [
  {
    id: 'cam-lens-85',
    name: 'Apex 85mm f/1.4 Portrait Prime',
    category: 'Optics',
    price: 689,
    originalPrice: 799,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-fast prime lens designed for razor-sharp wildlife and portrait imagery with creamy natural bokeh.',
    inStock: true,
    tag: 'Best Seller'
  },
  {
    id: 'travel-pack-45',
    name: 'VentureProof 45L Expedition Backpack',
    category: 'Travel Gear',
    price: 189,
    originalPrice: 220,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Weatherproof ripstop pack engineered for monsoon treks in Sajek and remote rainforest crossings.',
    inStock: true,
    tag: 'Tough Grade'
  },
  {
    id: 'tea-selection-box',
    name: 'Sreemangal First Flush Golden Tip Tea',
    category: 'Artisan',
    price: 45,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-plucked organic golden tips from high-altitude estates of Moulvibazar, single estate harvest.',
    inStock: true,
    tag: 'Organic'
  },
  {
    id: 'solar-bank-20k',
    name: 'SolCharge 24000mAh Rugged Power Station',
    category: 'Electronics',
    price: 119,
    originalPrice: 149,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80',
    description: 'Triple-port solar charging battery pack with SOS strobe light, shockproof for wilderness trips.',
    inStock: true
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Natural Scene BD',
      username: 'naturalscene_bd',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Creator'
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    content: 'Morning sea of clouds rising above Konglak Para in Sajek Valley today! When the sun breaks through the mist, Bangladesh reveals its most serene paradise. Have you visited Sajek this season? ☁️🇧🇩',
    timestamp: '2 hours ago',
    likes: 842,
    likedByMe: true,
    commentsCount: 94,
    shares: 156,
    tags: ['#NaturalSceneBD', '#SajekValley', '#BeautifulBangladesh', '#Wanderlust']
  },
  {
    id: 'post-2',
    author: {
      name: 'Rafiqul Islam',
      username: 'rafiq_wildlife',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    content: 'Deep in the Sundarbans river channels. The silence is broken only by kingfishers diving and the gentle ripple of the mangrove waters. Protecting this biosphere is protecting our heritage.',
    timestamp: '5 hours ago',
    likes: 619,
    commentsCount: 47,
    shares: 88,
    tags: ['#Sundarbans', '#WildBangladesh', '#Conservation']
  }
];

export const KANBAN_TASKS: KanbanTask[] = [
  {
    id: 'task-1',
    title: 'Extract UI design tokens from 8f0fbe86-cf24',
    description: 'Deconstruct palette, grid margins, typographic scales, and responsive layout primitives.',
    column: 'done',
    priority: 'high',
    assignee: {
      name: 'Aria Dev',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80'
    },
    dueDate: 'Sep 24',
    tags: ['Cloner', 'Tokens']
  },
  {
    id: 'task-2',
    title: 'Integrate Natural Scene BD interactive explorer',
    description: 'Showcase Bangladesh nature spots, soundscapes, booking calculators, and photo galleries.',
    column: 'done',
    priority: 'urgent',
    assignee: {
      name: 'Tanvir Guide',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    dueDate: 'Sep 24',
    tags: ['Nature', 'BD']
  },
  {
    id: 'task-3',
    title: 'Live code synthesizer & single-file export',
    description: 'Allow instant copy or download of full React component hierarchy with zero build errors.',
    column: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Aria Dev',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80'
    },
    dueDate: 'Sep 25',
    tags: ['Engine', 'Export']
  },
  {
    id: 'task-4',
    title: 'Voice Persona pitch and modulation engine',
    description: 'Web Audio API synthesizers and customizable dynamic prompt handlers for digital twins.',
    column: 'review',
    priority: 'medium',
    assignee: {
      name: 'Kazi Writer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    dueDate: 'Sep 26',
    tags: ['Voice', 'AI']
  },
  {
    id: 'task-5',
    title: 'Multi-device responsive frame testing',
    description: 'Ensure desktop, iPad tablet, and mobile viewport simulations scale flawlessly.',
    column: 'backlog',
    priority: 'low',
    assignee: {
      name: 'Tanvir Guide',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    dueDate: 'Sep 27',
    tags: ['QA', 'Viewport']
  }
];
