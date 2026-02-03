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
    id: '2',
    title: 'BIM with Revit',
    software: 'Revit',
    description: 'Build the whole 3D building on your computer. It is smart—change a wall in 3D, and the floor plan updates automatically.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1N_BbG9kAEwIk541Id53_RV0CWjO1jzAt',
    color: 'from-red-600 to-red-500',
    students: '38k',
    learningPoints: [
      'Create 3D buildings with automatic floor plans',
      'Calculate how many bricks and windows you need',
      'Work on big projects with other team members'
    ],
    workflowImpact: 'Save days of work. You do not need to redraw plans when the design changes. The software does it for you.'
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
    id: '4',
    title: '3ds Max Advanced',
    software: '3ds Max',
    description: 'Design fancy furniture and luxury interiors. Create soft sofas and curtains that look real enough to touch.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1DgmIvkeC2dxGpRpzbIthHQsSdlCty2Xg',
    color: 'from-cyan-600 to-blue-500',
    students: '22k',
    learningPoints: [
      'Model complex shapes like twisted towers',
      'Create soft fabrics, pillows, and blankets',
      'Design high-end luxury interior spaces'
    ],
    workflowImpact: 'Design things simpler software cannot handle. Charge more for premium, high-detail luxury designs.'
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
    id: '8',
    title: 'Enscape VR',
    software: 'Enscape',
    description: 'Walk inside your design. Put on a VR headset and let your client stand in their new living room.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1SmezP6LwT3yo9aE3oivpGkqS-xycSOyx',
    color: 'from-orange-500 to-red-500',
    students: '25k',
    learningPoints: [
      'One-click to start walking inside your model',
      'Send a web link so clients can walk around too',
      'Use Virtual Reality (VR) to impress'
    ],
    workflowImpact: 'Spot mistakes early. Walking through the house virtually helps you fix issues before construction starts.'
  },
  {
    id: '9',
    title: 'AI Architecture',
    software: 'Midjourney',
    description: 'Use AI to get 100 design ideas in 1 minute. Just type "modern villa by the beach" and see the magic.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS',
    color: 'from-fuchsia-600 to-purple-600',
    students: '60k',
    learningPoints: [
      'How to write text to get amazing house images',
      'Create mood boards for clients instantly',
      'Combine different styles (e.g., Classic + Modern)'
    ],
    workflowImpact: 'Never run out of ideas. Let AI generate the creative concepts so you can focus on the details.'
  },
  {
    id: '10',
    title: 'Generative Design',
    software: 'Stable Diffusion',
    description: 'Turn a rough pencil sketch into a realistic building image using AI. It is like magic for architects.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1xSzSjuL4imlbXwEYMwKw_vhuueDcFtHm',
    color: 'from-indigo-500 to-purple-500',
    students: '15k',
    learningPoints: [
      'Turn hand sketches into realistic renders',
      'Change specific parts of an image with AI',
      'Install AI tools on your own computer'
    ],
    workflowImpact: 'Show a client a realistic picture during the first meeting, even if you only have a napkin sketch.'
  },
  {
    id: '11',
    title: 'Unreal Engine 5',
    software: 'Unreal Engine',
    description: 'Make your house design look like a high-end video game. Let clients open doors and turn on lights.',
    imageUrl: 'https://lh3.googleusercontent.com/d/14EfKoC7BfxXmYxd6t6qIE470yQaX0toW',
    color: 'from-gray-600 to-gray-400',
    students: '18k',
    learningPoints: [
      'Create interactive lights and doors',
      'Make realistic fire, water, and wind',
      'Package your design as a playable game'
    ],
    workflowImpact: 'Gamify your work. Give clients a controller and let them play inside their future home.'
  },
  {
    id: '12',
    title: 'Post Production',
    software: 'Photoshop',
    description: 'The final touch. Add real sky, birds, and happy people to your building pictures to make them sell.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1FkzIhdu7K5JeRFq7BM1wGV5MND_fLMKe',
    color: 'from-blue-800 to-blue-600',
    students: '72k',
    learningPoints: [
      'Fix lighting and colors easily',
      'Add realistic people and trees',
      'Make your portfolio look professional'
    ],
    workflowImpact: 'Make average 3D renders look like award-winning photography. This is how you win competitions.'
  }
];

export const COURSES = RAW_COURSES;

