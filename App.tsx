
import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { StackedCarousel } from './components/StackedCarousel';
import { TESTIMONIALS, FAQ_ITEMS, COURSES } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { 
  Check, CheckCircle2, ArrowRight, Star, LogIn, 
  Zap, TrendingUp, Sparkles, AlertCircle, XCircle, 
  CheckCircle, Rocket, Briefcase, Play,
  Lock, Gem, BarChart3, Users, GraduationCap, ListChecks,
  Radio, Shield, ChevronDown, Quote, MousePointer2, Clock, History, Target,
  BrainCircuit, HelpCircle, DollarSign, Microscope, BookOpen
} from 'lucide-react';
import { Course } from './types';

const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
    <div className="relative w-10 h-10 border-2 border-gray-900 flex items-center justify-center bg-transparent transition-all duration-300 group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <span className="font-display font-black text-xl tracking-tighter relative z-10 text-gray-900">AV</span>
    </div>
    <div className="flex flex-col text-left">
       <span className="font-display font-bold text-xl tracking-[0.25em] leading-none text-gray-900">AVADA</span>
       <div className="w-full h-[1px] bg-gray-200 my-0.5"></div>
       <span className="text-[7px] font-bold uppercase tracking-widest text-gray-500 flex justify-between w-full leading-none">
          <span>ARCH</span>
          <span>•</span>
          <span className="text-brand-primary animate-pulse font-black">AI+</span>
       </span>
    </div>
  </div>
);

interface MasterCTAProps {
  onClick: () => void;
  timeLeft: { h: number; m: number; s: number };
  className?: string;
}

const MasterCTA: React.FC<MasterCTAProps> = ({ onClick, timeLeft, className = "" }) => {
  const formatTime = (val: number) => val.toString().padStart(2, '0');
  
  return (
    <div className={`flex flex-col items-center gap-4 w-full max-w-xl mx-auto ${className}`}>
      <div className="flex items-end justify-between w-full px-2 mb-1">
        <div className="flex flex-col items-start">
           <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
              <Shield size={10} className="text-brand-success" /> Secure Enrollment
           </div>
           <div className="flex items-baseline gap-2.5">
              <span className="text-4xl sm:text-5xl font-display font-black tracking-tighter text-gray-900">$49</span>
              <span className="text-gray-300 line-through text-lg font-bold font-sans">$99</span>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-brand-primary mb-1">
              Final batch discount ends:
           </div>
           <div className="flex items-center gap-1.5 font-mono font-bold text-xl sm:text-2xl tabular-nums text-gray-800">
              <span>{formatTime(timeLeft.h)}</span>
              <span className="text-gray-200 -mt-1">:</span>
              <span>{formatTime(timeLeft.m)}</span>
              <span className="text-gray-200 -mt-1">:</span>
              <span>{formatTime(timeLeft.s)}</span>
           </div>
        </div>
      </div>

      <button 
        onClick={onClick} 
        className="group relative w-full bg-brand-primary hover:bg-gray-900 text-white py-6 sm:py-7 px-4 sm:px-12 rounded-2xl transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(5,150,105,0.25)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-[0.98] overflow-hidden border border-white/20"
      >
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-5">
           <span className="text-sm sm:text-xl font-black uppercase tracking-tight whitespace-nowrap">All Courses + AI Bundle</span>
           <div className="bg-white/20 p-1.5 sm:p-2 rounded-full group-hover:translate-x-2 transition-transform duration-300">
              <ArrowRight size={18} className="sm:w-6 sm:h-6" />
           </div>
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 -left-full w-2/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:animate-[shine_1.5s_infinite]"></div>
        </div>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
         <div className="flex items-center gap-1.5"><Star size={12} className="text-brand-accent fill-brand-accent" /> 4.9/5 Rating</div>
         <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-brand-success" /> Lifetime Access</div>
         <div className="flex items-center gap-1.5"><Users size={12} className="text-brand-success" /> 41,200+ Enrolled</div>
      </div>
    </div>
  );
};

