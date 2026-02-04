import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { CourseRow } from './components/CourseRow';
import { StackedCarousel } from './components/StackedCarousel';
import { TESTIMONIALS, FAQ_ITEMS, ROWS } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { 
  ChevronDown, CheckCircle2, ArrowRight, Timer, Quote, Star, LogIn, 
  Zap, TrendingUp, Sparkles, Target, Wallet, AlertCircle, XCircle, 
  CheckCircle, ShieldCheck, Rocket, Trophy, Briefcase, Globe,
  ArrowDownCircle, Lock, Gem, BarChart3, HelpCircle, Users, GraduationCap, Building2, Lightbulb
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

const DownloadCTA = ({ onClick, className = "" }: { onClick: () => void, className?: string }) => (
  <button 
    onClick={onClick} 
    className={`group relative bg-[#10b981] hover:bg-[#059669] text-white px-10 py-5 rounded-[2rem] transition-all duration-300 shadow-[0_20px_40px_-12px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.6)] hover:-translate-y-1 active:scale-95 flex items-center gap-6 ${className}`}
  >
    <div className="bg-white/20 p-2 rounded-full hidden sm:block">
      <ShieldCheck size={24} className="text-white" />
    </div>
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
       <span className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">Download</span>
       <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-80 mt-1">All Courses + Software</span>
    </div>
    <div className="ml-auto bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform">
      <ArrowRight size={24} className="text-white" />
    </div>
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem] pointer-events-none">
       <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_infinite]"></div>
    </div>
  </button>
);

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
  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">
      <style>{`
        @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes blink-red { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.9); } }
        .animate-blink-red { animation: blink-red 2s infinite ease-in-out; }
        .bg-grid-pattern { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* EMERGENCY SCARCITY BAR */}
      <div className="bg-red-600 text-white py-2.5 px-4 flex items-center justify-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] animate-pulse sticky top-0 z-[60] shadow-xl">
        <AlertCircle size={14} /> Only 14 spots remaining for the 2026 AI Certification Cohort
      </div>

      <nav className="w-full z-50 bg-white border-b border-gray-100">
        <div className="bg-gray-900 text-white py-2 px-4 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-3"><span className="text-gray-500 line-through text-xs font-bold">$299</span><div className="bg-white text-gray-900 font-black px-2 py-0.5 rounded text-sm">$49</div></div>
          <div className="flex items-center gap-2 font-display font-bold text-sm tracking-wider text-brand-primary bg-gray-800 px-3 py-1 rounded-md border border-gray-700">
               <span>{formatTime(timeLeft.h)}</span><span className="animate-pulse text-gray-500">:</span><span>{formatTime(timeLeft.m)}</span><span className="animate-pulse text-gray-500">:</span><span>{formatTime(timeLeft.s)}</span>
          </div>
        </div>
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
             <button onClick={openGeneralModal} className="bg-brand-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-glow hover:scale-105 transition-transform">Get Instant Access</button>
             <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-primary bg-gray-50 px-4 py-2 rounded-full border border-gray-200 transition-colors"><LogIn size={16} /> Student Login</button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO: THE HOOK */}
        <section className="relative min-h-[90vh] w-full flex items-center bg-white pt-12 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-red-100 shadow-sm">
                     <Gem size={14} /> The #1 Rated Career Accelerator for Designers
                  </div>
                  <h1 className="text-4xl md:text-7xl font-display font-bold leading-[1.05] mb-8 text-gray-900 tracking-tight">
                    Stop Working for Peanuts. <br/>
                    <span className="text-brand-primary italic">Charge 10x More.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed">
                    Most designers stay broke because they are slow. We give you the <span className="text-gray-900 font-bold">AI "Super-Brain"</span> and <span className="text-gray-900 font-bold">12 Master Courses</span> to turn rough sketches into $5,000 renders in minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <DownloadCTA onClick={openGeneralModal} />
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="flex -space-x-2 mb-2">
                           {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user"/></div>)}
                           <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-primary text-[8px] flex items-center justify-center text-white font-bold">+41k</div>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-tight">
                           Join the world's most elite circle
                        </p>
                    </div>
                  </div>
              </div>
              <div className="w-full lg:w-2/5 flex flex-col items-center">
                   <div className="relative w-full aspect-[4/5] max-w-[450px]">
                        <div className="absolute inset-0 bg-brand-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.2)] border-4 border-white bg-black relative">
                             <iframe src="https://iframe.mediadelivery.net/embed/489113/562b87e6-4ac9-40b6-b343-479ada547387?autoplay=true&loop=true&muted=true" className="w-full h-full object-cover" allow="autoplay; fullscreen"></iframe>
                        </div>
                   </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: MENTOR GUIDANCE SECTION (STUDENT VS PRO) */}
        <section className="py-24 bg-white border-y border-gray-100">
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
                    {/* Sidebar Tabs */}
                    <div className="w-full lg:w-1/3 bg-gray-900 p-8 lg:p-12 flex flex-col gap-4">
                        <button 
                            onClick={() => setMentorTab('student')}
                            className={`flex items-center gap-4 p-6 rounded-3xl transition-all text-left ${mentorTab === 'student' ? 'bg-brand-primary text-white shadow-glow translate-x-2' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            <div className={`p-3 rounded-2xl ${mentorTab === 'student' ? 'bg-white/20' : 'bg-gray-800'}`}><GraduationCap size={24} /></div>
                            <div>
                                <h4 className="font-bold text-lg">The Hungry Student</h4>
                                <p className="text-xs opacity-60">"I want to be industry-ready."</p>
                            </div>
                        </button>
                        <button 
                            onClick={() => setMentorTab('pro')}
                            className={`flex items-center gap-4 p-6 rounded-3xl transition-all text-left ${mentorTab === 'pro' ? 'bg-brand-primary text-white shadow-glow translate-x-2' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            <div className={`p-3 rounded-2xl ${mentorTab === 'pro' ? 'bg-white/20' : 'bg-gray-800'}`}><Building2 size={24} /></div>
                            <div>
                                <h4 className="font-bold text-lg">The Busy Professional</h4>
                                <p className="text-xs opacity-60">"I want to buy back my time."</p>
                            </div>
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 lg:p-16 relative">
                        {mentorTab === 'student' ? (
                            <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
                                <div className="flex items-center gap-3 text-brand-primary font-black uppercase tracking-[0.2em] text-sm">
                                    <Target size={18} /> The Student Roadmap
                                </div>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                                    Skip the "Entry-Level" Trap and start as a <span className="italic underline decoration-brand-primary/30">Senior Specialist.</span>
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Architecture school teaches you history and theory, but it doesn't teach you how to <span className="text-gray-900 font-bold">win a $5,000 project.</span> Students who use Avada aren't looking for internships; they're getting hired as "Lead Visualizers" because they know tools that even their professors don't.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    {[
                                        { t: "Build a Viral Portfolio", d: "Use AI to create concepts that look like $100M projects." },
                                        { t: "Master 12+ Tools", d: "From AutoCAD to Unreal Engine 5. Be the 'Software God'." },
                                        { t: "Learn Client Psychology", d: "How to present work so they say YES in the first meeting." },
                                        { t: "The Pro Asset Library", d: "10,000 textures so you don't waste time searching." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0"><CheckCircle2 size={20} /></div>
                                            <div><h5 className="font-bold text-gray-900 text-sm">{item.t}</h5><p className="text-xs text-gray-500">{item.d}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
                                <div className="flex items-center gap-3 text-brand-primary font-black uppercase tracking-[0.2em] text-sm">
                                    <Rocket size={18} /> The Professional Upgrade
                                </div>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                                    Turn your 40-hour work week into <span className="italic underline decoration-brand-primary/30">10 hours of pure creative flow.</span>
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    You're tired. You spend your weekends rendering. You're losing bids to younger firms using AI. <span className="text-gray-900 font-bold">It's time to fight back.</span> Our Professional track focuses on speed, automation, and photorealism that kills the competition.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    {[
                                        { t: "AI Workflow Integration", d: "Reduce render times from 8 hours to 8 minutes." },
                                        { t: "Cinema-Grade Quality", d: "Create Lumion and Unreal walkthroughs that feel like movies." },
                                        { t: "Business Templates", d: "Proposal docs and pricing strategies used by top firms." },
                                        { t: "Direct Support", d: "Our team helps you solve project bugs in under 15 mins." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0"><Zap size={20} /></div>
                                            <div><h5 className="font-bold text-gray-900 text-sm">{item.t}</h5><p className="text-xs text-gray-500">{item.d}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mt-12 flex flex-col md:flex-row items-center gap-6 p-8 bg-white/50 border border-white rounded-[2rem] backdrop-blur-sm">
                             <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><Lightbulb size={32} /></div>
                             <div>
                                <p className="text-gray-900 font-bold italic">"This isn't just learning; it's an unfair advantage. Whether you're in a dorm room or a boardroom, AI is the new baseline. Don't be the person still drawing lines by hand while others build empires."</p>
                                <div className="mt-2 text-xs font-black uppercase tracking-widest text-gray-400">— Avada Founder & Architect</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* LOSS AVERSION CALCULATOR (PAIN POINT) */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                           <BarChart3 size={14} /> The Cost of Inaction
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                            You are losing <span className="text-brand-primary">$3,400+</span> <br/> every single month.
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            While you spend 10 hours on a single manual render, our students use <span className="text-white font-bold">AI Workflows</span> to finish 5 projects in that same time. 
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                <span className="text-gray-400">Manual Modeling (Old Way)</span>
                                <span className="font-bold text-red-400">12 Hours / $200</span>
                            </div>
                            <div className="bg-brand-primary/10 p-4 rounded-2xl border border-brand-primary/20 flex justify-between items-center">
                                <span className="text-brand-primary font-bold">AI Workflow (Our Way)</span>
                                <span className="font-bold text-brand-success">15 Minutes / $200</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 bg-white rounded-[3rem] p-10 text-gray-900 shadow-2xl relative">
                        <div className="absolute -top-4 -right-4 bg-brand-success text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest rotate-6">Income Leak Detected</div>
                        <h3 className="text-2xl font-bold mb-6">The Success Gap</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0"><XCircle className="text-red-500" /></div>
                                <div><h4 className="font-bold">Average Designer</h4><p className="text-sm text-gray-500">Earns $15,000/yr. Works 60hrs/week. Always tired.</p></div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle className="text-brand-success" /></div>
                                <div><h4 className="font-bold">Avada Pro</h4><p className="text-sm text-gray-500">Earns $85,000/yr. Works 20hrs/week. Respected expert.</p></div>
                            </div>
                            <button onClick={openGeneralModal} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 mt-4">
                                Close the gap today <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* THE "SECRET VAULT" VALUE STACK (LURE) */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">What's in the Secret Vault?</h2>
                    <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">This isn't just a course. It's an entire design business downloaded to your computer.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { t: "12 Master Courses", d: "Lifetime access to every lesson.", v: "$1,499", i: <Rocket className="text-brand-primary" /> },
                        { t: "10,000+ Pro Textures", d: "Wood, Stone, Glass, 4K resolution.", v: "$299", i: <Gem className="text-brand-primary" /> },
                        { t: "AI Prompt Library", d: "Copy-paste to get viral house ideas.", v: "$199", i: <Sparkles className="text-brand-primary" /> },
                        { t: "Project Source Files", d: "All my 3ds Max & Revit files.", v: "$499", i: <Briefcase className="text-brand-primary" /> }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all group">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">{item.i}</div>
                             <h4 className="font-bold text-lg mb-2">{item.t}</h4>
                             <p className="text-sm text-gray-500 mb-4">{item.d}</p>
                             <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">Value: {item.v}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-16 p-10 bg-gray-900 text-white rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div>
                        <h3 className="text-3xl font-bold mb-2">Total Value: <span className="line-through text-gray-500">$2,496</span></h3>
                        <p className="text-brand-primary text-xl font-black">Your Price: $49 (One-Time)</p>
                    </div>
                    <button onClick={openGeneralModal} className="px-10 py-5 bg-brand-success hover:bg-emerald-600 text-white font-black rounded-2xl shadow-glow-success text-lg flex items-center gap-3">
                        Claim the Vault <Gem size={20} />
                    </button>
                </div>
            </div>
        </section>

        {/* STACKED CAROUSEL - THE SHOWCASE */}
        <section className="py-12 bg-gray-50 overflow-hidden">
            <StackedCarousel onCourseClick={openCourseModal} />
        </section>

        {/* REVERSE PSYCHOLOGY (THE FILTER) */}
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-red-50 rounded-[4rem] p-12 md:p-20 border-4 border-dashed border-red-200 text-center relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl">
                       <AlertCircle className="inline mr-2" /> PLEASE READ CAREFULLY
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-10 leading-tight">
                        This is NOT for everyone.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mb-12">
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
                    <p className="text-gray-500 italic mb-10">We limit intakes to ensure our support team can help every student properly. If you aren't serious, please leave the spot for someone who is.</p>
                    <button onClick={openGeneralModal} className="inline-flex items-center gap-3 bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl">
                        I am serious. Let's start. <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </section>

        {/* LIBRARY SECTION */}
        <section id="courses-section" className="relative z-10 py-24 bg-white border-t border-gray-100">
           <div className="px-6 md:px-12">
                <div className="inline-flex items-center gap-2 bg-gray-900 text-white text-[10px] font-black px-4 py-1.5 rounded-md mb-6 uppercase tracking-widest">Global Standards</div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">Explore the Library</h2>
           </div>
           <div className="space-y-16">
            {ROWS.map((row, idx) => (
                <CourseRow key={idx} title={row.title} courses={row.courses} onCourseClick={openCourseModal} />
            ))}
           </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-gray-50">
          <div className="px-6 md:px-12 mb-12 flex flex-col items-center text-center">
             <div className="flex items-center gap-1 mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400"/>)}
             </div>
             <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">Join the Inner Circle</h2>
             <p className="text-gray-500">41,258 students and counting. Here is what they say.</p>
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

        {/* FAQ */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">FAQ</h2>
            <p className="text-gray-500 text-lg">Common questions from future pros.</p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all hover:shadow-lg">
                <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full flex items-center justify-between p-8 text-left group">
                  <span className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">{item.question}</span>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-8 transition-all duration-300 overflow-hidden ${openFaqIndex === index ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 font-medium leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CONVERSION TRIGGER */}
        <section className="py-32 bg-gray-900 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] rounded-full animate-pulse"></div>
            <div className="container mx-auto px-6 relative z-10">
                 <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Your future self is <br/> <span className="text-brand-primary">waiting for you.</span></h2>
                 <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">In 15 days, your renders could be the talk of the industry. Or you could stay where you are. The choice is yours.</p>
                 <div className="flex flex-col items-center gap-8">
                    <DownloadCTA onClick={openGeneralModal} />
                    <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-success"/> SSL Secure</div>
                        <div className="flex items-center gap-2"><Trophy size={18} className="text-brand-success"/> #1 Choice 2026</div>
                        <div className="flex items-center gap-2"><Users size={18} className="text-brand-success"/> 41k+ Enrolled</div>
                    </div>
                 </div>
            </div>
        </section>
      </main>

      <footer className="bg-black py-16 px-6 text-center border-t border-white/5">
        <div className="flex justify-center mb-8 grayscale invert opacity-50"><Logo /></div>
        <div className="flex justify-center gap-8 mb-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Refunds</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em]">© 2026 Avada Architectural AI. No more excuses.</p>
      </footer>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;