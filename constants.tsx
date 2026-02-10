import React from 'react';
import { Course, Feature, Testimonial, FaqItem, PricingPlan } from './types';
import { Download, MonitorPlay, Infinity, LifeBuoy, Users } from 'lucide-react';

/* 
  -----------------------------------------------------------------------
  HOW TO UPDATE IMAGES:
  1. Upload your image to Google Drive.
  2. Right click -> Share -> Copy Link (Ensure access is "Anyone with the link").
  3. Paste the link into the 'imageUrl' field below.
  
  The code will automatically convert Google Drive links to work on the website.
  -----------------------------------------------------------------------
*/

const RAW_COURSES: Course[] = [
  {
    id: '1',
    title: 'AutoCAD Mastery',
    software: 'AutoCAD',
    description: 'The starting point for every architect. Learn to draw accurate 2D floor plans for houses and buildings.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR',
    color: 'from-red-500 to-red-400',
    students: '42.5k',
    learningPoints: [
      'Draw floor plans and furniture layouts easily',
      'Print your drawings to scale for construction',
      'Use shortcuts to draw 10x faster than others'
    ],
    workflowImpact: 'Stop drawing by hand. Create professional blueprints that contractors can actually build from.'
  },
  {
    id: '3',
    title: 'SketchUp Pro',
    software: 'SketchUp',
    description: 'The easiest way to design 3D houses. If you can draw a box, you can design a beautiful villa with this.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo', 
    color: 'from-blue-500 to-cyan-400',
    students: '55k',
    learningPoints: [
      'Pull simple shapes into 3D houses instantly',
      'Add furniture, colors, and textures easily',
      'Create 3D views to show your clients'
    ],
    workflowImpact: 'Impress clients instantly. Model their dream kitchen or bedroom in front of them in just minutes.'
  },
  {
    id: '5',
    title: 'V-Ray Photorealism',
    software: 'V-Ray',
    description: 'Make your 3D models look like real photos. Lighting and shadows so good, clients will think it is built.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8',
    color: 'from-yellow-500 to-orange-400',
    students: '48k',
    learningPoints: [
      'Set up realistic sunlight and night lighting',
      'Make materials look like real wood and glass',
      'Take "photographs" of your 3D house'
    ],
    workflowImpact: 'Sell your design before it exists. Clients pay faster when they see exactly what they are getting.'
  },
  {
    id: '6',
    title: 'Lumion Cinematic',
    software: 'Lumion',
    description: 'Make movies of your architecture. Add moving people, birds, and cars to make your design feel alive.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt',
    color: 'from-teal-500 to-emerald-400',
    students: '31k',
    learningPoints: [
      'Add grass, trees, and water instantly',
      'Make people walk and cars drive in your scene',
      'Create a video tour of the house'
    ],
    workflowImpact: 'Give your client a video tour. A 1-minute video sells a house better than 100 drawings.'
  },
  {
    id: '7',
    title: 'D5 Render Realtime',
    software: 'D5 Render',
    description: 'See the final result instantly while you work. No more waiting hours for the computer to finish a picture.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr',
    color: 'from-purple-500 to-pink-500',
    students: '19k',
    learningPoints: [
      'Real-time lighting (see it as you work)',
      'Drag and drop thousands of free furniture items',
      'Make 4K images in seconds'
    ],
    workflowImpact: 'Design faster. Change the floor material and see how it looks instantly without waiting.'
  },
  {
    id: '9',
    title: 'AI Architecture & Gen Design',
    software: 'Midjourney + SD',
    description: 'The ultimate AI workflow. Generate concepts in seconds with Midjourney and turn rough sketches into renders with Stable Diffusion.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS',
    color: 'from-fuchsia-600 to-purple-600',
    students: '75k',
    learningPoints: [
      'Master Midjourney for instant high-end concepts',
      'Turn rough sketches into realistic renders (Stable Diffusion)',
      'Train your own AI models on your style'
    ],
    workflowImpact: 'Never run out of ideas. Let AI generate the creative concepts so you can focus on the details.'
  }
];

export const COURSES = RAW_COURSES;

export const ROWS = [
  { 
    title: "Essential Fundamentals", 
    courses: [
      COURSES.find(c => c.software === 'AutoCAD')!,
      COURSES.find(c => c.software === 'SketchUp')!
    ] 
  },
  { 
    title: "High-End Rendering", 
    courses: [
      COURSES.find(c => c.software === 'V-Ray')!,
      COURSES.find(c => c.software === 'Lumion')!,
      COURSES.find(c => c.software === 'D5 Render')!
    ] 
  },
  { 
    title: "The AI Revolution", 
    courses: [
      COURSES.find(c => c.id === '9')! // Combined AI Course
    ] 
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lifetime-all-access',
    duration: 'Lifetime All-Access',
    period: 'One-time investment',
    price: '$49',
    originalPrice: '$99',
    label: 'BEST VALUE',
    features: [
      'Access to all 6 courses instantly', 
      'Lifetime Future Updates included', 
      'All Future AI Modules included',
      'The Pro Asset Library (10,000+ items)', 
      'Official Student ID & Certification',
      'Direct Business Mentorship Access'
    ],
    accentColor: 'border-brand-success shadow-glow-success'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Download className="w-8 h-8" />,
    title: 'Instant Download',
    description: 'Get all source files and project templates immediately.',
  },
  {
    icon: <Infinity className="w-8 h-8" />,
    title: 'Zero Expiry',
    description: 'Learn at your own pace. Your access never expires.',
  },
  {
    icon: <MonitorPlay className="w-8 h-8" />,
    title: 'Elite Quality',
    description: '4K lessons filmed in professional architecture studios.',
  },
  {
    icon: <LifeBuoy className="w-8 h-8" />,
    title: 'Personalized Support',
    description: 'Got a bug? Our mentors reply in under 15 minutes.',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Freelance Architect',
    location: 'London, UK',
    content: 'Before this, I was charging $200 for a render. After applying the AI workflow, I just closed a $3,500 contract for a luxury penthouse tour.'
  },
  {
    name: 'Michael Chen',
    role: 'Studio Founder',
    location: 'Toronto, Canada',
    content: 'The D5 and Midjourney combo changed my firm’s output overnight. We are now delivering 3x faster without hiring more staff.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Student',
    location: 'Madrid, Spain',
    content: 'I learned more in 2 weeks here than 3 years in architecture school. The Revit modules are incredibly practical.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this really just a one-time payment?",
    answer: "Yes. We hate monthly subscriptions as much as you do. You pay $49 once, and you own everything forever, including all the AI courses we release next month, next year, and beyond."
  },
  {
    question: "What if I'm a complete beginner?",
    answer: "Perfect. We start with 'Level 0' basics for AutoCAD and SketchUp. Within 7 days, you'll be moving to the AI modules. Our system is built to take you from 'Zero to Studio-Ready' in 15 days."
  },
  {
    question: "Do I get certificates for my LinkedIn?",
    answer: "Yes. You receive a verified certificate for each course path you complete, plus an 'Elite Full-Stack Master' diploma if you complete the entire library."
  },
  {
    question: "What about software? Do you provide them?",
    answer: "We provide official direct download links for all student versions and trials. We also have a 24/7 technical team that can hop on a call to help you install everything properly."
  },
  {
    question: "What's the 30-Day Guarantee?",
    answer: "If you watch the lessons and don't feel like your rendering skills have improved 10x, just message us. We'll give you a full refund, no questions asked. We're that confident in the system."
  }
];