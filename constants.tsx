
import React from 'react';
import { Course, Feature, Testimonial, FaqItem, PricingPlan } from './types';
import { Download, MonitorPlay, Infinity, LifeBuoy, Users } from 'lucide-react';

/* 
  -----------------------------------------------------------------------
  HOW TO UPDATE IMAGES:
  1. Upload your image to Google Drive.
  2. Right click -> Share -> Copy Link (Ensure access is "Anyone with the link").
  3. Paste the link into the 'imageUrl' field below.
  -----------------------------------------------------------------------
*/

const RAW_COURSES: Course[] = [
  {
    id: '1',
    title: 'AutoCAD Foundations',
    software: 'AutoCAD',
    description: 'The "Bones" of your workflow. Master precision technical drawing so your AI renders have accurate proportions and construction feasibility.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR',
    color: 'from-red-500 to-red-400',
    students: '42.5k',
    learningPoints: [
      'Industry-standard technical drafting',
      'Construction-ready floor plans',
      'Pro shortcuts for extreme drafting speed'
    ],
    workflowImpact: 'The essential foundation. No AI can fix a bad floor plan.'
  },
  {
    id: '3',
    title: 'SketchUp Expert Modeling',
    software: 'SketchUp',
    description: 'The "Body" of your project. Learn to model complex geometry that serves as the perfect canvas for high-speed AI texturing and lighting.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo', 
    color: 'from-blue-500 to-cyan-400',
    students: '55k',
    learningPoints: [
      'Complex 3D spatial modeling',
      'Organized layering for render engines',
      'Asset management and studio workflows'
    ],
    workflowImpact: 'Rapid modeling that feeds your AI rendering engine.'
  },
  {
    id: '5',
    title: 'V-Ray Reality Mastery',
    software: 'V-Ray',
    description: 'The "Skin" of your design. Transition from basic 3D to hyper-realistic photography. Essential for high-ticket commercial clients.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8',
    color: 'from-yellow-500 to-orange-400',
    students: '48k',
    learningPoints: [
      'Photorealistic material science',
      'Advanced global illumination',
      'Professional post-production'
    ],
    workflowImpact: 'Close premium clients with 8K "photographs" of their dreams.'
  },
  {
    id: '6',
    title: 'Lumion Cinematic Tours',
    software: 'Lumion',
    description: 'The "Movement" of your design. Create immersive video tours that explain complex designs in seconds.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt',
    color: 'from-teal-500 to-emerald-400',
    students: '31k',
    learningPoints: [
      'Cinematic camera movements',
      'Dynamic weather and lighting effects',
      'Professional architectural storytelling'
    ],
    workflowImpact: 'A 60-second video tour beats a 100-page presentation.'
  },
  {
    id: '7',
    title: 'D5 Real-Time Rendering',
    software: 'D5 Render',
    description: 'The "Speed" of your design. See final quality as you work. No more waiting hours for images to "finish".',
    imageUrl: 'https://lh3.googleusercontent.com/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr',
    color: 'from-purple-500 to-pink-500',
    students: '19k',
    learningPoints: [
      'Instant RTX-powered lighting',
      'Real-time material editing',
      'High-speed final exports'
    ],
    workflowImpact: 'Iterate 10x faster and finish projects on the same day.'
  },
  {
    id: '9',
    title: 'AI Gen-Design & Prompting',
    software: 'AI Architecture',
    description: 'The "Superpower". Use Stable Diffusion and Midjourney to turn Phase 1 sketches into professional renders in under 60 seconds.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS',
    color: 'from-fuchsia-600 to-purple-600',
    students: '75k',
    learningPoints: [
      'Midjourney for architectural concepting',
      'Stable Diffusion for render-to-render control',
      'AI Prompt Engineering for Design'
    ],
    workflowImpact: 'The future of our industry. Work at the speed of thought.'
  }
];

export const COURSES = RAW_COURSES;

export const FEATURES: Feature[] = [
  {
    icon: <MonitorPlay />,
    title: '70+ Hours of Content',
    description: 'Master every software from foundations to advanced AI-driven architectural rendering.'
  },
  {
    icon: <Infinity />,
    title: 'Lifetime Access',
    description: 'One-time payment. No subscriptions. Get every future update and 2026 AI modules for free.'
  },
  {
    icon: <Users />,
    title: 'Private Community',
    description: 'Join 41k+ designers in our private Discord to network, share prompts, and get feedback.'
  },
  {
    icon: <Download />,
    title: '10,000+ Assets',
    description: 'Instant access to our premium library of high-quality textures, models, and AI prompt templates.'
  },
  {
    icon: <LifeBuoy />,
    title: 'Expert Support',
    description: 'Get direct answers to your technical questions from our team of industry professionals.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lifetime-all-access',
    duration: 'Full Hybrid Bundle',
    period: 'One-time investment',
    price: '$49',
    originalPrice: '$99',
    label: '41k+ ENROLLED',
    features: [
      'All 6 Professional Courses',
      'Phase 1 Foundations (AutoCAD/SketchUp)',
      'Phase 2 AI & Rendering Superpowers',
      'Lifetime Updates (2026 Ready)',
      'Certified Digital Diploma',
      'Private Support Discord'
    ],
    accentColor: 'border-brand-success shadow-glow-success'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Freelance Architect',
    location: 'London, UK',
    content: 'The AutoCAD to AI pipeline is genius. I reduced my rendering time from 12 hours to 10 minutes without losing blueprint precision.'
  },
  {
    name: 'Michael Chen',
    role: 'Studio Founder',
    location: 'Toronto, Canada',
    content: 'The Hybrid Workflow is the only way we stayed profitable this year. My team is 5x faster than our competitors.'
  },
  {
    name: 'David Rossi',
    role: 'Senior Designer',
    location: 'Milan, Italy',
    content: 'I thought AutoCAD was enough until I saw what AI could do. Now I deliver in a day what used to take me a month. Best $49 I ever spent.'
  },
  {
    name: 'Amara Okafor',
    role: '3D Visualizer',
    location: 'Lagos, Nigeria',
    content: 'The software installation guides saved me days of frustration. Everything is working perfectly and the Discord community is elite.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Why do I need AutoCAD if I have AI?",
    answer: "AI generates images, not blueprints. Clients need blueprinters. We teach you how to use AutoCAD to create the 'Bones' and AI to create the 'Soul'. One is useless without the other."
  },
  {
    question: "Is this really just a one-time payment?",
    answer: "Yes. $49 once. No monthly taxes on your career. You get every course and every future update forever."
  },
  {
    question: "How long until I see results?",
    answer: "If you follow the 15-day roadmap, you will deliver your first AI-Hybrid render by Day 9."
  }
];
