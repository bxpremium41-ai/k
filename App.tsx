import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { CourseRow } from './components/CourseRow';
import { Features } from './components/Features';
import { TESTIMONIALS, FAQ_ITEMS, ROWS, COURSES } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { ChevronDown, ChevronUp, Instagram, Linkedin, Twitter, Play, Info, Search, Bell, Menu, Sparkles, Database, CheckCircle2 } from 'lucide-react';
import { Course } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const featuredCourse = COURSES[1]; // V-Ray

  const openGeneralModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">
      
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}
      >
        <div className="flex items-center gap-4 md:gap-8">
          <div className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo(0,0)}>
             AVADA<span className="text-brand-primary text-4xl leading-none">.</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <button 
              onClick={openGeneralModal}
              className="bg-brand-primary text-white text-xs md:text-sm font-bold px-6 py-2.5 rounded-full shadow-glow hover:shadow-glow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles size={14} className="fill-white" />
              <span>Unlock All Courses - $49</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 text-gray-600 font-medium">
           <div className="hidden md:block hover:text-brand-primary cursor-pointer transition-colors">Courses</div>
           <Search size={20} className="cursor-pointer hover:text-brand-primary transition-colors" />
           <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-900 cursor-pointer hover:bg-gray-200 transition-colors">
             AV
           </div>
           <Menu size={20} className="md:hidden cursor-pointer" />
        </div>
      </nav>

      <main>
        {/* Modern Clean Hero Section */}
        <section className="relative min-h-[90vh] w-full flex items-center bg-white pt-20">
          
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gray-50 skew-x-[-12deg] origin-top translate-x-1/4 -z-10"></div>
          
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl z-10 animate-[fadeIn_0.8s_ease-out]">
               <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-red-50 border border-red-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                  </span>
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Architecture Masterclass Series</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] mb-6 text-gray-900 tracking-tight">
                 Learn Interior <span className="text-gray-400">&</span><br/>
                 Exterior Designing<br/>
                 <span className="text-brand-primary">+ AI Tools</span>
               </h1>
               
               <div className="flex flex-col gap-2 mb-8 border-l-4 border-brand-primary pl-6">
                 <p className="text-xl md:text-2xl text-gray-700 font-medium">
                   12 Premium Courses.
                 </p>
                 <p className="text-lg text-gray-500 font-light">
                   If you're an Architect, Interior Designer or Home Owner, this is for you.
                 </p>
               </div>

               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                 <button 
                   onClick={openGeneralModal}
                   className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg shadow-glow hover:bg-red-700 transition-all flex items-center gap-2 group"
                 >
                   Start Learning Now <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                 </button>
                 <div className="flex -space-x-3 items-center">
                    {[1,2,3,4].map(i => (
                      <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      2k+
                    </div>
                 </div>
               </div>
            </div>

            {/* Right Image Composition */}
            <div className="relative h-[500px] hidden lg:block">
               {/* Main Hero Video */}
               <div className="absolute top-0 right-0 w-[90%] h-full rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 border-4 border-white group">
                 <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover transform scale-105"
                    poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                 >
                    <source src="https://cdn.coverr.co/videos/coverr-interior-design-of-a-living-room-2342/1080p.mp4" type="video/mp4" />
                 </video>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                   <div className="text-xs font-bold uppercase tracking-wider mb-1 text-brand-accent">Featured Course</div>
                   <div className="text-2xl font-display font-bold">V-Ray Photorealism</div>
                 </div>
               </div>
               
               {/* Floating Card 1 */}
               <div className="absolute top-10 left-0 bg-white p-4 rounded-xl shadow-xl animate-float border border-gray-100 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-brand-primary">
                      <Sparkles size={16} />
                    </div>
                    <div className="text-xs font-bold text-gray-800">AI Design</div>
                  </div>
                  <p className="text-[10px] text-gray-500">Generate 100 concepts in 60 seconds.</p>
               </div>

                {/* Floating Card 2 */}
               <div className="absolute bottom-10 -left-8 bg-white p-4 rounded-xl shadow-xl animate-float-delayed border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?img=32" className="w-10 h-10 rounded-full" alt="Student" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">"Best investment ever."</div>
                      <div className="text-[10px] text-gray-500">Sakshi, Interior Designer</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Content Rows */}
        <section className="relative z-10 py-12 bg-white space-y-8">
           <div className="px-6 md:px-12 mb-8">
             <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Explore the Library</h2>
             <p className="text-gray-500">Master industry-standard software from start to finish.</p>
           </div>
           
           <div className="space-y-12">
            {ROWS.map((row, idx) => (
                <CourseRow 
                key={idx} 
                title={row.title} 
                courses={row.courses} 
                onCourseClick={openCourseModal} 
                />
            ))}
           </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 md:px-12 py-24 bg-gray-50 border-y border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Architects Love Avada</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We don't just teach tools. We teach workflows that save time and win clients.</p>
          </div>
          <Features />
        </section>

         {/* Plans Preview Banner */}
         <section className="px-6 md:px-12 py-20 bg-white">
           <div className="max-w-6xl mx-auto bg-gray-900 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
              <div className="relative z-10 max-w-lg">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Unlock Your Career Potential</h2>
                <ul className="space-y-3 mb-8">
                   <li className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="text-brand-primary" size={20} /> Access to all 12 courses
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="text-brand-primary" size={20} /> Downloadable project files
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="text-brand-primary" size={20} /> Certificate of Completion
                   </li>
                </ul>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-white">$49</span>
                   <span className="text-gray-400">/quarterly</span>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
                <button 
                    onClick={openGeneralModal}
                    className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-transform text-center"
                >
                    Get Started Now
                </button>
                <p className="text-gray-400 text-xs text-center">30-day money-back guarantee</p>
              </div>

              {/* Abstract shapes */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] opacity-20 -mr-32 -mt-32 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] opacity-10 -ml-20 -mb-20 pointer-events-none"></div>
           </div>
         </section>

        {/* Testimonials */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <h2 className="text-3xl font-display font-bold mb-12 text-center text-gray-900">Community Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <GlassCard key={i} className="p-8 border border-gray-100 shadow-sm" hoverEffect={true}>
                <div className="flex text-brand-primary mb-4">
                  {[1,2,3,4,5].map(s => <Sparkles key={s} size={14} className="fill-brand-primary" />)}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 mb-12">Everything you need to know about the product and billing.</p>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all hover:border-brand-primary/20">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <div className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-gray-400" />
                  </div>
                </button>
                <div 
                  className={`px-6 text-gray-600 transition-all duration-300 overflow-hidden ${openFaqIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-16 px-6 md:px-12 text-gray-500 text-sm relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
          <div>
             <div className="text-xl font-bold text-gray-900 mb-6">AVADA.</div>
             <p className="text-xs leading-relaxed mb-4">Empowering the next generation of architects and designers with world-class education.</p>
          </div>
          <div className="space-y-3">
             <h4 className="font-bold text-gray-900 mb-2">Platform</h4>
             <a href="#" className="block hover:text-brand-primary transition-colors">Browse Courses</a>
             <a href="#" className="block hover:text-brand-primary transition-colors">Pricing</a>
             <a href="#" className="block hover:text-brand-primary transition-colors">For Teams</a>
          </div>
          <div className="space-y-3">
             <h4 className="font-bold text-gray-900 mb-2">Company</h4>
             <a href="#" className="block hover:text-brand-primary transition-colors">About Us</a>
             <a href="#" className="block hover:text-brand-primary transition-colors">Careers</a>
             <a href="#" className="block hover:text-brand-primary transition-colors">Contact</a>
          </div>
          <div className="space-y-3">
             <h4 className="font-bold text-gray-900 mb-2">Legal</h4>
             <a href="#" className="block hover:text-brand-primary transition-colors">Terms of Use</a>
             <a href="#" className="block hover:text-brand-primary transition-colors">Privacy Policy</a>
             <a href="#" className="block hover:text-brand-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <div className="text-xs mb-4 md:mb-0">© 2025 Avada Inc. All rights reserved.</div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors"><Instagram size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors"><Twitter size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors"><Linkedin size={18} /></a>
            </div>
            
            {/* Secret Admin Link */}
            <button 
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1 text-gray-300 hover:text-gray-500 transition-colors text-[10px]"
            >
                <Database size={10} /> Admin
            </button>
          </div>
        </div>
      </footer>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        initialCourse={selectedCourse} 
      />

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
};

export default App;