interface FAQAccordionProps {
  question: string;
  answer: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">{question}</span>
        <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 leading-relaxed font-medium">{answer}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });

  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (2 * 23 * 60 * 1000) + (49 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);
      setTimeLeft({
        h: Math.floor((remaining / (1000 * 60 * 60)) % 24),
        m: Math.floor((remaining / (1000 * 60)) % 60),
        s: Math.floor((remaining / 1000) % 60)
      });
    };
    const timerInterval = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timerInterval);
  }, []);

  const openGeneralModal = () => { setSelectedCourse(null); setIsModalOpen(true); };
  const openCourseModal = (course: Course) => { setSelectedCourse(course); setIsModalOpen(true); };

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-gray-900 font-sans overflow-x-hidden selection:bg-brand-primary selection:text-white">
      <style>{`
        @keyframes shine { 0% { left: -150%; } 100% { left: 250%; } }
        .bg-grid-slate { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px); }
        .text-glow-green { text-shadow: 0 0 15px rgba(5, 150, 105, 0.2); }
      `}</style>

      {/* STICKY NAV */}
      <nav className="w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0">
        <div className="bg-brand-primary text-white py-2 px-4 flex justify-center text-center text-[9px] font-black uppercase tracking-[0.2em]">
             ALERT: Traditional designing is evolving. The 2026 AI Hybrid Batch is 92% full.
        </div>
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
             <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-brand-primary transition-colors uppercase tracking-widest"><LogIn size={14} /> Student Login</button>
             <button onClick={openGeneralModal} className="hidden md:block bg-gray-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all">Enroll for $49</button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO: VIDEO 1 (CTA #1) */}
        <section className="relative pt-20 pb-24 bg-[#FCFCFD] overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate opacity-60"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-brand-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-emerald-100">
                     <AlertCircle size={14} /> Critical Industry Shift
                  </div>
                  <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] mb-8 text-gray-900 tracking-tighter mx-auto lg:mx-0">
                    Can you really afford <br/> to spend <span className="text-brand-primary italic">20 hours</span> on a single render?
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed mx-auto lg:mx-0">
                    While you are manually modeling assets, your competitors are using <span className="text-gray-900 font-bold">AI Hybrid Workflows</span> to deliver in 20 minutes.
                  </p>
                  
                  <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} />
              </div>

              <div className="w-full lg:w-2/5 relative">
                   <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200">
                        <iframe src="https://iframe.mediadelivery.net/embed/494628/3009186c-d8fe-400c-b1af-2787fdf042a1?autoplay=true&loop=true&muted=true&preload=true" className="w-full h-full object-cover" allow="autoplay; fullscreen" loading="lazy"></iframe>
                   </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: THE DIAGNOSIS (6 ITEMS) */}
        <section className="py-24 bg-white border-y border-gray-100">
             <div className="container mx-auto px-6 max-w-4xl text-center">
                <HelpCircle className="text-brand-primary mx-auto mb-6" size={40} />
                <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-10 tracking-tighter">Is your career <span className="text-brand-primary">Stagnating?</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {[
                        "Do you spend more than 8 hours on a single 3D model?",
                        "Do your clients keep asking for 'just one more small revision'?",
                        "Is your monthly income stuck below $3,000?",
                        "Are you terrified that AI will eventually replace you?",
                        "Do you lack a portfolio that stops people from scrolling?",
                        "Are you still using 2015 rendering techniques?"
                    ].map((q, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-primary transition-all group">
                             <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all">
                                <Check size={12} className="text-white opacity-0 group-hover:opacity-100" />
                             </div>
                             <p className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{q}</p>
                        </div>
                    ))}
                </div>

                {/* THE DIAGNOSIS SUMMARY (CTA #2) */}
                <div className="mt-12 p-8 md:p-12 bg-emerald-50 rounded-[3rem] border border-emerald-200 shadow-2xl shadow-emerald-200/50">
                    <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-bold">
                        If you answered <span className="text-brand-primary underline underline-offset-8 decoration-4 font-black italic">YES</span> to even 2 of these questions, you are in the <span className="text-brand-primary uppercase tracking-widest font-black">High-Risk Zone</span>.
                    </p>
                    <div className="w-20 h-1 bg-brand-primary mx-auto my-6"></div>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed mb-10">
                        You are working 5x harder for 1/5th of the pay. Every day you delay, the AI-equipped competition is stealing your high-ticket clients. You don't need another degree—you need the <span className="text-gray-900 font-black">Avada Hybrid Workflow</span> before your skills become permanently obsolete.
                    </p>
                    <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-xl" />
                </div>
             </div>
        </section>

        {/* SECTION: THE HYBRID ENGINE */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                <div className="text-center mb-16">
                    <BrainCircuit className="text-brand-primary mx-auto mb-6" size={48} />
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tighter">Precision + Power.</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col text-left">
                        <h3 className="text-2xl font-display font-bold text-gray-900 uppercase tracking-tighter mb-4">Phase 1: The Bones (Foundations)</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">AutoCAD Masterclass & SketchUp Pro Modeling.</p>
                        <div className="space-y-4 mt-auto">
                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 font-bold text-sm">AutoCAD & SketchUp Mastery</div>
                        </div>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-gray-900 text-white flex flex-col text-left">
                        <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-4">Phase 2: The Soul (AI + Rendering)</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">V-Ray, D5, Lumion & AI Architecture.</p>
                        <div className="space-y-4 mt-auto text-brand-primary font-black uppercase tracking-[0.3em] animate-pulse text-center">
                             INCLUDES 2026 AI PROMPT VAULT
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION: VIDEO 2 (WORKFLOW PROOF) */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px]"></div>
            <div className="container mx-auto px-6 max-w-5xl text-center">
                 <div className="inline-flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                    <Play size={14} fill="currentColor" /> Watch the Speed
                 </div>
                 <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">Zero to Photoreal in 180 Seconds.</h2>
                 <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-black">
                     <iframe src="https://iframe.mediadelivery.net/embed/494628/3009186c-d8fe-400c-b1af-2787fdf042a1?autoplay=true&loop=true&muted=true&preload=true" className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" loading="lazy"></iframe>
                 </div>
            </div>
        </section>

        {/* SECTION: THE $100K OPPORTUNITY COST */}
        <section className="py-24 bg-[#F9FAFB] border-y border-gray-100 text-center">
            <div className="container mx-auto px-6 max-w-5xl">
                <DollarSign className="text-brand-primary mx-auto mb-6" size={48} />
                <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-16 tracking-tighter">The $100,000 Mistake.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { t: "Traditional Designer", h: "40 Hours", m: "$1,600", s: "Stressed" },
                        { t: "Software Expert", h: "15 Hours", m: "$1,600", s: "Normal" },
                        { t: "Avada Hybrid Designer", h: "2 Hours", m: "$1,600", s: "Leader", highlight: true }
                    ].map((item, i) => (
                        <div key={i} className={`p-8 rounded-[2.5rem] border ${item.highlight ? 'bg-white border-brand-primary shadow-2xl scale-105 z-10' : 'bg-gray-100 border-gray-200'}`}>
                             <h4 className="text-lg font-bold mb-4">{item.t}</h4>
                             <div className="text-3xl font-display font-black text-gray-900 mb-2">{item.h}</div>
                             <div className="text-3xl font-display font-black text-brand-primary mb-6">{item.m}</div>
                             <span className="text-[10px] font-black uppercase tracking-widest">{item.s}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* SECTION: SURVIVAL GUIDE */}
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <Microscope className="text-brand-primary mb-6 mx-auto lg:mx-0" size={40} />
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8 tracking-tighter">The 2026 Survival Guide.</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">One person with an AI-Hybrid workflow can do the work of a 5-person team. This isn't just a trend; it's the new baseline for professional studios.</p>
                    </div>
                    <div className="w-full lg:w-1/2 relative">
                         <div className="grid grid-cols-2 gap-4">
                             {['AutoCAD Mastery', 'SketchUp Pro', 'V-Ray Photo', 'AI Gen Design'].map((b, i) => (
                                 <div key={i} className="p-10 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-brand-primary hover:text-white transition-all group">
                                      <div className="font-display font-bold text-lg leading-tight">{b}</div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION: FULL CURRICULUM (CTA #3) */}
        <section className="py-24 bg-[#FCFCFD] border-b border-gray-100">
             <div className="container mx-auto px-6 max-w-6xl text-center">
                 <div className="text-center mb-16">
                     <BookOpen className="text-brand-primary mx-auto mb-6" size={48} />
                     <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tighter">The Full Curriculum.</h2>
                     <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">6 deep-dive modules built to transform you into a $150/hr Hybrid Designer.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                     {COURSES.map((course, idx) => (
                         <div key={course.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-brand-primary hover:shadow-2xl transition-all duration-500 group text-left">
                             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-4">Module 0{idx+1} • {course.software}</div>
                             <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 tracking-tight group-hover:text-brand-primary transition-colors">{course.title}</h3>
                             <p className="text-gray-500 text-sm leading-relaxed mb-6">{course.description}</p>
                             <ul className="space-y-3">
                                 {course.learningPoints.map((point, pIdx) => (
                                     <li key={pIdx} className="flex items-start gap-3 text-xs font-bold text-gray-700">
                                         <CheckCircle2 size={14} className="text-brand-success shrink-0 mt-0.5" />
                                         {point}
                                     </li>
                                 ))}
                             </ul>
                         </div>
                     ))}
                 </div>
                 <div className="flex justify-center">
                    <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl" />
                 </div>
             </div>
        </section>

        {/* SECTION: VIDEO 3 (DIGITAL VAULT WALKTHROUGH) */}
        <section className="py-24 bg-white overflow-hidden border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                 <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <Lock size={14} /> Bonus: The Vault
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8 tracking-tighter">What's Inside the <br/>Student Portal?</h2>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                            It's not just videos. It's an entire infrastructure. Watch this walkthrough of the private 41,000+ member dashboard, software vault, and prompt library.
                        </p>
                        <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
                            {['70+ Hours of Content', 'Direct Software Links', '10,000+ Assets'].map((p, i) => (
                                <div key={i} className="flex items-center justify-center lg:justify-start gap-3 font-bold text-gray-900">
                                    <CheckCircle2 className="text-brand-success" size={18} /> {p}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-900">
                            <iframe src="https://iframe.mediadelivery.net/embed/494628/3009186c-d8fe-400c-b1af-2787fdf042a1?autoplay=true&loop=true&muted=true&preload=true" className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" loading="lazy"></iframe>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* CAROUSEL */}
        <section className="py-24 bg-white overflow-hidden text-center">
            <StackedCarousel onCourseClick={openCourseModal} />
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#FCFCFD] overflow-hidden border-y border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                <div className="text-center mb-16">
                    <Quote className="text-brand-primary mx-auto mb-6 opacity-20" size={64} />
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tighter">Results from the Trenches.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="p-10 bg-white rounded-[3rem] border border-gray-100 relative group hover:border-brand-primary transition-all duration-500 shadow-sm text-left">
                             <div className="flex gap-1 mb-6">
                                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-brand-accent text-brand-accent" />)}
                             </div>
                             <p className="text-xl font-medium text-gray-700 leading-relaxed mb-8 italic">"{t.content}"</p>
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-900">{t.name.charAt(0)}</div>
                                 <div>
                                     <div className="font-bold text-gray-900">{t.name}</div>
                                     <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.role} • {t.location}</div>
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-3xl text-center">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tighter">Answering your doubts.</h2>
                </div>
                <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl text-left">
                    {FAQ_ITEMS.map((item, i) => (
                        <FAQAccordion key={i} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>

        {/* FINAL CTA (CTA #4) */}
        <section className="py-40 bg-gray-900 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/10 blur-[150px] rounded-full"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tighter">Admit it. <br/> <span className="text-brand-primary italic">You're curious.</span></h2>
                <div className="max-w-xl mx-auto">
                   <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="bg-white p-10 rounded-[3rem] border border-white/10" />
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-white py-20 px-6 text-center border-t border-gray-100">
        <div className="flex justify-center mb-10 grayscale opacity-40"><Logo /></div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">© 2026 AVADA ARCHITECTURAL AI • ADAPT OR EXPIRE</p>
      </footer>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;
