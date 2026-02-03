import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { CourseRow } from './components/CourseRow';
import { StackedCarousel } from './components/StackedCarousel';
import { TESTIMONIALS, FAQ_ITEMS, ROWS } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { ChevronDown, CheckCircle2, ArrowRight, Timer, Quote, Star, LogIn, Zap, TrendingUp, Sparkles, Target, Wallet, AlertCircle, XCircle, CheckCircle } from 'lucide-react';
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
  const scrollToCourses = () => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">
      <style>{`
        @keyframes blink-red {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
        .animate-blink-red { animation: blink-red 2s infinite ease-in-out; }
        .reveal-line { overflow: hidden; display: block; width: 100%; margin-bottom: 0.1em; }
        .reveal-text { animation: slide-up-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; display: block; transform: translateY(100%); }
        @keyframes slide-up-reveal {
          0% { transform: translateY(100%); opacity: 0; filter: blur(10px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .bg-grid-pattern { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px); }
        .btn-glass {
           position: relative; overflow: hidden; background: #D90429;
           box-shadow: 0 10px 30px -10px rgba(217, 4, 41, 0.5);
           transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-glass::after {
          content: ''; position: absolute; top: 0; left: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-15deg); animation: button-shimmer 2.5s infinite linear;
        }
        @keyframes button-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* PROBLEM ALERT BAR */}
      <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-3 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] animate-pulse">
        <AlertCircle size={14} /> Stop losing high-paying clients to better renders
      </div>

      {/* FLOATING TOAST */}
      <div className={`fixed bottom-8 left-4 md:left-8 z-[100] transition-all duration-500 ${showToast ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'}`}>
          <div className="bg-white border border-gray-100 shadow-2xl p-4 rounded-2xl flex items-center gap-4 max-w-[280px]">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><CheckCircle2 size={20} /></div>
              <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Enrollment</span>
                  <p className="text-xs text-gray-800 leading-snug"><strong className="font-bold">{joiners[currentJoinerIndex]?.name}</strong> joined.</p>
                  <span className="text-[9px] text-brand-primary font-medium mt-0.5">{joiners[currentJoinerIndex]?.time}</span>
              </div>
          </div>
      </div>

      <nav className="w-full z-50 bg-white">
        <div className="bg-gray-900 text-white py-2 px-4 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-3"><span className="text-gray-500 line-through text-xs font-bold">$99</span><div className="bg-white text-gray-900 font-black px-2 py-0.5 rounded text-sm">$49</div></div>
          <div className="flex items-center gap-2 font-display font-bold text-sm tracking-wider text-brand-primary bg-gray-800 px-3 py-1 rounded-md border border-gray-700">
               <span>{formatTime(timeLeft.h)}</span><span className="animate-pulse text-gray-500">:</span><span>{formatTime(timeLeft.m)}</span><span className="animate-pulse text-gray-500">:</span><span>{formatTime(timeLeft.s)}</span>
          </div>
        </div>
        <div className="px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-100">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
             <button onClick={openGeneralModal} className="bg-brand-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-glow">Start Learning Now</button>
             <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-primary bg-gray-50 px-4 py-2 rounded-full border border-gray-200"><LogIn size={16} /> Login</button>
          </div>
        </div>
      </nav>

      <main>
        {/* REDESIGNED HERO: THE PROBLEM HOOK */}
        <section className="relative min-h-[90vh] w-full flex items-center bg-white pt-12 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Left Side: Hook & Copy */}
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-red-100">
                     <AlertCircle size={14} /> The Problem
                  </div>
                  
                  <h1 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] mb-8 text-gray-900 tracking-tight">
                    Are you tired of <br/>
                    <span className="text-brand-primary underline decoration-red-100 underline-offset-8">losing clients</span> to <br/>
                    better renders?
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed">
                    It's frustrating. You have great ideas, but your drawings look "fake." You're working 10 hours a day for peanuts while others charge 10x more for the same work.
                  </p>

                  {/* Problem vs Solution Split Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-3xl">
                      <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col items-center lg:items-start text-center lg:text-left">
                          <XCircle className="text-red-500 mb-3" size={32} />
                          <h4 className="font-bold text-red-800 mb-1">Old Way</h4>
                          <p className="text-xs text-red-600">Hours of hard work for low-pay, basic drawings.</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center lg:items-start text-center lg:text-left">
                          <CheckCircle className="text-green-500 mb-3" size={32} />
                          <h4 className="font-bold text-green-800 mb-1">Our Way</h4>
                          <p className="text-xs text-green-600">Pro results in minutes using AI + 3D mastery.</p>
                      </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button onClick={openGeneralModal} className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white rounded-2xl font-bold text-xl shadow-glow hover:bg-red-700 transition-all flex items-center justify-center gap-3">
                      Fix This Now <ArrowRight />
                    </button>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                       Learn 12 Software in 15 days
                    </p>
                  </div>
              </div>

              {/* Right Side: Visual Hook */}
              <div className="w-full lg:w-2/5 flex flex-col items-center">
                   <div className="relative w-full aspect-video max-w-[600px]">
                        {/* Animated background glow */}
                        <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] rounded-full animate-pulse"></div>
                        
                        {/* Floating Feature Icons for Social Proof */}
                        <div className="absolute -top-6 -right-4 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 animate-bounce">
                           <div className="flex items-center gap-2 mb-1">
                              <Star size={16} className="fill-brand-primary text-brand-primary" />
                              <span className="text-sm font-bold">Pro Renders</span>
                           </div>
                           <p className="text-[10px] text-gray-400">Clients pay $1000+ extra</p>
                        </div>

                        <div className="absolute -bottom-6 -left-6 z-20 bg-gray-900 text-white p-4 rounded-2xl shadow-2xl border border-gray-700">
                           <div className="flex items-center gap-2 mb-1">
                              <Zap size={16} className="text-brand-primary" />
                              <span className="text-sm font-bold">10x Faster</span>
                           </div>
                           <p className="text-[10px] text-gray-400">Using AI Workflows</p>
                        </div>

                        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-8 border-white bg-black relative">
                             <iframe 
                                src="https://iframe.mediadelivery.net/embed/489113/562b87e6-4ac9-40b6-b343-479ada547387?autoplay=true&loop=true&muted=true" 
                                className="w-full h-full object-cover" 
                                allow="autoplay; fullscreen"
                                allowFullScreen={true}
                             ></iframe>
                        </div>
                   </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTEGRATED CAREER ACCELERATOR HUB */}
        <section className="py-24 bg-white relative overflow-hidden border-t border-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4 tracking-tight">
                    Start Earning More Today
                  </h2>
                  <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                    We show you the simple steps to turn basic design skills into a high-paying business.
                  </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  <div className="lg:col-span-7 space-y-6">
                      <div className="bg-gray-50 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6 leading-tight">
                            "How much will I make?"
                          </h3>
                          <div className="space-y-6">
                              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0"><Wallet size={24} /></div>
                                  <div>
                                      <p className="text-sm text-gray-500 font-bold mb-1">Large Projects</p>
                                      <p className="text-xl md:text-2xl font-display font-bold text-gray-900">
                                          Quote <span className="text-brand-primary">~$600</span> per 1k sq.ft.
                                      </p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0"><Sparkles size={24} /></div>
                                  <div>
                                      <p className="text-sm text-gray-500 font-bold mb-1">Small Clips</p>
                                      <p className="text-xl md:text-2xl font-display font-bold text-gray-900">
                                          Charge <span className="text-brand-primary">$40–$120</span> each
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col">
                      <div className="bg-gray-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-glow flex flex-col h-full relative overflow-hidden">
                          <h4 className="text-xs font-black text-brand-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                             <Zap size={14} className="fill-brand-primary" /> What you get
                          </h4>
                          <div className="space-y-6 flex-1">
                              {[
                                { t: "12 Master Courses", d: "From AutoCAD to AI.", status: "Core" },
                                { t: "Huge Asset Library", d: "Textures & templates.", status: "Bonus" },
                                { t: "Direct Help Chat", d: "We solve your bugs.", status: "Support" },
                                { t: "Lifetime Access", d: "Watch anytime.", status: "Live" },
                                { t: "Certification", d: "Look professional.", status: "Verified" }
                              ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-brand-primary animate-blink-red shadow-[0_0_10px_rgba(217,4,41,1)] shrink-0"></div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-display font-bold text-base md:text-lg leading-none">{item.t}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">{item.d}</p>
                                    </div>
                                </div>
                              ))}
                          </div>
                          <button onClick={openGeneralModal} className="mt-10 w-full py-4 bg-brand-primary hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-glow flex items-center justify-center gap-3 group text-lg">
                            Join Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </section>

        {/* STACKED CAROUSEL */}
        <StackedCarousel onCourseClick={openCourseModal} />

        {/* LIBRARY */}
        <section id="courses-section" className="relative z-10 py-24 bg-white space-y-20 border-t border-gray-100">
           <div className="px-6 md:px-12">
                <div className="inline-flex items-center gap-2 bg-gray-900 text-white text-[10px] font-black px-4 py-1.5 rounded-md mb-6 uppercase tracking-widest">Full Access</div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">Explore the Library</h2>
           </div>
           <div className="space-y-16">
            {ROWS.map((row, idx) => (
                <CourseRow key={idx} title={row.title} courses={row.courses} onCourseClick={openCourseModal} />
            ))}
           </div>
        </section>

        {/* HONEST REQUEST */}
        <section className="py-16 bg-white border-b border-gray-100">
           <div className="container mx-auto px-6 text-center max-w-3xl">
              <div className="bg-gray-50/50 rounded-[3rem] p-10 md:p-14 border border-gray-200/60 shadow-sm">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8">A Small Request</h3>
                  <div className="space-y-6 text-gray-700 text-lg font-medium leading-relaxed">
                      <p>Please join <strong className="font-bold text-gray-900">only if you want to work hard</strong> for at least 15 days.</p>
                      <p>We put <strong className="font-bold text-gray-900">months of love</strong> into these lessons. Use them well.</p>
                  </div>
              </div>
           </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-white">
          <div className="px-6 md:px-12 mb-12 max-w-7xl mx-auto">
             <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">What Students Say</h2>
          </div>
          <div className="overflow-x-auto pb-12 px-6 md:px-12 flex gap-6 no-scrollbar">
            {TESTIMONIALS.map((t, i) => (
              <GlassCard key={i} className="min-w-[320px] md:min-w-[400px] p-8 flex flex-col justify-between" hoverEffect={true}>
                <p className="text-gray-700 italic mb-6 leading-relaxed text-lg font-medium">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-lg">{t.name[0]}</div>
                    <div>
                        <div className="font-bold text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-900">FAQ</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="text-lg font-medium text-gray-900">{item.question}</span><ChevronDown size={20} className={`text-gray-400 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 text-gray-600 transition-all overflow-hidden ${openFaqIndex === index ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>{item.answer}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-12 px-6 text-center">
        <Logo />
        <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-[0.2em]">© 2026 Avada Architectural AI. Global Standards.</p>
      </footer>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;