export const ROWS = [
  { 
    title: "Planning", 
    courses: [
      COURSES.find(c => c.software === 'AutoCAD')!,
      COURSES.find(c => c.software === 'Revit')!
    ] 
  },
  { 
    title: "Designing", 
    courses: [
      COURSES.find(c => c.software === 'SketchUp')!,
      COURSES.find(c => c.software === '3ds Max')!,
      COURSES.find(c => c.software === 'Photoshop')!
    ] 
  },
  { 
    title: "Rendering", 
    courses: [
      COURSES.find(c => c.software === 'V-Ray')!,
      COURSES.find(c => c.software === 'Lumion')!,
      COURSES.find(c => c.software === 'D5 Render')!,
      COURSES.find(c => c.software === 'Enscape')!
    ] 
  },
  { 
    title: "AI & Interactive", 
    courses: [
      COURSES.find(c => c.software === 'Midjourney')!,
      COURSES.find(c => c.software === 'Stable Diffusion')!,
      COURSES.find(c => c.software === 'Unreal Engine')!
    ] 
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lifetime-basic',
    duration: 'Lifetime Access',
    period: 'One-time payment',
    price: '$49',
    originalPrice: '$199',
    label: 'BEST VALUE',
    features: ['Access to all 12 courses', 'Project Files Included', 'Mobile Access', 'HD Quality', '24/7 Support'],
    accentColor: 'border-brand-success shadow-glow-success'
  },
  {
    id: 'lifetime-plus',
    duration: 'Lifetime + Updates',
    period: 'One-time payment',
    price: '$99',
    originalPrice: '$499',
    label: 'PRO CHOICE',
    features: ['Everything in Basic', 'All Future Course Updates', 'New AI Modules Free', 'Priority Mentor Chat', 'Official Certification'],
    accentColor: 'border-gray-200'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Download className="w-8 h-8" />,
    title: 'Download & Watch',
    description: 'All software links provided. Learn offline.',
  },
  {
    icon: <Infinity className="w-8 h-8" />,
    title: 'Unlimited Access',
    description: 'Watch as much as you want, whenever you want.',
  },
  {
    icon: <MonitorPlay className="w-8 h-8" />,
    title: '100+ Hours',
    description: 'From basics to advanced professional workflows.',
  },
  {
    icon: <LifeBuoy className="w-8 h-8" />,
    title: '24/7 Support',
    description: 'Direct chat support for technical doubts.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community',
    description: 'Join thousands of other architects.',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Architect',
    location: 'London, UK',
    content: 'I was skeptical about online courses, but the depth here is unmatched. The Revit workflow section alone saved our firm countless hours.'
  },
  {
    name: 'Michael Chen',
    role: '3D Visualizer',
    location: 'Toronto, Canada',
    content: 'The V-Ray and 3ds Max combo is a game-changer. I went from producing average renders to photorealistic images.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the subscription work?",
    answer: "Choose the Best Value plan ($49) for a one-time payment. You'll get instant, lifetime access to all 12 existing courses plus any AI modules we release this year. No monthly fees, ever."
  },
  {
    question: "Can I watch on mobile or tablet?",
    answer: "Absolutely. Our platform is 100% mobile-responsive. You can stream lessons on your phone during commutes or on your tablet while practicing on your workstation."
  },
  {
    question: "Is the software provided with the course?",
    answer: "We provide direct links to official trials and student versions for all software used. We also include a special module on 'The Right Hardware' to ensure your computer can handle these heavy rendering tasks."
  },
  {
    question: "Will I get a certificate upon completion?",
    answer: "Yes. Every student who completes a course path receives a professional certificate from Avada Architectural AI. These are highly valued in the freelance market and by top architectural firms."
  },
  {
    question: "What if I get stuck or have technical doubts?",
    answer: "You are never alone. Our 24/7 Direct Chat Support is staffed by actual design professionals. Whether it's a software bug or a design challenge, we respond within minutes."
  },
  {
    question: "Are the project files and assets included?",
    answer: "Every single lesson comes with the exact project files, textures, and 3D families used in the video. You can follow along click-by-click with the same high-quality assets we use."
  },
  {
    question: "Is this suitable for a complete beginner?",
    answer: "Yes! We start with 'The Zero Hero' modules for AutoCAD and SketchUp that assume you've never opened the software before. We build up your skills until you're handling advanced AI-integrated workflows."
  },
  {
    question: "How long do I have access to the materials?",
    answer: "When you buy the bundle, you own it for life. There are no expiration dates. You can revisit the lessons anytime you need a refresher on a specific technique."
  }
];