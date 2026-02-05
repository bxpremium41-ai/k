import React, { useState, useEffect } from 'react';
import { X, Lock, Check, ArrowRight, Loader2, ShieldCheck, PartyPopper, Star, Users, Zap, Timer, BookOpen, Gift, CheckCircle2, Shield, CreditCard, TrendingUp, IdCard } from 'lucide-react';
import { submitPhoneNumber } from '../services/mockBackend';
import { PRICING_PLANS, COURSES } from '../constants';
import { Course } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

type Step = 'DETAILS' | 'PLANS' | 'SUCCESS';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, initialCourse }) => {
  const [step, setStep] = useState<Step>('PLANS');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(PRICING_PLANS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Timer & User Count State
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [userCount, setUserCount] = useState(41258);
  const [viewingCount, setViewingCount] = useState(12);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(initialCourse ? 'DETAILS' : 'PLANS');
      setError('');
    }
  }, [isOpen, initialCourse]);

  // Sync Timer Logic
  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);

      const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const m = Math.floor((remaining / (1000 * 60)) % 60);
      const s = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ h, m, s });
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
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(5, Math.min(25, prev + delta));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleDetailsContinue = () => {
    setStep('PLANS');
  };

  const selectedPlan = PRICING_PLANS[0];
  const formatTime = (val: number) => val.toString().padStart(2, '0');

  const handlePaymentStart = async () => {
    setError('');
    if (!selectedPlan) return;
    setIsLoading(true);

    try {
      await submitPhoneNumber('', selectedPlan.id);
      window.location.href = 'https://buy.stripe.com/9B6aEXfCW2vX8pldXHfUQ0h';
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 40px -12px rgba(16,185,129,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 25px 50px -12px rgba(16,185,129,0.6); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s infinite ease-in-out;
        }
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
      `}</style>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row h-full md:h-[700px] max-h-[95vh] text-gray-900">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full text-gray-600 hover:text-black hover:bg-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        <div className={`hidden md:flex md:w-1/3 bg-gray-900 p-8 flex-col justify-between relative overflow-hidden text-white`}>
           <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-500" 
                style={{ backgroundImage: `url(${step === 'DETAILS' && initialCourse ? initialCourse.imageUrl : 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'})` }} 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-brand-success/20 to-black/80"></div>
           
           <div className="relative z-10">
             {step === 'DETAILS' && initialCourse ? (
               <>
                 <div className="text-brand-success text-[10px] font-bold uppercase tracking-widest mb-2 bg-white/10 w-fit px-2 py-0.5 rounded border border-white/20">{initialCourse.software}</div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4">{initialCourse.title}</h2>
               </>
             ) : (
               <>
                 <div className="flex items-center gap-2 text-brand-success font-bold mb-4">
                   <ShieldCheck size={20} /> Secure Checkout
                 </div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4 text-white">
                   Master Design.<br/>Build Future.
                 </h2>
               </>
             )}
             
             <p className="text-gray-300 text-sm leading-relaxed font-light">
                One-time investment. Lifetime access + future updates included.
             </p>
           </div>
           
           <div className="relative z-10 mt-auto">
             <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-bold border-b border-white/10 pb-1">Verified Value</div>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-success" /> 12+ Professional Courses</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-success" /> Source Files Download</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-brand-success" /> Lifetime Free Updates</li>
             </ul>
           </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col h-full bg-white relative">
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 pb-0">

            {step === 'DETAILS' && initialCourse && (
                <div className="flex flex-col min-h-full pb-8 animate-[fadeIn_0.3s_ease-out]">
                     <div className="md:hidden w-full h-48 -mt-6 -mx-6 mb-6 relative overflow-hidden">
                       <img src={initialCourse.imageUrl} className="w-full h-full object-cover" alt={initialCourse.title} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       <div className="absolute bottom-4 left-6 text-white">
                          <span className="text-brand-success text-[10px] font-bold uppercase tracking-widest">{initialCourse.software}</span>
                          <h2 className="text-2xl font-display font-bold">{initialCourse.title}</h2>
                       </div>
                     </div>
                     <div className="flex-1">
                         <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">{initialCourse.description}</p>
                         
                         <div className="mb-6 p-4 bg-green-50 border-l-4 border-brand-success rounded-r-lg">
                            <div className="flex items-center gap-2 mb-2 text-brand-success font-bold text-sm uppercase tracking-wider"><Zap size={16} /> Workflow Impact</div>
                            <p className="text-sm text-gray-700 italic">"{initialCourse.workflowImpact}"</p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Modules</h4>
                            <ul className="space-y-3">
                              {initialCourse.learningPoints && initialCourse.learningPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                                  <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-success/10 flex items-center justify-center shrink-0 text-brand-success"><Check size={12} strokeWidth={3} /></div>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                     </div>
                </div>
            )}

             {step === 'PLANS' && (
                 <div className="pb-8 animate-[fadeIn_0.3s_ease-out] flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-1">
                      {initialCourse && (
                        <button onClick={() => setStep('DETAILS')} className="text-gray-400 hover:text-black mr-2 transition-colors">
                            <ArrowRight size={20} className="rotate-180" />
                        </button>
                      )}
                      <h3 className="text-2xl font-bold font-display text-gray-900">Checkout</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[11px] font-bold text-brand-success bg-green-50 px-3 py-1.5 rounded-full w-fit mb-6 border border-green-100">
                        <TrendingUp size={12} className="animate-bounce" />
                        Lifetime access for every single module.
                    </div>
                    
                    <div className="mb-6">
                      <div className="relative p-6 rounded-2xl border-2 bg-green-50 border-brand-success shadow-glow-success ring-4 ring-brand-success/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="absolute -top-3 right-6 px-4 py-1.5 text-[10px] font-bold uppercase rounded-full shadow-lg z-10 bg-brand-success text-white scale-110">
                          BEST CHOICE
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full border-2 border-brand-success bg-brand-success flex items-center justify-center shrink-0">
                            <Check size={14} className="text-white" strokeWidth={4} />
                          </div>
                          <div>
                            <div className="font-bold text-xl leading-tight text-brand-success">Full Access Bundle</div>
                            <div className="text-xs text-gray-500 font-medium mb-2">Every Course + Secret Vault</div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 text-left">
                               <Users size={12} className="text-brand-success" />
                               <span className="tabular-nums">{userCount.toLocaleString()}</span> professionals joined
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <div className="text-sm text-gray-400 sm:hidden">Investment</div>
                          <div>
                            <div className="text-3xl font-bold font-display text-gray-900">$49</div>
                            <div className="text-[10px] text-gray-400 line-through tracking-wide text-right">$299</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {PRICING_PLANS[0].features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                                <Check size={14} className="text-brand-success" /> {feature}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <Shield className="text-brand-success" size={20} />
                            <div className="text-[10px] text-gray-500 font-bold uppercase leading-tight text-left">Lifetime Guarantee</div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <CreditCard className="text-blue-600" size={20} />
                            <div className="text-[10px] text-gray-500 font-bold uppercase leading-tight text-left">Secured Checkout</div>
                        </div>
                    </div>
                 </div>
             )}

             {step === 'SUCCESS' && (
                 <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8 shadow-inner animate-bounce"><PartyPopper size={48} /></div>
                    <h3 className="text-4xl font-bold font-display mb-3 text-gray-900 tracking-tight">You're In!</h3>
                    <p className="text-gray-500 max-w-xs mb-8 text-lg font-light leading-relaxed">Welcome to the inner circle. Your lifetime access is active.</p>
                    <button onClick={onClose} className="w-full max-w-xs py-4 bg-brand-success text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all hover:scale-105 shadow-xl uppercase tracking-widest text-sm">Start Learning Now</button>
                 </div>
             )}
          </div>

          {(step === 'PLANS' || step === 'DETAILS') && (
             <div className="p-5 border-t border-gray-100 bg-white z-20 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                 <div className="flex flex-col gap-4">
                    
                    {step === 'PLANS' && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
                                <Timer size={14} className="text-brand-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Offer expiring:</span>
                                <div className="flex items-center gap-0.5 text-sm font-bold font-mono text-brand-primary tabular-nums">
                                    <span>{formatTime(timeLeft.h)}</span>
                                    <span className="text-red-200">:</span>
                                    <span>{formatTime(timeLeft.m)}</span>
                                    <span className="text-red-200">:</span>
                                    <span>{formatTime(timeLeft.s)}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
                                </span>
                                {viewingCount} students viewing
                            </div>
                        </div>
                    )}

                    {step === 'PLANS' && (
                        <div className="w-full space-y-3">
                             {error && <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded animate-shake">{error}</p>}
                             <button 
                                onClick={handlePaymentStart} 
                                disabled={isLoading} 
                                className="w-full relative overflow-hidden bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-2xl transition-all duration-300 shadow-[0_20px_40px_-12px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.6)] hover:-translate-y-1 active:scale-95 flex items-center justify-between px-8 group disabled:opacity-70 disabled:cursor-not-allowed animate-pulse-soft"
                             >
                                {isLoading ? (
                                    <div className="w-full flex items-center justify-center gap-3">
                                        <Loader2 className="animate-spin" size={24} />
                                        <span className="font-bold uppercase tracking-widest">Securing...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-white/20 p-2 rounded-full hidden sm:block shrink-0">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div className="flex flex-col items-center sm:items-start flex-1 sm:ml-4 text-center sm:text-left">
                                            <span className="text-2xl font-black uppercase tracking-tight leading-none">Download Now</span>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mt-1">Unlock 12 Courses + Full Asset Vault</span>
                                        </div>
                                        <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform shrink-0">
                                            <ArrowRight size={24} />
                                        </div>
                                        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                                            <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_infinite]"></div>
                                        </div>
                                    </>
                                )}
                             </button>
                        </div>
                    )}

                    {step === 'DETAILS' && (
                        <button onClick={handleDetailsContinue} className="w-full py-4 bg-brand-success hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-glow-success flex items-center justify-center gap-3 group text-xl uppercase tracking-widest">
                            Unlock Full Access for $49 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                    
                    <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-medium">
                        <div className="flex items-center gap-1"><Lock size={10} /> Secure Payments</div>
                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                        <div className="flex items-center gap-1"><CheckCircle2 size={10} /> Lifetime Updates</div>
                    </div>
                 </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};