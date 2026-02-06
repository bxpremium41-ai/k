import React, { useState, useEffect } from 'react';
import { X, Lock, Check, ArrowRight, Loader2, ShieldCheck, Zap, Timer, CheckCircle2, Shield, CreditCard, TrendingUp } from 'lucide-react';
import { submitPhoneNumber } from '../services/mockBackend';
import { PRICING_PLANS } from '../constants';
import { Course } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, initialCourse }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Timer & User Count State
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [userCount, setUserCount] = useState(41258);
  const [viewingCount, setViewingCount] = useState(12);

  const STRIPE_LINK = 'https://www.avada.space/join';

  // Sync Timer Logic
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

  // Live User Count Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + (Math.random() > 0.8 ? 1 : 0));
      setViewingCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(5, Math.min(25, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleDownloadNow = () => {
    setIsLoading(true);
    // Submit intent without waiting for it, to ensure the redirection happens immediately
    // Browsers often block redirects inside async handlers if they take too long (user gesture timeout)
    submitPhoneNumber('Direct Checkout', PRICING_PLANS[0].id);
    
    // Direct redirection
    window.location.href = STRIPE_LINK;
  };

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{`
        @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 40px -12px rgba(16,185,129,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 25px 50px -12px rgba(16,185,129,0.6); }
        }
        .animate-pulse-soft { animation: pulse-soft 2s infinite ease-in-out; }
        .custom-scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-thin::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
      `}</style>
      
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row h-full md:h-[650px] max-h-[90vh] text-gray-900">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/80 hover:bg-white rounded-full text-gray-400 hover:text-black transition-all shadow-sm border border-gray-100"
        >
          <X size={20} />
        </button>

        {/* Side Panel: Context & Trust */}
        <div className="hidden md:flex md:w-2/5 bg-gray-900 p-10 flex-col justify-between relative overflow-hidden text-white">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-black/90"></div>
           
           <div className="relative z-10">
             <div className="flex items-center gap-2 text-brand-success font-black text-xs uppercase tracking-[0.2em] mb-6">
               <ShieldCheck size={18} /> Instant Lifetime Access
             </div>
             <h2 className="text-4xl font-display font-bold leading-[1.1] mb-6 text-white">
               The Complete <br/>
               <span className="text-brand-primary">Design Engine.</span>
             </h2>
             <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                Unlock 12 mastercourses, 10k+ assets, and the secret AI workflow used by top firms globally.
             </p>
           </div>
           
           <div className="relative z-10 mt-auto">
             <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden bg-gray-800">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                        </div>
                    ))}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                    <span className="text-white block">{userCount.toLocaleString()}+</span>
                    Designers Joined
                </div>
             </div>
             <div className="space-y-4 pt-6 border-t border-white/10">
               <div className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-success" /> Master 12+ Pro Softwares</div>
               <div className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-success" /> 4K Video Training Library</div>
               <div className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-success" /> All Future Updates Free</div>
             </div>
           </div>
        </div>

        {/* Main Panel: Checkout Form */}
        <div className="w-full md:w-3/5 flex flex-col h-full bg-white">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-bold font-display text-gray-900 tracking-tight">Checkout</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-success bg-green-50 px-3 py-1.5 rounded-full border border-green-100 uppercase tracking-widest">
                        <TrendingUp size={12} />
                        One-Time Investment
                    </div>
                </div>
                <p className="text-gray-500 font-medium">Secure your spot in the 2026 Architectural AI revolution.</p>
            </div>

            {/* Selected Plan Summary */}
            <div className="relative p-8 rounded-[2rem] border-2 bg-gray-50 border-gray-100 mb-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <Zap size={48} className="text-gray-200" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                    <div>
                        <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2">Package Selected</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-1">Lifetime All-Access Pass</h4>
                        <div className="text-sm text-gray-500 font-medium">Everything we own, now and forever.</div>
                    </div>
                    <div className="text-left sm:text-right">
                        <div className="text-4xl font-display font-black text-gray-900">$49</div>
                        <div className="text-xs text-gray-400 line-through font-bold">$299.00</div>
                    </div>
                </div>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {[
                    "No monthly subscriptions",
                    "Certified curriculum",
                    "15-Day project readiness",
                    "AI workflow library"
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                        <div className="w-5 h-5 rounded-full bg-brand-success/10 flex items-center justify-center shrink-0 text-brand-success"><Check size={12} strokeWidth={3} /></div>
                        {text}
                    </div>
                ))}
            </div>

            {/* Redirection Logic Container */}
            <div className="space-y-6">
                <button 
                    onClick={handleDownloadNow} 
                    disabled={isLoading} 
                    className="w-full relative overflow-hidden bg-[#10b981] hover:bg-[#059669] text-white py-6 rounded-2xl transition-all duration-300 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.5)] hover:-translate-y-1.5 active:scale-95 flex items-center justify-between px-10 group disabled:opacity-70 disabled:cursor-not-allowed animate-pulse-soft"
                >
                    {isLoading ? (
                        <div className="w-full flex items-center justify-center gap-4">
                            <Loader2 className="animate-spin" size={24} />
                            <span className="text-xl font-black uppercase tracking-widest">Opening Secure Link...</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-start">
                                <span className="text-2xl font-black uppercase tracking-tight leading-none">Download Now</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mt-1">Direct Secure Stripe Checkout</span>
                            </div>
                            <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-2 transition-transform shrink-0">
                                <ArrowRight size={28} />
                            </div>
                            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_infinite]"></div>
                            </div>
                        </>
                    )}
                </button>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                           <CreditCard size={14} className="text-blue-500" /> Secure SSL
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                           <Shield size={14} className="text-brand-success" /> Trusted Pay
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                        <Timer size={14} className="text-brand-primary animate-pulse" />
                        <div className="flex items-center gap-1 text-sm font-black font-mono text-brand-primary tabular-nums">
                            <span>{formatTime(timeLeft.h)}</span>
                            <span className="text-red-200">:</span>
                            <span>{formatTime(timeLeft.m)}</span>
                            <span className="text-red-200">:</span>
                            <span>{formatTime(timeLeft.s)}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Check = ({ size, strokeWidth, className }: { size: number, strokeWidth?: number, className?: string }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth={strokeWidth || 2} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);