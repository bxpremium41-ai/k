
import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { StackedCarousel } from './components/StackedCarousel';
import { InteractiveChecklist } from './components/InteractiveChecklist';
import { TESTIMONIALS, FAQ_ITEMS, COURSES, VALUE_STACK_ITEMS, WHO_IS_THIS_FOR, WHO_IS_THIS_NOT_FOR, MENTORS, RATINGS, INCOME_TIERS } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import {
  Check, CheckCircle2, ArrowRight, Star, LogIn,
  Zap, TrendingUp, Sparkles, AlertCircle, XCircle,
  CheckCircle, Rocket, Briefcase, Play,
  Lock, Gem, BarChart3, Users, GraduationCap, ListChecks,
  Radio, Shield, ChevronDown, Quote, MousePointer2, Clock, History, Target,
  BrainCircuit, HelpCircle, DollarSign, Microscope, BookOpen, ShieldCheck, Gift, Award, X, Package, Layers,
  Heart, Globe, MessageCircle, Eye
} from 'lucide-react';
import { Course } from './types';

/* ─── LOGO ─── */
const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <div className="relative w-10 h-10 border border-white/20 flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:bg-brand-primary group-hover:border-brand-primary rounded-xl">
      <span className="font-display font-black text-xl tracking-tighter relative z-10 text-white">AV</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="font-display font-bold text-lg tracking-[0.25em] leading-none text-white">AVADA</span>
    </div>
  </div>
);

/* ─── MASTER CTA ─── */
interface MasterCTAProps { onClick: () => void; timeLeft: { h: number; m: number; s: number }; className?: string; dark?: boolean; text?: string; subtext?: string; }

