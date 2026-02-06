import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { CourseRow } from './components/CourseRow';
import { StackedCarousel } from './components/StackedCarousel';
import { TESTIMONIALS, FAQ_ITEMS, ROWS, COURSES } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { 
  ChevronDown, CheckCircle2, ArrowRight, Timer, Quote, Star, LogIn, 
  Zap, TrendingUp, Sparkles, Target, Wallet, AlertCircle, XCircle, 
  CheckCircle, ShieldCheck, Rocket, Trophy, Briefcase, Globe,
  ArrowDownCircle, Lock, Gem, BarChart3, HelpCircle, Users, GraduationCap, Building2, Lightbulb, ListChecks,
  Crown,
  ChevronRight,
  Shield,
  Radio
} from 'lucide-react';
import { Course } from './types';

const RAW_JOINERS = [
  { name: "Liam O.", city: "London", time: "2 mins ago" },
  { name: "Emma W.", city: "New York", time: "5 mins ago" },
  { name: "Noah J.", city: "Toronto", time: "12 mins ago" },
  { name: "Olivia M.", city: "Sydney", time: "15 mins ago" },
  { name: "William B.", city: "Berlin", time: "18 mins ago" },
  { name: "Ava C.", city: "Chicago", time: "22 mins ago" }
];

const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
    <div className="relative w-10 h-10 border-2 border-gray-900 flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
      <span className="font-display font-black text-xl tracking-tighter relative z-10">AV</span>
    </div>
    <div className="flex flex-col text-left">
       <span className="font-display font-bold text-xl tracking-[0.25em] leading-none text-gray-900">AVADA</span>
       <div className="w-full h-[1px] bg-gray-300 my-0.5"></div>
       <span className="text-[7px] font-bold uppercase tracking-widest text-gray-500 flex justify-between w-full leading-none">
          <span>ARCH</span>
          <span>•</span>
          <span className="text-brand-primary animate-pulse font-black">AI+</span>
       </span>
    </div>
  </div>
);

