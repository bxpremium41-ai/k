import React from 'react';
import { Course, Feature, Testimonial, FaqItem, PricingPlan } from './types';
import { Download, MonitorPlay, Infinity, LifeBuoy, Users } from 'lucide-react';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'AutoCAD Mastery',
    software: 'AutoCAD',
    description: 'The starting point for every architect. Learn to draw accurate 2D floor plans for houses and buildings.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=600&auto=format&fit=crop', 
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
    imageUrl: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=600&auto=format&fit=crop',
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
    id: '5',
    title: 'V-Ray Photorealism',
    software: 'V-Ray',
    description: 'Make your 3D models look like real photos. Lighting and shadows so good, clients will think it is built.',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1614741118830-9a486c875902?q=80&w=600&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=600&auto=format&fit=crop',
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

// Defined categories as requested
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
    id: 'quarterly',
    duration: '3 Months',
    period: 'Quarterly',
    price: '$49',
    originalPrice: '$199',
    label: 'POPULAR',
    features: ['Access to all courses', 'Mobile Access', 'HD Quality', 'Project Files'],
    accentColor: 'border-brand-primary'
  },
  {
    id: 'yearly',
    duration: '12 Months',
    period: 'Yearly',
    price: '$99',
    originalPrice: '$499',
    label: 'BEST VALUE',
    features: ['Lifetime Access Logic', 'Priority Support', '4K Quality', 'Portfolio Review', 'Mentorship'],
    accentColor: 'border-brand-accent shadow-glow'
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Download className="w-6 h-6 text-brand-primary" />,
    title: 'Download & Watch',
    description: 'All software links provided. Learn offline.',
  },
  {
    icon: <Infinity className="w-6 h-6 text-brand-primary" />,
    title: 'Unlimited Access',
    description: 'Watch as much as you want, whenever you want.',
  },
  {
    icon: <MonitorPlay className="w-6 h-6 text-brand-primary" />,
    title: '100+ Hours',
    description: 'From basics to advanced professional workflows.',
  },
  {
    icon: <LifeBuoy className="w-6 h-6 text-brand-primary" />,
    title: '24/7 Support',
    description: 'Direct chat support for technical doubts.',
  },
    {
    icon: <Users className="w-6 h-6 text-brand-primary" />,
    title: 'Community',
    description: 'Join thousands of other architects.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Saksham Rai',
    role: 'Home Decor Specialist',
    content: 'The Avada model is genius. I binge-watched the V-Ray course and improved my renders in a weekend.'
  },
  {
    name: 'Abhishek Mukheji',
    role: 'Architect',
    content: 'Finally, affordable high-quality education. The 12-month plan is a steal for the value provided.'
  },
  {
    name: 'Priyanka Jha',
    role: 'Interior Designer',
    content: 'The interface is so smooth, and the content is industry-standard. Highly recommended.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the subscription work?",
    answer: "Choose a plan (Quarterly or Yearly) and get instant unlimited access to ALL courses on the platform."
  },
  {
    question: "Can I watch on mobile?",
    answer: "Yes, our platform is fully responsive. You can learn on your phone, tablet, or laptop."
  },
  {
    question: "Are project files included?",
    answer: "Yes, all 3D models and textures used in the tutorials are available for download."
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, industry-recognized certificates are provided upon course completion."
  }
];