const MasterCTA: React.FC<MasterCTAProps> = ({ onClick, timeLeft, className = "", dark = false, text = "Download Courses", subtext = "Instant Access • 7-Day Refund" }) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  const textColor = dark ? 'text-white' : 'text-white';

  return (
    <div className={`flex flex-col items-center gap-5 w-full max-w-xl mx-auto ${className}`}>
      <div className="flex items-end justify-between w-full px-2 mb-1">
        <div className="flex flex-col items-start">
          <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-brand-success mb-1`}>
            <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></div> 50% OFF TODAY
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className={`text-4xl sm:text-5xl font-display font-black tracking-tighter ${textColor}`}>$49</span>
            <span className="text-white/20 line-through text-lg font-bold">$199</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-brand-accent mb-1">
            Closing In:
          </div>
          <div className="flex items-center gap-1.5 font-mono font-bold text-xl sm:text-2xl tabular-nums text-brand-cyan">
            <span>{f(timeLeft.h)}</span><span className="text-white/20 -mt-1">:</span>
            <span>{f(timeLeft.m)}</span><span className="text-white/20 -mt-1">:</span>
            <span>{f(timeLeft.s)}</span>
          </div>
        </div>
      </div>

      <button onClick={onClick} className="group relative w-full cta-gradient text-white py-6 sm:py-7 px-4 sm:px-12 rounded-2xl transition-all duration-500 animate-glow-pulse hover:-translate-y-1 active:scale-[0.98] overflow-hidden border border-white/10 shadow-glow">
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4">
          <span className="text-lg sm:text-2xl font-black uppercase tracking-tight whitespace-nowrap">{text}</span>
          <div className="bg-white/20 p-1.5 sm:p-2 rounded-full group-hover:translate-x-2 transition-transform duration-300">
            <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 -left-full w-2/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:animate-[shine_1.5s_infinite]"></div>
        </div>
      </button>

      <div className="text-center text-xs font-bold text-white/40 uppercase tracking-widest">{subtext}</div>
    </div>
  );
};

/* ─── FAQ ACCORDION ─── */
const FAQAccordion: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-center justify-between text-left group">
        <span className="text-base sm:text-lg font-bold text-white/90 group-hover:text-brand-accent transition-colors pr-4">{question}</span>
        <ChevronDown size={20} className={`text-white/30 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-brand-accent' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[600px] pb-5' : 'max-h-0'}`}>
        <p className="text-white/50 leading-relaxed font-medium text-sm sm:text-base">{answer}</p>
      </div>
    </div>
  );
};

/* ─── SOCIAL PROOF TOAST ─── */
const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const names = ['Emily from NYC', 'Kenji from Tokyo', 'Sofia from Madrid', 'James from Sydney', 'Lisa from London', 'Carlos from Buenos Aires', 'Elena from Berlin', 'Lucas from São Paulo'];
  const times = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '15 minutes ago', '18 minutes ago', '22 minutes ago', '25 minutes ago'];

  useEffect(() => {
    const showToast = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % names.length);
        }, 500);
      }, 4000);
    };

    const initialTimeout = setTimeout(showToast, 8000);
    const interval = setInterval(showToast, 25000);

    return () => { clearTimeout(initialTimeout); clearInterval(interval); };
  }, []);

  return (
    <div className={`fixed bottom-20 md:bottom-6 left-4 z-50 transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="glass-card px-4 py-3 rounded-xl flex items-center gap-3 shadow-glow max-w-xs border-brand-success/30">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-success to-emerald-400 rounded-full flex items-center justify-center shrink-0">
          <Check size={14} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{names[currentIndex]}</p>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">downloaded courses {times[currentIndex]}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════ APP ═══════════════════════════════════════ */
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [enrolledRecently] = useState(Math.floor(Math.random() * 12) + 20);

  useEffect(() => {
    const calc = () => {
      const D = (2 * 3600 + 23 * 60 + 49) * 1000, now = Date.now(), r = D - (now % D);
      setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) });
    };
    const t = setInterval(calc, 1000); calc();
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const openGeneralModal = () => { setSelectedCourse(null); setIsModalOpen(true); };
  const openCourseModal = (course: Course) => { setSelectedCourse(course); setIsModalOpen(true); };

  return (
    <div className="min-h-screen bg-surface-0 text-white font-sans overflow-x-hidden selection:bg-brand-primary selection:text-white">

      {/* ─── STICKY NAV ─── */}
      <nav className="w-full z-50 sticky top-0 bg-surface-0/90 backdrop-blur-xl border-b border-white/5">
        <div className="bg-gradient-to-r from-brand-primary via-purple-500 to-brand-cyan text-white py-1.5 px-4 flex justify-center text-center text-[10px] font-black uppercase tracking-[0.15em]">
          {"\u26A1"} {enrolledRecently} people joined in the last hour • Price goes up soon
        </div>
        <div className="px-6 md:px-12 py-3 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"><LogIn size={14} /> Login</button>
            <button onClick={openGeneralModal} className="hidden md:block bg-white text-surface-0 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all">Download Courses $49</button>
          </div>
        </div>
      </nav>

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
          {/* Aurora blobs */}
          <div className="aurora-bg w-[600px] h-[600px] bg-brand-primary/20 top-[-200px] left-[-200px] animate-aurora"></div>
          <div className="aurora-bg w-[500px] h-[500px] bg-brand-cyan/10 top-[20%] right-[-200px] animate-aurora" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-grid opacity-30"></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                <div className="reveal inline-flex items-center gap-2.5 glass-card px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-brand-primary/30">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  <span className="text-white/80">Trusted by 50,000+ Students Worldwide</span>
                </div>

                <h1 className="reveal stagger-1 text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-[1.0] mb-6 tracking-tighter">
                  AI is replacing<br />
                  <span className="text-gradient">designers. Are you ready?</span>
                </h1>

                <p className="reveal stagger-2 text-lg sm:text-2xl text-white/60 font-medium max-w-2xl mb-4 leading-relaxed mx-auto lg:mx-0">
                  By 2027, <span className="text-red-400 font-bold">40% of design jobs</span> will require AI skills. Designers who adapt are earning <span className="text-brand-success font-bold">$5,000–$15,000/month.</span> Those who don't? They're already losing clients.
                </p>
                <p className="reveal stagger-2 text-base sm:text-lg text-white/40 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                  Download 6 courses + 10,000 assets + AI tools for <span className="text-white font-bold">just $49</span> — and become the designer firms are fighting to hire. <span className="text-brand-accent font-bold">50,000+ students already did.</span>
                </p>

                <div className="reveal stagger-3 w-full max-w-md mx-auto lg:mx-0 mb-8">
                  <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} text="Download All 6 Courses" />
                </div>

                <div className="reveal stagger-4 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 text-xs sm:text-sm font-bold text-white/40 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><CheckCircle2 className="text-brand-success" size={16} /> Instant Access</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="text-brand-success" size={16} /> 10,000+ Assets</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="text-brand-success" size={16} /> Lifetime Updates</span>
                </div>
              </div>

              {/* HERO VIDEO */}
              <div className="w-full lg:w-2/5 relative reveal stagger-5">
                <div className="relative w-full aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-primary/10 animate-float">
                  <iframe src="https://iframe.mediadelivery.net/embed/494628/3009186c-d8fe-400c-b1af-2787fdf042a1?autoplay=true&loop=true&muted=true&preload=true" className="w-full h-full object-cover" allow="autoplay; fullscreen" loading="lazy"></iframe>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-cyan/20 rounded-full blur-[40px] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SOCIAL PROOF STRIP ═══════════ */}
        <section className="py-6 bg-surface-1 border-y border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center">
              <div className="reveal">
                <div className="text-3xl sm:text-4xl font-display font-black text-white counter-animate">50,000+</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mt-1">Students Enrolled</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
              <div className="reveal stagger-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-white">42+</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mt-1">Countries</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
              <div className="reveal stagger-2">
                <div className="text-3xl sm:text-4xl font-display font-black text-brand-accent">4.8★</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mt-1">Avg Rating</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
              <div className="reveal stagger-3">
                <div className="text-3xl sm:text-4xl font-display font-black text-brand-success">$49</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mt-1">One-Time Price</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ INTERACTIVE CHECKLIST ═══════════ */}
        <section className="py-12 bg-surface-0 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="reveal">
              <InteractiveChecklist onCtaClick={openGeneralModal} />
            </div>
          </div>
        </section>

        {/* ═══════════ HONEST REQUEST ═══════════ */}
        <section className="py-16 sm:py-24 bg-surface-1 border-y border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
            <div className="reveal">
              <Shield size={32} className="text-brand-accent mx-auto mb-6 opacity-80" />
            </div>
            <h2 className="reveal stagger-1 text-2xl sm:text-4xl font-display font-bold text-white mb-6">A small, honest request.</h2>
            <div className="reveal stagger-2 glass-card p-6 sm:p-10 rounded-[2rem] border-l-4 border-brand-primary text-left bg-gradient-to-br from-brand-primary/10 to-transparent">
              <p className="text-white/80 text-lg leading-relaxed mb-6 font-medium">
                Look, we need to be real with you for a second.
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                We've poured months of work, research, and heart into building these courses. They work. 50,000+ students prove that. But they only work if <strong className="text-white">you actually use them.</strong>
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                If you're looking for a "magic button" that does the work while you sleep—<strong className="text-white">please don't buy this.</strong> Save your $49. Seriously.
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                But if you're willing to give us <strong className="text-white">15 days</strong> of real focus. If you'll watch the videos, do the exercises, and actually practice...
              </p>
              <p className="text-white font-bold text-lg sm:text-xl">
                We promise this will change your career forever. That's not hype. That's 50,000 students speaking.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ TWO-PHASE ENGINE ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-0 relative">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="reveal"><BrainCircuit className="text-brand-accent mx-auto mb-6" size={44} /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">The 2026 Workflow.</h2>
            <p className="reveal stagger-2 text-lg sm:text-xl text-white/40 font-medium max-w-2xl mx-auto mb-12 sm:mb-16">Most architects are stuck in 2015. Here is how you leapfrog them in 15 days.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="reveal-left p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] glass-card text-left relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-cyan mb-4">Phase 1 — Foundation</div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tighter mb-4">Precision & Structure</h3>
                  <p className="text-white/40 mb-6 leading-relaxed text-sm sm:text-base">AutoCAD + SketchUp. The backbone. Learn to draft wildly accurate plans and build complex 3D models fast. This is where you become dangerous.</p>
                  <div className="space-y-3 mb-6">
                    {['Construction-ready drafting in hours', 'Complex 3D modeling without crashes', 'Speed shortcuts that save 60% of time'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 glass-card p-3 sm:p-4 rounded-xl font-medium text-xs sm:text-sm text-white/70"><CheckCircle2 size={16} className="text-brand-cyan shrink-0" /> {p}</div>
                    ))}
                  </div>
                  <div className="glass-card p-4 rounded-xl border-brand-cyan/20">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">Student Result</p>
                    <p className="text-sm text-white/70 italic">"I cut my drafting time from 8 hours to 3 hours in the first week." — James W., Sydney</p>
                  </div>
                </div>
              </div>
              <div className="reveal-right p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-brand-primary/20 to-purple-500/10 border border-brand-primary/20 text-left relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent mb-4">Phase 2 — Superpower</div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tighter mb-4">Render & AI Magic</h3>
                  <p className="text-white/40 mb-6 leading-relaxed text-sm sm:text-base">V-Ray, Lumion, D5 + AI. Turn models into photographs. Create cinematic walkthroughs. Generate concepts in seconds. This is where you start earning serious money.</p>
                  <div className="space-y-3 mb-6">
                    {['Photorealistic renders clients can\'t tell from photos', 'Cinematic walkthroughs that close deals', 'AI concept generation in minutes'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 glass-card p-3 sm:p-4 rounded-xl font-medium text-xs sm:text-sm text-white/70"><Zap size={16} className="text-brand-accent shrink-0" /> {p}</div>
                    ))}
                  </div>
                  <div className="glass-card p-4 rounded-xl border-brand-accent/20">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">Student Result</p>
                    <p className="text-sm text-white/70 italic">"I closed a $22,000 project on Monday with a walkthrough I made Sunday night. Best ROI of my life." — Sophie L., Paris</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ VIDEO PROOF ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-1 relative overflow-hidden">
          <div className="aurora-bg w-[500px] h-[500px] bg-brand-primary/15 top-[-100px] right-[-200px] animate-aurora"></div>
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <div className="reveal inline-flex items-center gap-2 text-brand-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Play size={14} fill="currentColor" /> Watch the transformation
            </div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">Zero to Photoreal.<br /><span className="text-gradient">In 15 Days.</span></h2>
            <p className="reveal stagger-2 text-white/40 max-w-xl mx-auto mb-10">This is what our students create after just 15 days. Not months. Not years. Fifteen days of focused practice.</p>
            <div className="reveal-scale relative aspect-video rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 bg-surface-2 shadow-2xl shadow-brand-primary/10">
              <iframe src="https://iframe.mediadelivery.net/embed/494628/3009186c-d8fe-400c-b1af-2787fdf042a1?autoplay=true&loop=true&muted=true&preload=true" className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" loading="lazy"></iframe>
            </div>
          </div>
        </section>

        {/* ═══════════ INCOME TRANSFORMATION ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-0 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="reveal"><DollarSign className="text-brand-success mx-auto mb-6" size={44} /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">10× Your Design Income</h2>
            <p className="reveal stagger-2 text-white/40 text-lg max-w-2xl mx-auto mb-12">Here's what happens to your pricing when you stop guessing and start using a professional workflow.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {INCOME_TIERS.map((tier, i) => (
                <div key={i} className={`reveal stagger-${Math.min(i + 1, 4)} glass-card p-6 sm:p-8 rounded-2xl text-left group hover:border-brand-success/30 transition-all`}>
                  <div className="text-3xl mb-4">{tier.icon}</div>
                  <h4 className="font-bold text-white text-base sm:text-lg mb-4">{tier.label}</h4>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Before</div>
                      <div className="text-lg font-bold text-white/30 line-through">{tier.before}</div>
                    </div>
                    <ArrowRight size={20} className="text-brand-success shrink-0" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-success mb-1">After</div>
                      <div className="text-lg font-bold text-brand-success">{tier.after}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal mt-12 glass-card p-6 rounded-2xl border-brand-success/20 max-w-lg mx-auto">
              <p className="text-white/60 text-sm mb-4">Your investment: <span className="text-white font-bold">$49 once.</span> Average student ROI: <span className="text-brand-success font-bold">$4,000+ within 90 days.</span></p>
              <button onClick={openGeneralModal} className="group w-full cta-gradient text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-glow text-sm">
                Download Courses & Start Earning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════ WHAT YOU GET (SWIPE FILE) ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-1 relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">Your Secret Weapon Toolkit</h2>
              <p className="reveal stagger-2 text-white/50 text-lg">Stop wasting hours searching Google for assets. We give you everything—included free.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="reveal-left glass-card p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-brand-cyan/30 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px] group-hover:bg-brand-cyan/20 transition-all"></div>
                <Layers size={48} className="text-brand-cyan mb-6" />
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">10,000+ Textures</h3>
                <p className="text-white/50 mb-4">Premium 4K textures: wood, marble, concrete, fabric, metal, tile. Every material you'll ever need for any project, any style.</p>
                <p className="text-white/30 text-sm mb-6 italic">"These textures alone saved me $500/month in downloads." — Amara O.</p>
                <div className="text-brand-cyan font-bold text-sm uppercase tracking-widest flex items-center gap-2">Worth $499 • Included Free <Check size={16} /></div>
              </div>
              <div className="reveal-right glass-card p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-brand-primary/30 transition-all cursor-pointer">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/20 transition-all"></div>
                <Package size={48} className="text-brand-primary mb-6" />
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">2,000+ 3D Models</h3>
                <p className="text-white/50 mb-4">Sofas, chairs, lighting, plants, cars, décor. Don't waste time modeling furniture from scratch. Just drag, drop, and render.</p>
                <p className="text-white/30 text-sm mb-6 italic">"I stopped modeling furniture entirely. Just drag and drop. Output tripled." — Elena V.</p>
                <div className="text-brand-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2">Worth $399 • Included Free <Check size={16} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ THE RESULTS (LIFESTYLE) ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-0 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="reveal text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">Here's what happens<br /><span className="text-gradient">when you switch.</span></h2>
            <p className="reveal stagger-1 text-white/40 text-lg max-w-xl mx-auto mb-12">It's not just about rendering faster. It's about transforming your entire career and lifestyle.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="reveal stagger-1 glass-card p-6 rounded-2xl border-brand-success/20">
                <div className="text-3xl mb-4">💰</div>
                <h4 className="font-bold text-white text-lg mb-2">You Charge 3–10× More</h4>
                <p className="text-white/50 text-sm">Clients pay a premium for speed and photorealism. You deliver both. Suddenly $100/hr feels cheap—because it is.</p>
              </div>
              <div className="reveal stagger-2 glass-card p-6 rounded-2xl border-brand-accent/20">
                <div className="text-3xl mb-4">⏰</div>
                <h4 className="font-bold text-white text-lg mb-2">You Go Home at 5pm</h4>
                <p className="text-white/50 text-sm">No more all-nighters grinding on renders. Finish your work by 5pm. Have dinner with your family. Have a life.</p>
              </div>
              <div className="reveal stagger-3 glass-card p-6 rounded-2xl border-brand-cyan/20">
                <div className="text-3xl mb-4">😎</div>
                <h4 className="font-bold text-white text-lg mb-2">You Become the AI Expert</h4>
                <p className="text-white/50 text-sm">Stop fearing AI replacing you. You ARE the person using AI. Firms hire YOU for the skills everyone else is struggling to learn.</p>
              </div>
            </div>

            {/* AI WARNING */}
            <div className="reveal mt-16 glass-card p-6 sm:p-10 rounded-[2rem] border-l-4 border-red-500 text-left max-w-4xl mx-auto bg-gradient-to-r from-red-500/10 to-transparent">
              <div className="flex items-start gap-4">
                <AlertCircle size={28} className="text-red-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">The AI Shift Is Already Happening</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">Midjourney, DALL·E, and AI rendering tools are changing architecture <strong className="text-white">right now.</strong> Firms are hiring designers who know AI—and laying off those who don't. In 12 months, the gap between AI-skilled designers and everyone else will be <strong className="text-red-400">uncloseable.</strong></p>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">Our students already use AI to generate concepts in minutes, create photorealistic renders 10× faster, and charge <strong className="text-brand-success">$2,000–$8,000 per project</strong> instead of $200–$500.</p>
                  <button onClick={openGeneralModal} className="group cta-gradient text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-all shadow-glow">
                    Get AI-Ready Now — Download Courses <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ WHO IS THIS FOR ═══════════ */}
        <section className="py-24 bg-surface-1 border-t border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-12 tracking-tighter text-center">Is This For You?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="reveal-left bg-surface-0 p-8 rounded-[2.5rem] border border-brand-success/20">
                <h3 className="text-xl font-display font-bold text-brand-success mb-6 flex items-center gap-3"><CheckCircle size={24} /> This IS for you if…</h3>
                <div className="space-y-4">
                  {WHO_IS_THIS_FOR.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Check size={18} className="text-brand-success mt-1 shrink-0" />
                      <p className="text-white/70 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal-right bg-surface-0 p-8 rounded-[2.5rem] border border-red-500/20">
                <h3 className="text-xl font-display font-bold text-red-500 mb-6 flex items-center gap-3"><XCircle size={24} /> This is NOT for you if…</h3>
                <div className="space-y-4">
                  {WHO_IS_THIS_NOT_FOR.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <X size={18} className="text-red-500 mt-1 shrink-0" />
                      <p className="text-white/70 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal mt-10 text-center">
              <button onClick={openGeneralModal} className="group cta-gradient text-white px-10 py-5 rounded-2xl text-base font-black uppercase tracking-widest inline-flex items-center gap-3 hover:-translate-y-1 transition-all shadow-glow">
                Download All 6 Courses — $49 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/30 text-xs mt-3 font-bold uppercase tracking-widest">7-Day Money-Back Guarantee • Instant Access</p>
            </div>
          </div>
        </section>

        {/* ═══════════ COURSE CAROUSEL ═══════════ */}
        <section className="py-20 bg-surface-0 overflow-hidden text-center">
          <h2 className="mb-8 text-2xl font-bold text-white/40 uppercase tracking-widest">Everything You'll Master</h2>
          <StackedCarousel onCourseClick={openCourseModal} />
        </section>

        {/* ═══════════ VALUE STACK ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-1">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <h2 className="reveal stagger-1 text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tighter">The Math Doesn't Lie</h2>
            <p className="reveal stagger-2 text-white/40 mb-8">Here's what you'd pay if you bought all of this separately:</p>

            <div className="reveal-scale glass-card p-6 sm:p-10 rounded-[2rem] border-2 border-brand-primary/30 shadow-glow mb-12 text-left">
              <div className="space-y-4 mb-8">
                {VALUE_STACK_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-success/10 p-1 rounded-full"><Check size={12} className="text-brand-success" /></div>
                      <span className="text-sm font-medium text-white/80">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white/30 line-through">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Total Real Value</span>
                  <span className="text-xl font-bold text-white/30 line-through">$3,384</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-white uppercase tracking-widest">You Pay Today</span>
                  <span className="text-5xl font-display font-black text-brand-primary">$49</span>
                </div>
                <p className="text-xs text-white/30 mt-2 text-right">That's 98% off. Not a typo.</p>
              </div>
            </div>
            <div className="reveal flex justify-center">
              <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} className="glass-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem]" dark text="Download Courses Now" />
            </div>
          </div>
        </section>

        {/* ═══════════ RATINGS ═══════════ */}
        <section className="py-16 sm:py-20 bg-surface-0 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="reveal text-center text-2xl sm:text-3xl font-display font-bold text-white mb-10 tracking-tighter">Top Ratings Across Major Review Platforms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {RATINGS.map((r, i) => (
                <div key={i} className={`reveal stagger-${i + 1} glass-card p-6 rounded-2xl text-center group hover:border-white/20 transition-all`}>
                  <div className="text-lg font-bold text-white mb-2">{r.platform}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-2xl font-display font-black text-white mb-1">{r.rating}/5</div>
                  <div className="text-xs text-white/40 font-bold uppercase tracking-widest">{r.reviews} reviews</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section className="py-20 bg-surface-1 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="reveal mb-4">
              <div className="inline-flex items-center gap-2 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <MessageCircle size={14} /> Real Student Stories
              </div>
            </div>
            <h2 className="reveal stagger-1 text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tighter">50,000+ Students Can't Be Wrong.</h2>
            <p className="reveal stagger-2 text-white/40 text-lg max-w-xl mx-auto mb-12">Real outcomes from architects, designers, and visualizers across the globe.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`reveal stagger-${Math.min((i % 3) + 1, 3)} glass-card p-6 sm:p-8 rounded-[2rem] text-left relative`}>
                  <Quote className="absolute top-6 right-6 text-white/5" size={36} />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-white/80 leading-relaxed mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-sm">{t.name.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{t.role} • {t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ MENTORS ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-0 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="reveal"><GraduationCap className="text-brand-accent mx-auto mb-6" size={44} /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tighter">Your Mentors</h2>
            <p className="reveal stagger-2 text-white/40 text-lg mb-12">Industry veterans who've taught 50,000+ students and worked on 200+ real projects.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {MENTORS.map((mentor, i) => (
                <div key={i} className={`reveal stagger-${i + 1} glass-card p-8 rounded-[2rem] text-left relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[60px]"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-cyan rounded-2xl flex items-center justify-center mb-6">
                      <GraduationCap size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">{mentor.name}</h3>
                    <p className="text-xs text-brand-accent font-bold uppercase tracking-widest mb-4">{mentor.title}</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.specialties.map((s, j) => (
                        <span key={j} className="glass-card px-3 py-1 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 text-brand-success font-bold"><Users size={12} /> {mentor.students} students</span>
                      <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star size={12} fill="currentColor" /> {mentor.rating}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ RISK REVERSAL ═══════════ */}
        <section className="py-16 sm:py-24 bg-surface-1 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div className="reveal">
              <ShieldCheck size={56} className="text-brand-success mx-auto mb-6" />
            </div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-tighter">Zero Risk. 7-Day Money-Back Guarantee.</h2>
            <p className="reveal stagger-2 text-white/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Try everything for 7 full days. Watch the courses. Download the assets. Practice the workflows. If you're not completely blown away—email us and we'll refund every penny. No questions. No hassle. No hard feelings.
            </p>
            <div className="reveal stagger-3 glass-card p-6 rounded-2xl inline-flex items-center gap-4 border-brand-success/30">
              <Lock size={20} className="text-brand-success" />
              <span className="text-sm font-bold text-white/70">Secure checkout • Protected by Stripe & PayPal • Your data is safe</span>
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-20 sm:py-28 bg-surface-0">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="reveal text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tighter">Still Have Questions?</h2>
            <p className="reveal stagger-1 text-center text-white/40 mb-12">We've answered the most common ones. If yours isn't here, email us — we reply fast.</p>
            <div className="reveal stagger-2 glass-card p-6 sm:p-10 rounded-[2.5rem]">
              {FAQ_ITEMS.map((item, i) => (
                <FAQAccordion key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="py-24 sm:py-32 bg-surface-1 relative overflow-hidden">
          <div className="aurora-bg w-[600px] h-[600px] bg-brand-primary/20 top-[-200px] left-[-200px] animate-aurora"></div>
          <div className="aurora-bg w-[400px] h-[400px] bg-brand-cyan/15 bottom-[-100px] right-[-150px] animate-aurora" style={{ animationDelay: '3s' }}></div>
          <div className="absolute inset-0 bg-grid opacity-20"></div>

          <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
            <div className="reveal">
              <Rocket size={48} className="text-brand-accent mx-auto mb-6" />
            </div>
            <h2 className="reveal stagger-1 text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
              In 6 months, AI-skilled<br />designers will earn <span className="text-gradient">5× more.</span>
            </h2>
            <p className="reveal stagger-2 text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
              The designers who learn AI workflows <strong className="text-white">today</strong> will dominate the market. The ones who wait will be competing on price with AI tools that cost $20/month.
            </p>
            <p className="reveal stagger-2 text-white/70 text-base max-w-lg mx-auto mb-10">
              50,000+ students already made the switch. <strong className="text-brand-success">Average income increase: $3,400/month.</strong>
            </p>

            <div className="reveal stagger-3 max-w-md mx-auto">
              <MasterCTA onClick={openGeneralModal} timeLeft={timeLeft} text="Download Courses Now" subtext="7-Day Refund • Lifetime Access • Instant Download" />
            </div>

            <div className="reveal stagger-4 mt-10 flex flex-wrap justify-center gap-6 text-xs text-white/30 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-success" /> 7-Day Refund</span>
              <span className="flex items-center gap-1.5"><Lock size={14} className="text-brand-cyan" /> Secure Checkout</span>
              <span className="flex items-center gap-1.5"><Globe size={14} className="text-brand-accent" /> 42+ Countries</span>
            </div>
          </div>
        </section>

      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-surface-0 py-12 px-6 text-center border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-4">Avada Architectural AI • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] text-white/20 font-bold uppercase tracking-widest">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </footer>

      {/* ─── STICKY MOBILE CTA ─── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface-1/90 backdrop-blur-xl border-t border-white/10 p-2 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <button onClick={openGeneralModal} className="w-full relative group overflow-hidden bg-brand-primary text-white rounded-xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all h-14 flex items-center px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-accent/20 to-brand-primary"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[shine_3s_infinite]"></div>

          <div className="relative z-10 w-full flex items-center justify-between">
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-yellow-300 animate-pulse drop-shadow-md">
                ENDS {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
              </span>
              <span className="text-sm font-black uppercase tracking-[0.15em] text-white">
                Download Now
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-300 line-through opacity-80">$99</span>
              <span className="text-xl font-display font-black text-white">$49</span>
            </div>
          </div>
        </button>
      </div>

      {/* ─── SOCIAL PROOF TOAST ─── */}
      <SocialProofToast />

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;
