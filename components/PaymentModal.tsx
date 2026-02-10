import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Check, Loader2, Timer, CreditCard, Mail, ShieldCheck, AlertCircle, WifiOff, RefreshCcw, FileCheck, ChevronDown, ArrowRight, BookOpen, CheckCircle2, Download, Star, Trophy, Zap } from 'lucide-react';
import { Course } from '../types';
import { COURSES, PRICING_PLANS } from '../constants';
import { submitPhoneNumber } from '../services/mockBackend';

// --- CONFIGURATION ---
const STRIPE_PUBLISHABLE_KEY = "pk_live_51PRJCsGGsoQTkhyv6OrT4zvnaaB5Y0MSSkTXi0ytj33oygsfW3dcu6aOFa9q3dr2mXYTCJErnFQJcOcyuDAsQd4B00lIAdclbB"; 

// --- BACKEND CONNECTION SETTINGS ---
// Updated to point specifically to the intent creation endpoint defined in server.js
const BACKEND_URL = "https://avaada.space/create-payment-intent";

const PAYPAL_BUSINESS_EMAIL = "design@avada.in"; 
const PAYPAL_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"; 

declare global {
  interface Window {
    Stripe?: (key: string) => any;
  }
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  // --- STATE ---
  const [viewState, setViewState] = useState<'LOADING' | 'FORM' | 'PROCESSING' | 'SUCCESS' | 'CONNECTION_ERROR'>('LOADING');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 14, s: 30 });
  
  const stripeRef = useRef<any>(null);
  const elementsRef = useRef<any>(null);

  // --- LIFECYCLE ---
  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const resetModal = () => {
    setViewState('LOADING');
    setPaymentMethod('card');
    setEmail('');
    setErrorMessage(null);
    setIsStripeLoaded(false);
    
    // Clear refs to ensure clean re-initialization
    stripeRef.current = null;
    elementsRef.current = null;
    
    // Start with a brief loading spin, then move directly to form
    setTimeout(() => {
        setViewState('FORM');
    }, 600);
  };

  // Timer countdown
  useEffect(() => {
      if(!isOpen) return;
      const timer = setInterval(() => {
        setTimeLeft(prev => {
             if (prev.s > 0) return { ...prev, s: prev.s - 1 };
             if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
             return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
  }, [isOpen]);

  // Init Stripe UI when in FORM view (without Payment Intent)
  useEffect(() => {
    if (viewState === 'FORM' && !stripeRef.current && paymentMethod === 'card') {
        initializeStripeUI();
    }
  }, [viewState, paymentMethod]);

  const initializeStripeUI = async (retry = 0) => {
    try {
        // Dynamic Script Injection Check
        if (!window.Stripe) {
            if (!document.getElementById('stripe-js')) {
                 const script = document.createElement('script');
                 script.src = 'https://js.stripe.com/v3/';
                 script.id = 'stripe-js';
                 script.async = true;
                 document.head.appendChild(script);
            }
            
            // Retry loop
            if (retry < 10) { 
                setTimeout(() => initializeStripeUI(retry + 1), 500);
            } else {
                setErrorMessage("Unable to load secure card gateway. Please use PayPal.");
                setPaymentMethod('paypal');
            }
            return;
        }

        if (stripeRef.current) return;

        // Just initialize Stripe instance and Elements without Payment Intent
        stripeRef.current = window.Stripe(STRIPE_PUBLISHABLE_KEY);
        
        elementsRef.current = stripeRef.current.elements({ 
            mode: 'payment',
            amount: 4900,
            currency: 'usd',
            paymentMethodTypes: ['card'],
            appearance: {
                theme: 'flat', 
                labels: 'floating',
                variables: { 
                    fontFamily: '"Outfit", sans-serif',
                    borderRadius: '12px', 
                    colorPrimary: '#D90429', 
                    colorBackground: '#ffffff',
                    colorText: '#1f2937', 
                    colorDanger: '#ef4444',
                    spacingUnit: '4px',
                    fontSizeBase: '15px',
                    fontWeightNormal: '500', 
                },
                rules: {
                    '.Input': { 
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        paddingTop: '16px', 
                        paddingBottom: '16px',
                        paddingLeft: '16px',
                        boxShadow: 'none',
                        transition: 'all 0.2s ease',
                    },
                    '.Input:hover': {
                        borderColor: '#cbd5e1',
                        backgroundColor: '#ffffff',
                    },
                    '.Input:focus': { 
                        border: '1px solid #D90429', 
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 0 4px rgba(217, 4, 41, 0.1)', 
                    },
                    '.Label': {
                        fontWeight: '600',
                        color: '#64748b', 
                        fontSize: '12px',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    },
                    '.Tab': {
                        display: 'none',
                    }
                }
            }
        });
        
        const paymentElement = elementsRef.current.create("payment", { 
            layout: {
                type: 'tabs',
                defaultCollapsed: false,
            },
            fields: { 
                billingDetails: { 
                    email: 'never',
                    address: 'never' 
                } 
            },
            paymentMethodOrder: ['card'],
            wallets: { applePay: 'never', googlePay: 'never' }
        });

        // Wait a tick to ensure the DOM is ready
        setTimeout(() => {
             const mountPoint = document.getElementById("stripe-element-mount");
             if(mountPoint) {
                 paymentElement.mount("#stripe-element-mount");
                 setIsStripeLoaded(true);
             } else {
                 // Try one more time
                 setTimeout(() => {
                      const mp = document.getElementById("stripe-element-mount");
                      if(mp) {
                          paymentElement.mount("#stripe-element-mount");
                          setIsStripeLoaded(true);
                      }
                 }, 500);
             }
        }, 100);

    } catch (err: any) {
        console.error("Stripe UI Init Failed:", err);
        setErrorMessage("Card gateway unavailable. Please try PayPal.");
        setIsStripeLoaded(false);
        setPaymentMethod('paypal');
    }
  };

  const handlePaypalSubmit = (e: React.FormEvent) => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.preventDefault();
        setEmailError(true);
        setErrorMessage("Please enter a valid email address first.");
        return;
      }
      submitPhoneNumber(email, 'paypal-init');
      setViewState('PROCESSING');
  };

  const handleCardPay = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError(true);
        return;
    }
    
    if (!stripeRef.current || !elementsRef.current) {
        setErrorMessage("Payment system not ready. Please refresh the page.");
        return;
    }
    
    // Submit the Elements form first (REQUIRED for deferred payments)
    const { error: submitError } = await elementsRef.current.submit();
    if (submitError) {
        setErrorMessage(submitError.message || "Payment validation failed");
        return;
    }
    
    setViewState('PROCESSING');
    
    try {
        console.log(`Creating Payment Intent at: ${BACKEND_URL}`);
        
        // Attempt to Create Payment Intent
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                items: [{ id: 'lifetime-bundle' }], 
                email: email 
            })
        });

        // Robust Content-Type checking
        const contentType = res.headers.get("content-type");
        
        if (!res.ok) {
            // Try to get text body for error details
            const errorText = await res.text().catch(() => "No error details");
            throw new Error(`Server Error (${res.status}): ${errorText.substring(0, 100)}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
            const textResponse = await res.text().catch(() => "");
            console.error("Non-JSON response:", textResponse.substring(0, 200));
            throw new Error(`Invalid server response. Expected JSON, got ${contentType || 'unknown type'}.`);
        }

        const { clientSecret, error: backendError } = await res.json();
        
        if (backendError) {
            throw new Error(backendError);
        }

        if (!clientSecret) {
            throw new Error("Backend did not return a Client Secret.");
        }

        const returnUrl = "https://architect.systeme.io/courses";
        
        const result = await stripeRef.current.confirmPayment({
            elements: elementsRef.current,
            confirmParams: { 
                return_url: returnUrl, 
                receipt_email: email, 
                payment_method_data: { 
                    billing_details: { 
                        email: email,
                        address: { 
                            country: 'US',
                            postal_code: '10001',
                            state: 'NY',
                            city: 'New York',
                            line1: '1235 Sixth Ave'
                        } 
                    } 
                } 
            },
            clientSecret: clientSecret,
            redirect: 'if_required' 
        });

        if (result.error) {
            setErrorMessage(result.error.message || "Payment Failed");
            setViewState('FORM');
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            setViewState('SUCCESS');
            submitPhoneNumber(email, 'card-success');
            setTimeout(() => { window.location.href = "https://architect.systeme.io/courses"; }, 2000); 
        }
    } catch (err: any) {
        console.error("Payment Error:", err);
        setErrorMessage(err.message || "An unexpected error occurred connecting to the backend.");
        setViewState('FORM');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

      <div className="relative w-full max-w-[1000px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[680px] animate-[popScale_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        
        {/* SIDEBAR (Desktop: Dark & Premium) */}
        <div className="hidden md:flex w-[42%] bg-gray-900 text-white p-10 flex-col justify-between relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8 text-brand-primary bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                    <Trophy size={14} className="text-yellow-400" /> <span className="text-[10px] font-bold uppercase tracking-widest text-white">Best Seller Package</span>
                </div>
                
                <h2 className="text-3xl font-display font-bold leading-tight mb-2 tracking-tight">Lifetime <br/> All-Access Pass</h2>
                <div className="text-sm font-medium text-gray-400 mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Access to everything forever.
                </div>
                
                <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-white/10">
                    <span className="text-5xl font-black text-white tracking-tighter">$49</span>
                    <span className="text-xl text-gray-500 line-through font-medium">$99</span>
                </div>
                
                <div className="space-y-5">
                    {[
                        'Lifetime Course Updates Included', 
                        'All 6 Masterclasses (70+ Hours)', 
                        'Weekly Live AI Sessions', 
                        '10,000+ Asset Library Access'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-200">
                            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-primary/20">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-6">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                     <div className="flex gap-1 mb-2">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                     </div>
                     <p className="text-sm text-gray-300 italic mb-3">"I learned more in 3 days than 4 years of uni. The AI workflow is insanely fast."</p>
                     <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-xs font-bold">JD</div>
                         <span className="text-xs font-bold text-white">James D., Architect</span>
                     </div>
                 </div>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white flex flex-col relative h-full">
            
            {/* Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between shrink-0 z-20 bg-white">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-8 h-1.5 rounded-full bg-brand-primary"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Step 2 of 2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Secure Checkout</h3>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            </div>

            {/* Scrollable Form Area */}
            <div className="flex-1 px-8 py-6 overflow-y-auto custom-scrollbar">
                
                {viewState === 'LOADING' && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl animate-pulse"></div>
                            <Loader2 className="relative animate-spin text-brand-primary" size={48} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">Securing Connection...</h4>
                            <p className="text-sm text-gray-400 mt-2 font-medium">Encrypting your session</p>
                        </div>
                    </div>
                )}

                {viewState === 'CONNECTION_ERROR' && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2"><WifiOff size={28} /></div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900">Connection Failed</h4>
                            <p className="text-sm text-gray-500 mt-2">Cannot reach payment gateway</p>
                        </div>
                        <button onClick={() => { setViewState('LOADING'); resetModal(); }} className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm flex items-center gap-2">
                            <RefreshCcw size={16} /> Retry
                        </button>
                    </div>
                )}

                {(viewState === 'FORM' || viewState === 'PROCESSING') && (
                    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                        
                        {/* Summary Block */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                             <div className="flex items-center justify-between mb-4">
                                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Order Summary</span>
                                 <div className="flex items-center gap-1.5 text-xs font-medium text-brand-primary bg-brand-primary/5 px-2 py-1 rounded">
                                     <Timer size={12} className="animate-pulse" />
                                     Offer expires in {timeLeft.m}:{timeLeft.s.toString().padStart(2,'0')}
                                 </div>
                             </div>
                             
                             {/* Mini Course Stack Grid */}
                             <div className="grid grid-cols-2 gap-2 mb-4">
                                {COURSES.map((c) => (
                                    <div key={c.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-md bg-gray-200 overflow-hidden shrink-0">
                                            <img src={c.imageUrl} className="w-full h-full object-cover" alt={c.title} />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                             <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">{c.software}</span>
                                             <span className="text-[10px] font-bold text-gray-900 leading-tight truncate">{c.title}</span>
                                        </div>
                                    </div>
                                ))}
                             </div>

                             <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                 <div className="text-sm font-medium text-gray-500">Total Value</div>
                                 <div className="text-sm font-medium text-gray-400 line-through">$99.00</div>
                             </div>
                             <div className="flex items-center justify-between mt-1">
                                 <div className="text-sm font-bold text-gray-900">Today's Total</div>
                                 <div className="text-xl font-black text-gray-900">$49.00</div>
                             </div>
                        </div>

                        {/* Payment Method Toggle */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-1 block">Select Payment Method</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => setPaymentMethod('card')} 
                                    className={`relative flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all duration-200 whitespace-nowrap ${paymentMethod === 'card' ? 'bg-white border-[#0A2540] text-[#0A2540] shadow-sm' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                                >
                                    <CreditCard size={18} />
                                    <span className="text-sm font-bold">Card</span>
                                    {paymentMethod === 'card' && (
                                        <div className="absolute top-[-8px] right-[-8px] bg-[#0A2540] text-white p-1 rounded-full"><Check size={10} strokeWidth={4} /></div>
                                    )}
                                </button>
                                
                                <button 
                                    onClick={() => setPaymentMethod('paypal')} 
                                    className={`relative flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all duration-200 whitespace-nowrap ${paymentMethod === 'paypal' ? 'bg-[#f6f9fc] border-[#0070ba] text-[#0070ba] shadow-sm' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                                >
                                    <img src={PAYPAL_LOGO_URL} alt="PayPal" className="h-5 object-contain" />
                                    {paymentMethod === 'paypal' && (
                                        <div className="absolute top-[-8px] right-[-8px] bg-[#0070ba] text-white p-1 rounded-full"><Check size={10} strokeWidth={4} /></div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative group transition-all duration-300">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`h-4 w-4 transition-colors ${emailError ? 'text-red-400' : 'text-gray-400 group-focus-within:text-brand-primary'}`} />
                                </div>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                                    placeholder="name@example.com"
                                    className={`
                                        block w-full pl-11 pr-4 py-4
                                        bg-gray-50 border-2 text-sm font-semibold rounded-xl
                                        placeholder:text-gray-400 text-gray-900
                                        transition-all duration-200 ease-in-out
                                        focus:outline-none focus:bg-white
                                        ${emailError 
                                            ? 'border-red-300 bg-red-50/50 focus:border-red-300' 
                                            : 'border-gray-100 hover:border-gray-200 focus:border-brand-primary focus:shadow-[0_0_0_4px_rgba(217,4,41,0.1)]'
                                        }
                                    `}
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 px-1">We'll send your login details here instantly.</p>
                        </div>

                        {/* Stripe Element */}
                        <div className={`${paymentMethod === 'card' ? 'block' : 'hidden'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className="min-h-[160px]">
                                <div id="stripe-element-mount"></div>
                            </div>
                        </div>

                        {/* PayPal View */}
                        <div className={`${paymentMethod === 'paypal' ? 'block' : 'hidden'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className="bg-[#0070ba]/5 border border-[#0070ba]/10 rounded-xl p-6 text-center">
                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mx-auto mb-4 p-3 border border-gray-100">
                                    <img src={PAYPAL_LOGO_URL} alt="PayPal" className="w-full h-full object-contain" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">Pay with PayPal</h4>
                                <p className="text-xs text-gray-500 mb-6 max-w-[200px] mx-auto leading-relaxed">Secure, fast checkout using your PayPal account.</p>
                                
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" onSubmit={handlePaypalSubmit}>
                                    <input type="hidden" name="cmd" value="_xclick" />
                                    <input type="hidden" name="business" value={PAYPAL_BUSINESS_EMAIL} />
                                    <input type="hidden" name="item_name" value="Avada Design Bundle" />
                                    <input type="hidden" name="amount" value="49" />
                                    <input type="hidden" name="currency_code" value="USD" />
                                    {/* SUCCESS REDIRECT LINK (PayPal) */}
                                    <input type="hidden" name="return" value="https://architect.systeme.io/courses" />
                                    <input type="hidden" name="email" value={email} />
                                    <button type="submit" className="w-full py-4 bg-[#0070ba] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#005ea6] transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group text-xs">
                                        Proceed to PayPal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-3 animate-in fade-in border border-red-100">
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                                    <AlertCircle size={14} />
                                </div>
                                {errorMessage}
                            </div>
                        )}
                    </div>
                )}

                {viewState === 'SUCCESS' && (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20 mb-6 animate-[popScale_0.5s]"><Check size={40} className="text-white" strokeWidth={4} /></div>
                        <h3 className="text-2xl font-display font-black text-gray-900 mb-2">Payment Successful</h3>
                        <p className="text-gray-500 font-medium text-sm">Redirecting to your library...</p>
                    </div>
                )}
            </div>

            {/* Footer Button: Fixed at bottom */}
            {(viewState === 'FORM' || viewState === 'PROCESSING') && paymentMethod === 'card' && (
                <div className="p-8 border-t border-gray-100 bg-white shrink-0 z-20 pb-8">
                    <button
                        onClick={handleCardPay}
                        disabled={viewState === 'PROCESSING'}
                        className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-black text-lg uppercase tracking-widest shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_20px_35px_-5px_rgba(16,185,129,0.5)] border border-transparent hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                    >
                        {viewState === 'PROCESSING' ? (
                            <Loader2 className="animate-spin relative z-10" />
                        ) : (
                            <>
                                <Lock size={18} className="relative z-10 opacity-80" strokeWidth={2.5} />
                                <span className="relative z-10">Enroll Now • $49</span> 
                                <ArrowRight size={18} className="relative z-10 opacity-80 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </>
                        )}
                    </button>
                    <div className="flex items-center justify-center gap-4 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                         {/* Simple text representation of cards for performance/simplicity */}
                         <div className="flex gap-2">
                            <div className="h-4 bg-gray-200 w-8 rounded"></div>
                            <div className="h-4 bg-gray-200 w-8 rounded"></div>
                            <div className="h-4 bg-gray-200 w-8 rounded"></div>
                            <div className="h-4 bg-gray-200 w-8 rounded"></div>
                         </div>
                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                             <ShieldCheck size={10} /> 256-Bit SSL Encrypted
                         </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};