const MasterCTA = ({ onClick, timeLeft, className = "", theme = "light" }: { onClick: () => void, timeLeft: any, className?: string, theme?: "light" | "dark" }) => {
  const formatTime = (val: number) => val.toString().padStart(2, '0');
  const isDark = theme === "dark";
  
  return (
    <div className={`flex flex-col items-center gap-4 w-full max-w-xl mx-auto lg:mx-0 ${className}`}>
      {/* Header Info: Pricing & Scarcity */}
      <div className="flex items-end justify-between w-full px-2 mb-1">
        <div className="flex flex-col items-start">
           <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-gray-300' : 'text-gray-400'} mb-1`}>
              <Zap size={10} className="text-brand-success" /> Limited Time Package
           </div>
           <div className="flex items-baseline gap-2.5">
              <span className={`text-4xl sm:text-5xl font-display font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>$49</span>
              <span className={`${isDark ? 'text-white/40' : 'text-gray-400'} line-through text-lg font-bold font-sans`}>$99</span>
           </div>
        </div>

        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-red-600 mb-1">
              Offer ends in:
           </div>
           <div className={`flex items-center gap-1.5 font-mono font-bold text-xl sm:text-2xl tabular-nums ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex flex-col items-center">
                <span>{formatTime(timeLeft.h)}</span>
              </div>
              <span className={`${isDark ? 'text-white/20' : 'text-gray-200'} -mt-1`}>:</span>
              <div className="flex flex-col items-center">
                <span>{formatTime(timeLeft.m)}</span>
              </div>
              <span className={`${isDark ? 'text-white/20' : 'text-gray-200'} -mt-1`}>:</span>
              <div className="flex flex-col items-center">
                <span>{formatTime(timeLeft.s)}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Main Action Button */}
      <button 
        onClick={onClick} 
        className="group relative w-full bg-[#10b981] hover:bg-[#0ea271] text-white py-6 sm:py-7 px-4 sm:px-12 rounded-[1.5rem] transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.6)] hover:-translate-y-1.5 active:scale-[0.98] overflow-hidden border border-white/20"
      >
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-5">
           <span className="text-sm sm:text-2xl font-black uppercase tracking-tight whitespace-nowrap">Download All Courses</span>
           <div className="bg-white/20 p-1.5 sm:p-2 rounded-full group-hover:translate-x-2 transition-transform duration-300">
              <ArrowRight size={18} className="sm:w-6 sm:h-6" />
           </div>
        </div>
        
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 -left-full w-2/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-30deg] group-hover:animate-[shine_1.2s_infinite]"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      {/* Trust & Stats Footer */}
      <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-400'} uppercase tracking-widest mt-1`}>
         <div className="flex items-center gap-1.5"><Shield size={12} className="text-brand-success" /> Secured Checkout</div>
         <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-brand-success" /> Instant Lifetime Access</div>
         <div className="flex items-center gap-1.5"><Users size={12} className="text-brand-success" /> 41k+ Joined</div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });
  const [joiners] = useState(RAW_JOINERS);
  const [currentJoinerIndex, setCurrentJoinerIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [mentorTab, setMentorTab] = useState<'student' | 'pro'>('student');

  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
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

  useEffect(() => {
    const toastCycle = setInterval(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      setTimeout(() => setCurrentJoinerIndex(p => (p + 1) % joiners.length), 6000);
    }, 15000);
    return () => clearInterval(toastCycle);
  }, [joiners.length]);

  const openGeneralModal = () => { setSelectedCourse(null); setIsModalOpen(true); };
  const openCourseModal = (course: Course) => { setSelectedCourse(course); setIsModalOpen(true); };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">
      <style>{`
        @keyframes shine { 0% { left: -150%; } 100% { left: 250%; } }
        .bg-grid-pattern { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* NAVBAR */}
      <nav className="w-full z-50 bg-white border-b border-gray-100 sticky top-0">
        <div className="bg-gray-900 text-white py-2 px-4 flex justify-center gap-6 text-[11px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-3">
             <span className="text-gray-500 line-through">$299</span>
             <span className="text-brand-success">$49 Lifetime Offer</span>
          </div>
        </div>
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
             <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-primary bg-gray-50 px-5 py-2.5 rounded-full border border-gray-200 transition-colors shadow-sm"><LogIn size={16} /> Student Login</button>
          </div>
        </div>
      </nav>

      <main>
        {/* SECTION 1: HERO */}
        <section className="relative min-h-[90vh] w-full flex items-center bg-white pt-12 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100 shadow-sm">
                     <Gem size={14} /> This is a revolution in the Design Industry
                  </div>
                  <h1 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] mb-8 text-gray-900 tracking-tight">
                    If you're still learning design software and AI one YouTube video at a time, <span className="text-brand-primary italic">you're doing it the hard way.</span>
                  </h1>
                  <div className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-8 leading-relaxed">
                    <p className="mb-6">
                      In 2026, clients want <span className="text-gray-900 font-bold">speed, quality, and wow-worthy visuals.</span>
                    </p>
                    <p>
                      We’ll show you exactly how to deliver — with <span className="text-gray-900 font-bold underline decoration-brand-primary/30">SketchUp, V-Ray, Lumion, AutoCAD, and D5</span> — like a top-tier designer (even if you’re starting from zero).
                    </p>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                      <div className="bg-gray-900 text-white px-5 py-2.5 rounded-full flex items-center gap-2.5 text-xs font-bold shadow-lg shadow-gray-200 border border-gray-700">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                          </span>
                          <span>New: Weekly Live AI Masterclasses included for Free!</span>
                      </div>
                  </div>
                  
                  <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col items-center">
                   <div className="relative w-full aspect-video max-w-[700px]">
                        <div className="absolute inset-0 bg-brand-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.2)] border-4 border-white bg-black relative">
                             <iframe src="https://iframe.mediadelivery.net/embed/489113/562b87e6-4ac9-40b6-b343-479ada547387?autoplay=true&loop=true&muted=true" className="w-full h-full object-cover" allow="autoplay; fullscreen"></iframe>
                        </div>
                   </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ALL-ACCESS PASS GRID */}
        <section className="py-24 bg-white relative border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="bg-[#FFFFFF] rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-2/5 flex flex-col">
                        <div className="inline-flex items-center gap-2 bg-[#D90429] text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 w-fit shadow-lg shadow-red-200">
                           <ListChecks size={14} /> The Full Curriculum
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                            Your Lifetime <br/> All-Access Pass
                        </h2>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed mb-12">
                            When you join today, you don't just get one course. You unlock <span className="text-gray-900 font-bold underline decoration-red-200">every single masterclass</span> in our library, plus every course we ever release in the future.
                        </p>
                        <div className="mt-auto bg-[#FDF2F2] p-8 rounded-[2rem] border border-[#FDECEC] relative overflow-hidden mb-10 lg:mb-0">
                             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Combined Duration</h4>
                             <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-display font-black text-[#D90429]">140+</span>
                                <span className="text-2xl font-display font-bold text-gray-900">Hours</span>
                             </div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Of Premium 4K Video Content</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {COURSES.map((course, index) => (
                                <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-5 hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => openCourseModal(course)}>
                                     <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 shadow-sm border border-gray-100">
                                         <img src={course.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                                     </div>
                                     <div className="flex flex-col">
                                         <span className="text-[10px] font-black text-[#D90429] uppercase tracking-[0.2em] mb-0.5">
                                             Course {String(index + 1).padStart(2, '0')} • {course.software}
                                         </span>
                                         <h4 className="text-sm md:text-base font-bold text-gray-900 leading-tight">{course.title}</h4>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MASTER CTA #2 */}
                <div className="mt-16">
                    <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="max-w-2xl" />
                </div>

                {/* NEW VIDEO SECTION: Only Complete Course On AI */}
                <div className="mt-24 text-center">
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-12 tracking-tight">
                        Only Complete Course On <br className="hidden md:block" /> 
                        <span className="text-brand-primary italic">AI in Interior Design and Architecture</span>
                    </h3>
                    <div className="relative w-full aspect-video max-w-[900px] mx-auto">
                        <div className="absolute inset-0 bg-brand-primary/5 blur-[100px] rounded-full"></div>
                        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border-4 border-white bg-black relative">
                            <iframe 
                                src="https://iframe.mediadelivery.net/embed/494628/a8b8b480-201f-4099-ac67-2a42b9a1b61c?muted=true" 
                                className="w-full h-full object-cover" 
                                allow="autoplay; fullscreen"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
                
                {/* Showcase Image after CTA 2 */}
                <div className="mt-24 w-full max-w-7xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                    <img 
                      src="https://d1yei2z3i6k35z.cloudfront.net/13138299/6863ec42ba9eb_c9b7d945b1b6e0b8415a.webp" 
                      alt="Course Showcase" 
                      className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </section>

        {/* SECTION 3: REVERSE PSYCHOLOGY */}
        <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-red-50 rounded-[4rem] p-12 md:p-20 border-4 border-dashed border-red-200 text-center relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest shadow-2xl whitespace-nowrap text-[10px] md:text-sm">
                        <AlertCircle className="inline mr-1.5" size={14} /> PLEASE READ CAREFULLY
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-10 leading-tight">This is NOT for everyone.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mb-16">
                        <div className="space-y-4">
                            <h4 className="font-black text-red-600 uppercase tracking-widest text-sm">DO NOT JOIN IF:</h4>
                            <ul className="space-y-3 text-gray-600 font-medium">
                                <li className="flex gap-2"><XCircle className="text-red-400 shrink-0" size={18} /> You want a "magic button" with zero work.</li>
                                <li className="flex gap-2"><XCircle className="text-red-400 shrink-0" size={18} /> You enjoy complaining about bad clients.</li>
                                <li className="flex gap-2"><XCircle className="text-red-400 shrink-0" size={18} /> You aren't willing to practice for 15 days.</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-brand-success uppercase tracking-widest text-sm">JOIN ONLY IF:</h4>
                            <ul className="space-y-3 text-gray-600 font-medium">
                                <li className="flex gap-2"><CheckCircle className="text-brand-success shrink-0" size={18} /> You are hungry to dominate your market.</li>
                                <li className="flex gap-2"><CheckCircle className="text-brand-success shrink-0" size={18} /> You want to master AI before everyone else.</li>
                                <li className="flex gap-2"><CheckCircle className="text-brand-success shrink-0" size={18} /> You value your time more than $49.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="pt-12 sm:pt-6">
                        <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 4: MENTOR GUIDANCE SECTION */}
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <HelpCircle size={14} /> Let's Be Real For A Second
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">Is this package for you?</h2>
                    <p className="text-gray-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                        I know what you're thinking. "Is this another tutorial library?" <br className="hidden md:block" /> 
                        <span className="text-gray-900 font-bold">No. It's a career insurance policy.</span> Let me show you how it fits your specific life right now.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row bg-gray-50 rounded-[4rem] overflow-hidden border border-gray-100 shadow-xl">
                    <div className="w-full lg:w-1/3 bg-gray-900 p-8 lg:p-12 flex flex-col gap-4">
                        <button onClick={() => setMentorTab('student')} className={`flex items-center gap-4 p-6 rounded-3xl transition-all text-left ${mentorTab === 'student' ? 'bg-brand-primary text-white shadow-glow translate-x-2' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                            <div className={`p-3 rounded-2xl ${mentorTab === 'student' ? 'bg-white/20' : 'bg-gray-800'}`}><GraduationCap size={24} /></div>
                            <div><h4 className="font-bold text-lg">The Hungry Student</h4><p className="text-xs opacity-60">"I want to be industry-ready."</p></div>
                        </button>
                        <button onClick={() => setMentorTab('pro')} className={`flex items-center gap-4 p-6 rounded-3xl transition-all text-left ${mentorTab === 'pro' ? 'bg-brand-primary text-white shadow-glow translate-x-2' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                            <div className={`p-3 rounded-2xl ${mentorTab === 'pro' ? 'bg-white/20' : 'bg-gray-800'}`}><Building2 size={24} /></div>
                            <div><h4 className="font-bold text-lg">The Busy Professional</h4><p className="text-xs opacity-60">"I want to buy back my time."</p></div>
                        </button>
                    </div>
                    <div className="flex-1 p-8 lg:p-16 relative">
                        {mentorTab === 'student' ? (
                            <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">Skip the "Entry-Level" Trap and start as a <span className="italic underline decoration-brand-primary/30">Senior Specialist.</span></h3>
                                <p className="text-gray-600 text-lg leading-relaxed">Architecture school teaches you history and theory, but it doesn't teach you how to win a $5,000 project. Students who use Avada aren't looking for internships; they're getting hired as "Lead Visualizers".</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    {[{ t: "Build a Viral Portfolio", d: "Use AI to create concepts that look like $100M projects." }, { t: "Master 12+ Tools", d: "From AutoCAD to Unreal Engine 5." }].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"><div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0"><CheckCircle2 size={20} /></div><div><h5 className="font-bold text-gray-900 text-sm">{item.t}</h5><p className="text-xs text-gray-500">{item.d}</p></div></div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">Turn your 40-hour work week into <span className="italic underline decoration-brand-primary/30">10 hours of pure creative flow.</span></h3>
                                <p className="text-gray-600 text-lg leading-relaxed">You're tired. You spend your weekends rendering. You're losing bids to younger firms using AI. Our Professional track focuses on speed and photorealism that kills the competition.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    {[{ t: "AI Workflow Integration", d: "Reduce render times from 8 hours to 8 minutes." }, { t: "Cinema-Grade Quality", d: " walkthroughs that feel like movies." }].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"><div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0"><Zap size={20} /></div><div><h5 className="font-bold text-gray-900 text-sm">{item.t}</h5><p className="text-xs text-gray-500">{item.d}</p></div></div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mt-12 flex flex-col md:flex-row items-center gap-6 p-8 bg-white/50 border border-white rounded-[2rem] backdrop-blur-sm">
                             <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><Lightbulb size={32} /></div>
                             <div><p className="text-gray-900 font-bold italic">"This isn't just learning; it's an unfair advantage. Don't be the person still drawing lines by hand while others build empires."</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 5: LOSS AVERSION CALCULATOR */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                           <BarChart3 size={14} /> The Cost of Inaction
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">You are losing <span className="text-brand-primary">$3,400+</span> <br/> every single month.</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">While you spend 10 hours on a single manual render, our students use <span className="text-white font-bold">AI Workflows</span> to finish 5 projects in that same time. </p>
                    </div>
                    <div className="w-full md:w-1/2 bg-white rounded-[3rem] p-10 text-gray-900 shadow-2xl relative">
                        <div className="absolute -top-4 -right-4 bg-brand-success text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest rotate-6">Income Leak Detected</div>
                        <h3 className="text-2xl font-bold mb-6 text-center">The Success Gap</h3>
                        <div className="space-y-6 text-gray-500">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0"><XCircle className="text-red-500" /></div>
                                <div><h4 className="font-bold text-gray-900">Average Designer</h4><p className="text-sm">Earns $15,000/yr. Works 60hrs/week. Always tired.</p></div>
                            </div>
                            <div className="flex gap-4 border-b border-gray-100 pb-6">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle className="text-brand-success" /></div>
                                <div><h4 className="font-bold text-gray-900">Avada Pro</h4><p className="text-sm">Earns $85,000/yr. Works 20hrs/week. Respected expert.</p></div>
                            </div>
                            <div className="text-[10px] font-bold text-center uppercase tracking-widest pt-2">Claim the lifetime discount below</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* INTERMEDIATE MASTER CTA */}
        <div className="bg-white py-16 flex justify-center container mx-auto px-6">
            <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="max-w-2xl" />
        </div>

        {/* SECTION 6: VALUE STACK */}
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">The Total Value</h2>
                    <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">This isn't just a course. It's an entire design business downloaded to your computer.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {[
                        { t: "12 Master Courses", d: "Lifetime access to every lesson.", v: "$1,499", i: <Rocket className="text-brand-primary" /> },
                        { t: "Weekly Live AI Classes", d: "New AI workflows every week.", v: "$999", i: <Radio className="text-brand-primary" /> },
                        { t: "10,000+ Pro Textures", d: "4K resolution assets.", v: "$299", i: <Gem className="text-brand-primary" /> },
                        { t: "AI Prompt Library", d: "Copy-paste viral ideas.", v: "$199", i: <Sparkles className="text-brand-primary" /> },
                        { t: "Project Source Files", d: "Ready-to-use templates.", v: "$499", i: <Briefcase className="text-brand-primary" /> }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">{item.i}</div>
                             <h4 className="font-bold text-lg mb-2">{item.t}</h4>
                             <p className="text-sm text-gray-500 mb-4">{item.d}</p>
                             <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">{item.v} Value</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* SECTION 7: STACKED CAROUSEL */}
        <section className="py-12 bg-gray-50 overflow-hidden border-b border-gray-100">
            <StackedCarousel onCourseClick={openCourseModal} />
        </section>

        {/* NEW INFOGRAPHIC SECTION */}
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-100 bg-white">
                    <img 
                      src="https://d1yei2z3i6k35z.cloudfront.net/13138299/68654971c890d_Your-Numbered-Points-Title-Comes-Right-Here-9-min3.png" 
                      alt="Program Features Infographic" 
                      className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </section>

        {/* SECTION 8: TESTIMONIALS (RENAMED TO STUDENT REVIEWS) */}
        <section className="py-24 bg-gray-50">
          <div className="px-6 md:px-12 mb-12 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400"/>)}
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">Student Reviews</h2>
            <p className="text-gray-500">41,258 students and counting.</p>
          </div>
          <div className="overflow-x-auto pb-12 px-6 md:px-12 flex gap-6 no-scrollbar">
            {TESTIMONIALS.map((t, i) => (
              <GlassCard key={i} className="min-w-[320px] md:min-w-[420px] p-10" hoverEffect={true}>
                <Quote size={40} className="text-brand-primary/10 absolute top-6 right-6" />
                <p className="text-gray-700 italic mb-8 leading-relaxed text-lg font-medium">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-900 text-xl border-2 border-brand-primary/10 shadow-sm">{t.name[0]}</div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">{t.name}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.role} • {t.location}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-b border-gray-100">
          <div className="text-center mb-16"><h2 className="text-4xl font-display font-bold mb-4 text-gray-900">FAQ</h2><p className="text-gray-500 text-lg">Common questions from future pros.</p></div>
          <div className="space-y-4">{FAQ_ITEMS.map((item, index) => (<div key={index} className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all hover:shadow-lg"><button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full flex items-center justify-between p-8 text-left group"><span className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">{item.question}</span><ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} /></button><div className={`px-8 transition-all duration-300 overflow-hidden ${openFaqIndex === index ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-gray-600 font-medium leading-relaxed">{item.answer}</p></div></div>))}</div>
        </section>

        {/* SECTION 10: FINAL CONVERSION */}
        <section className="py-32 bg-gray-900 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] rounded-full animate-pulse"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Your future self is <br/> <span className="text-brand-primary">waiting for you.</span></h2>
                <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">In 15 days, your renders could be the talk of the industry. Or you could stay where you are. The choice is yours.</p>
                
                {/* Fixed Visibility here with theme="dark" */}
                <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} theme="dark" className="max-w-2xl bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-md" />
            </div>
        </section>
      </main>

      <footer className="bg-black py-16 px-6 text-center border-t border-white/5">
        <div className="flex justify-center mb-8 grayscale invert opacity-50"><Logo /></div>
        <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em]">© 2026 Avada Architectural AI. No more excuses.</p>
      </footer>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;