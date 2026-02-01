import React, { useState, useEffect } from 'react';
import { X, Lock, Check, ArrowRight, Loader2, ShieldCheck, PartyPopper, Star, Users, Zap } from 'lucide-react';
import { submitPhoneNumber } from '../services/mockBackend';
import { openRazorpayCheckout } from '../services/razorpay';
import { PRICING_PLANS } from '../constants';
import { Course } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

type Step = 'DETAILS' | 'PLANS' | 'SUCCESS';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, initialCourse }) => {
  const [step, setStep] = useState<Step>('PLANS');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>('quarterly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(initialCourse ? 'DETAILS' : 'PLANS');
      setError('');
    }
  }, [isOpen, initialCourse]);

  if (!isOpen) return null;

  const handlePlanSelect = (id: string) => {
    setSelectedPlanId(id);
  };

  const handleDetailsContinue = () => {
    setStep('PLANS');
  };

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId);

  const handleRazorpaySuccess = (paymentId: string) => {
    setIsLoading(false);
    setStep('SUCCESS');
    console.log("Transaction ID:", paymentId);
  };

  const handleRazorpayFailure = (error: any) => {
    setIsLoading(false);
    setError('Payment cancelled or failed. Please try again.');
  };

  const handlePaymentStart = async () => {
    setError('');

    if (!selectedPlan) return;

    setIsLoading(true);

    try {
      // Direct redirect for $49 plan (Quarterly)
      if (selectedPlan.price === '$49') {
         await submitPhoneNumber('', selectedPlan.id);
         window.location.href = 'https://www.avada.space/checkout';
         return;
      }

      // Fallback/Legacy logic for other plans (e.g. $99 yearly)
      await submitPhoneNumber('', selectedPlan.id);
      openRazorpayCheckout(
        selectedPlan,
        '', 
        handleRazorpaySuccess,
        handleRazorpayFailure
      );
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row max-h-[90vh] md:h-auto h-full text-gray-900">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full text-gray-600 hover:text-black hover:bg-white transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left Side: Course Visuals */}
        <div className={`hidden md:flex md:w-1/3 bg-gray-900 p-8 flex-col justify-between relative overflow-hidden text-white`}>
           <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-500" 
                style={{ backgroundImage: `url(${step === 'DETAILS' && initialCourse ? initialCourse.imageUrl : 'https://picsum.photos/seed/arch/800/1200'})` }} 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-black/80"></div>
           
           <div className="relative z-10">
             {step === 'DETAILS' && initialCourse ? (
               <>
                 <div className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">{initialCourse.software}</div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4">{initialCourse.title}</h2>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <span className="text-white text-xs ml-2 font-bold">5.0</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full border border-brand-accent/20">
                      <Users size={12} />
                      <span className="text-xs font-bold">{initialCourse.students}+ Students</span>
                    </div>
                 </div>
               </>
             ) : (
               <>
                 <div className="flex items-center gap-2 text-brand-accent font-bold mb-4">
                   <ShieldCheck size={20} /> Secure Checkout
                 </div>
                 <h2 className="text-3xl font-display font-bold leading-tight mb-4">
                   Master Design.<br/>Build Future.
                 </h2>
               </>
             )}
             
             <p className="text-gray-300 text-sm leading-relaxed font-light">
                {step === 'DETAILS' && initialCourse 
                  ? "Included in the Avada All-Access Pass. One subscription, 12 premium courses."
                  : "Join thousands of architects and designers. Learn everything from drafting to hyper-realistic rendering."}
             </p>
           </div>
           
           <div className="relative z-10 mt-auto">
             <div className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">What's included</div>
             <ul className="space-y-2">
               <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-brand-accent" /> 12+ Premium Courses</li>
               <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-brand-accent" /> Source Files Download</li>
               <li className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-brand-accent" /> ISO Certification</li>
             </ul>
           </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="w-full md:w-2/3 flex flex-col h-full bg-white">
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">

            {/* STEP 1: COURSE DETAILS */}
            {step === 'DETAILS' && initialCourse && (
              <div className="animate-fadeIn flex flex-col h-full">
                {/* Mobile Hero */}
                <div className="md:hidden w-full h-48 -mt-6 -mx-6 mb-6 relative overflow-hidden">
                   <img src={initialCourse.imageUrl} className="w-full h-full object-cover" alt={initialCourse.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                   <div className="absolute bottom-4 left-6 right-6 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">{initialCourse.software}</span>
                          <h2 className="text-2xl font-display font-bold leading-none mb-1">{initialCourse.title}</h2>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex-1">
                  <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
                    {initialCourse.description}
                  </p>
                  
                  {/* Workflow Impact */}
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-brand-primary rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2 text-brand-primary font-bold text-sm uppercase tracking-wider">
                      <Zap size={16} /> Workflow Impact
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "{initialCourse.workflowImpact}"
                    </p>
                  </div>

                  {/* Learning Points */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">
                      What you'll learn
                    </h4>
                    <ul className="space-y-3">
                      {initialCourse.learningPoints && initialCourse.learningPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-gray-600">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button 
                    onClick={handleDetailsContinue}
                    className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 group"
                  >
                    Unlock All Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PLANS (Direct Payment) */}
            {step === 'PLANS' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-1">
                  {initialCourse && (
                    <button onClick={() => setStep('DETAILS')} className="md:hidden text-gray-500 hover:text-black mr-2">
                      ←
                    </button>
                  )}
                  <h3 className="text-2xl font-bold font-display text-gray-900">Select Plan</h3>
                </div>
                <p className="text-gray-500 text-sm mb-6">Start your journey today. Cancel anytime.</p>

                <div className="space-y-3 mb-8">
                  {PRICING_PLANS.map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`
                        relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200
                        flex items-center justify-between group
                        ${selectedPlanId === plan.id 
                          ? `bg-red-50 border-brand-primary shadow-lg` 
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'}
                      `}
                    >
                      {plan.label && (
                        <div className={`
                          absolute -top-3 right-4 px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-sm
                          ${selectedPlanId === plan.id ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-600'}
                        `}>
                          {plan.label}
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanId === plan.id ? 'border-brand-primary' : 'border-gray-300'}`}>
                           {selectedPlanId === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                        </div>
                        <div>
                          <div className={`font-bold text-lg ${selectedPlanId === plan.id ? 'text-brand-primary' : 'text-gray-900'}`}>{plan.duration}</div>
                          <div className="text-xs text-gray-500 font-medium">{plan.period} Access</div>
                        </div>
                      </div>

                      <div className="text-right">
                         <div className="text-xl font-bold font-display text-gray-900">{plan.price}</div>
                         <div className="text-[10px] text-gray-400 line-through">
                           {plan.originalPrice || '---'}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                    {error && <p className="text-red-500 text-xs mb-3 text-center bg-red-50 p-2 rounded">{error}</p>}
                    
                    <button 
                    onClick={handlePaymentStart}
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-primary hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                    {isLoading ? (
                        <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                        </>
                    ) : (
                        <>
                        Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
                        <Lock size={10} /> Secured Payment
                    </div>
                </div>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div className="animate-fadeIn h-full flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6 shadow-sm">
                   <PartyPopper size={40} />
                 </div>
                 <h3 className="text-3xl font-bold font-display mb-2 text-gray-900">You're In!</h3>
                 <p className="text-gray-500 max-w-xs mb-8">
                   Your subscription is active. Welcome to the Avada community.
                 </p>
                 <button 
                  onClick={onClose}
                  className="w-full max-w-xs py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
                 >
                   Start Learning Now
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
