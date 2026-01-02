import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, CheckCircle2,
  ArrowRight, Mail, Calendar,
  Clock, Zap, Target, BarChart3,
  BrainCircuit, ChevronDown, TrendingUp
} from 'lucide-react';
import { SectionId } from '../types';
import AIChatWidget from '../components/AIChatWidget';

// --- Custom Hooks ---

// Hook for scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

// Hook for counter animation
const useCounter = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

// --- Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <span className="text-2xl font-serif font-bold text-brand-primary tracking-tight">Liora<span className="text-brand-accent">Tech</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button onClick={() => scrollTo(SectionId.SERVICES)} className="text-gray-600 hover:text-brand-primary transition-colors">Þjónusta</button>
          <button onClick={() => scrollTo(SectionId.PROCESS)} className="text-gray-600 hover:text-brand-primary transition-colors">Hvernig það virkar</button>
          <button onClick={() => scrollTo(SectionId.ABOUT)} className="text-gray-600 hover:text-brand-primary transition-colors">Um okkur</button>
          <button onClick={() => scrollTo(SectionId.NEWSLETTER)} className="text-gray-600 hover:text-brand-primary transition-colors">Fréttabréf</button>
          <Link
            to="/quote"
            className="px-6 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Fá verðtilboð
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-brand-primary">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full top-full left-0 bg-white border-t border-gray-100 shadow-xl">
          <div className="flex flex-col p-6 space-y-4">
            <button onClick={() => scrollTo(SectionId.SERVICES)} className="text-left text-gray-600 font-medium">Þjónusta</button>
            <button onClick={() => scrollTo(SectionId.PROCESS)} className="text-left text-gray-600 font-medium">Hvernig það virkar</button>
            <button onClick={() => scrollTo(SectionId.ABOUT)} className="text-left text-gray-600 font-medium">Um okkur</button>
            <button onClick={() => scrollTo(SectionId.NEWSLETTER)} className="text-left text-gray-600 font-medium">Fréttabréf</button>
            <Link to="/quote" className="text-brand-primary font-bold">Fá verðtilboð</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-20 bg-brand-light overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white to-transparent opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl order-2 md:order-1">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-brand-dark leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            AI og sjálfvirkni sem vinnur fyrir <span className="text-brand-primary relative">
              reksturinn þinn
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-lg opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            Ég hjálpa íslenskum fyrirtækjum að draga úr handavinnu, bæta flæði og byggja hagnýtar AI-lausnir sem skila sér í stöðugri og skilvirkri starfsemi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <Link
              to="/greining"
              className="px-10 py-5 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-dark transition-all flex items-center justify-center text-lg hover:scale-105 transform"
            >
              Fá AI-greiningu <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/quote"
              className="px-10 py-5 bg-white text-brand-primary border-2 border-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center text-lg hover:scale-105 transform"
            >
              Fá verðtilboð
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">Byggt á 10+ ára reynslu í gervigreind, markaðssetningu, sölu og rekstri.</p>
        </div>

        {/* Hero Visual - Professional/Corporate Look */}
        <div className="relative hidden md:flex order-1 md:order-2 h-full items-center justify-center">
           {/* Decorative background blob with floating animation */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl -z-10 animate-float"></div>

           {/* Main Card - The "Playbook" / Strategy View */}
           <div className="relative bg-white w-96 rounded-2xl shadow-2xl border border-gray-100 p-6 z-20 animate-fade-in-up transform transition-transform hover:scale-[1.01] duration-500">
             {/* Card Header */}
             <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-md">
                   <BrainCircuit size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900 text-sm">Innleiðingaráætlun</h3>
                   <p className="text-xs text-gray-500">LioraTech Playbook</p>
                 </div>
               </div>
               <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100">
                 Virkt
               </span>
             </div>

             {/* Checklist Items */}
             <div className="space-y-4 mb-8">
               {/* Item 1 */}
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center border border-blue-100">
                   <CheckCircle2 size={14} />
                 </div>
                 <span className="text-sm text-gray-700 font-medium">Greining á núverandi ferlum</span>
               </div>
               {/* Item 2 */}
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center border border-blue-100">
                   <CheckCircle2 size={14} />
                 </div>
                 <span className="text-sm text-gray-700 font-medium">Greining á tækifærum</span>
               </div>
               {/* Item 3 */}
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-sm">
                   <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                 </div>
                 <span className="text-sm text-gray-900 font-bold">Stefnumótun og innleiðing</span>
               </div>
             </div>

             {/* Mini Chart Area */}
             <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-end mb-3">
                   <div>
                     <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Árangursmæling</span>
                     <div className="text-lg font-bold text-brand-dark flex items-center gap-2">
                       Hagræðing
                     </div>
                   </div>
                   <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold flex items-center">
                     <TrendingUp size={12} className="mr-1" /> Vöxtur
                   </div>
                </div>
                <div className="h-20 flex items-end gap-2 px-1">
                   <div className="w-1/5 bg-gray-200 rounded-t-sm h-[30%]"></div>
                   <div className="w-1/5 bg-gray-300 rounded-t-sm h-[45%]"></div>
                   <div className="w-1/5 bg-blue-200 rounded-t-sm h-[40%]"></div>
                   <div className="w-1/5 bg-blue-400 rounded-t-sm h-[65%]"></div>
                   <div className="w-1/5 bg-brand-primary rounded-t-sm h-[85%] relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Markmið
                      </div>
                   </div>
                </div>
             </div>
           </div>

           {/* Backing Card for depth */}
           <div className="absolute top-1/2 left-1/2 -translate-x-[46%] -translate-y-[46%] w-96 h-[430px] bg-white rounded-2xl shadow-lg border border-gray-100 z-10 opacity-50 scale-95"></div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-brand-primary/50">
        <ChevronDown />
      </div>
    </section>
  );
};

const WhyUsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id={SectionId.WHY_US} className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-50/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">Hvers vegna LioraTech?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Reynsla, skýrleiki og árangur sem þú getur treyst.</p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Card 1 */}
          <div className="p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-card transition-shadow">
            <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-brand-dark">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Reynsla sem skilar árangri</h3>
            <p className="text-gray-600 leading-relaxed">
              Með 10+ ára reynslu í auglýsingum og stafrænni þróun höfum við aðstoðað íslensk fyrirtæki við að ná mælanlegum árangri með AI innleiðingum.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-card transition-shadow">
            <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-brand-dark">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Án flókinna tæknilausna</h3>
            <p className="text-gray-600 leading-relaxed">
              Þú þarft ekki tæknideild eða sérhæfða starfsmenn. Við setjum upp AI lausnir sem allir í fyrirtækinu geta notað strax - án tæknimáls.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-card transition-shadow">
            <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-brand-dark">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Hagnýtar lausnir sem skila sér</h3>
            <p className="text-gray-600 leading-relaxed">
              Við einblínum á tækifæri sem skila mælanlegum árangri. Tímasparnaður, skilvirkni og stöðugleiki - ekki flóknar tæknilausnir sem enginn notar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProvenResultsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-28 bg-gradient-to-br from-white to-blue-50/30 relative">
      {/* Gradient divider at top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">Árangur sem skiptir máli</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Raunverulegur árangur sem íslensk fyrirtæki ná með réttri AI innleiðingu</p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Result 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-brand-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-brand-primary mb-2">5-15 klst</div>
              <div className="text-sm text-gray-500 mb-3">á viku</div>
              <p className="text-gray-700 font-semibold mb-2">Tímasparnaður</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dæmigerður sparnaður í handavinnu með sjálfvirkni og AI lausnum
              </p>
            </div>
          </div>

          {/* Result 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-brand-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-brand-primary mb-2">60-80%</div>
              <div className="text-sm text-gray-500 mb-3">minna handavinna</div>
              <p className="text-gray-700 font-semibold mb-2">Skilvirkni</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Minni handavinna í endurteknum verkefnum og ferlum
              </p>
            </div>
          </div>

          {/* Result 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-brand-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-brand-primary mb-2">30 dagar</div>
              <div className="text-sm text-gray-500 mb-3">að meðaltali</div>
              <p className="text-gray-700 font-semibold mb-2">Innleiðingartími</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Frá greiningu til fyrstu mælanlegra niðurstaðna
              </p>
            </div>
          </div>

          {/* Result 4 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-brand-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-brand-primary mb-2">3-6 mán</div>
              <div className="text-sm text-gray-500 mb-3">ROI tími</div>
              <p className="text-gray-700 font-semibold mb-2">Arðsemi</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dæmigerður tími þar til fjárfestingin skilar sér til baka
              </p>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-brand-primary mb-2">300+</div>
                <p className="text-gray-600 text-sm">Íslensk fyrirtæki sem ég hef unnið með</p>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-brand-primary mb-2">10+</div>
                <p className="text-gray-600 text-sm">Ára reynsla í stafrænni þróun & AI</p>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-brand-primary mb-2">15+</div>
                <p className="text-gray-600 text-sm">Atvinnugreinar með reynslu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id={SectionId.SERVICES} className="py-20 bg-brand-light relative overflow-hidden">
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-light opacity-50"></path>
        </svg>
      </div>

      {/* Subtle background decorations */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Þjónusta</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veldu þá leið sem hentar þínum rekstri best
          </p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Service 1: Free AI Analysis */}
          <div className="bg-brand-light p-8 rounded-xl border-2 border-blue-400 hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
              100% ÓKEYPIS
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BrainCircuit className="text-brand-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Sjálfvirk AI-greining</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fljótleg sjálfvirk greining sem metur stöðu rekstrarins og dregur fram 3–5 skýr tækifæri þar sem AI og sjálfvirkni geta sparað tíma eða aukið afköst. Engin skuldbinding — bara skýr sýn á næstu skref.
            </p>
            <Link
              to="/greining"
              className="inline-flex items-center text-brand-primary font-semibold hover:gap-2 transition-all"
            >
              Fá AI-greiningu <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Service 2: 30 Day Plan */}
          <div className="bg-brand-light p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-brand-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">AI rekstrargreining + 30 daga plan</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sérsniðin greining á rekstri, ferlum og gögnum með ítarlegu 30 daga framkvæmda­plani. Þú færð nákvæmar tillögur um hvað á að gera, í hvaða röð og af hverju, svo hægt sé að hefja innleiðingu strax.
            </p>
            <Link
              to="/30dagaplan"
              className="inline-flex items-center text-brand-primary font-semibold hover:gap-2 transition-all"
            >
              Fá 30 daga plan <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Service 3: 12 Month Roadmap */}
          <div className="bg-brand-light p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-brand-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">12 mánaða AI-roadmap</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Heildstæð 12 mánaða framkvæmdaáætlun fyrir AI og sjálfvirkni í rekstrinum. Inniheldur Executive Overview, forgangsröðun, áfangaskiptingu og mælanleg markmið. Hentar stjórnendum sem vilja skýra, örugga og arðbæra AI-innleiðingu yfir heilt ár.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center text-brand-primary font-semibold hover:gap-2 transition-all"
            >
              Fá verðtilboð <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Service 4: Custom Implementation */}
          <div className="bg-brand-light p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-brand-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Smíði AI- og sjálfvirknilausna</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sérsmíði hagnýtra AI-lausna fyrir raunveruleg vandamál í rekstri. n8n vinnuflæði, API-tengingar, AI agentar, þjónustuferlar, CRM sjálfvirkni og fleira — allt byggt út frá roadmapi eða greiningu.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center text-brand-primary font-semibold hover:gap-2 transition-all"
            >
              Fá verðtilboð <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Service 5: Monthly Operations */}
          <div className="bg-brand-light p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="text-brand-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">AI rekstrarhald – mánaðarleg þjónusta</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Mánaðarleg AI & automation þjónusta sem sér um daglega virkni, viðhald, fínstillingar og stöðugar umbætur. Þú færð varanlegt AI-stuðningsteymi án þess að ráða starfsmann.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center text-brand-primary font-semibold hover:gap-2 transition-all"
            >
              Bóka samtal <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Service 6: AI Playbook */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 p-8 rounded-xl border-2 border-brand-primary/20 hover:shadow-lg transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase rounded-full">
              Kemur bráðlega
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="text-brand-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">AI Playbook fyrir íslensk fyrirtæki</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Hagnýtt AI-playbook með dæmum, flæðimódelum, prompts og 30 daga áætlun fyrir teymi sem vilja byrja sjálf. Ekki kenningar — heldur íslenskt samhengi, raunveruleg dæmi og skýr skref.
            </p>
            <button
              disabled
              className="inline-flex items-center text-gray-400 font-semibold cursor-not-allowed"
            >
              Skrá á biðlista <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id={SectionId.PROCESS} className="py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 text-center">Hvernig það virkar</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Einföld þriggja skrefa nálgun</p>

        <div ref={ref} className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
              1
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4 text-center">Greining</h3>
            <p className="text-gray-600 text-center leading-relaxed mb-3">
              Byrjaðu á sjálfvirkri greiningu eða sérsniðinni faglegri greiningu. Við kortleggjum flöskuhálsa, handavinnu og helstu tækifæri í rekstrinum.
            </p>
            <p className="text-brand-primary text-center font-semibold text-sm">
              → Nákvæm mynd af því hvar tími og úrræði tapast í dag
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
              2
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4 text-center">Áætlun</h3>
            <p className="text-gray-600 text-center leading-relaxed mb-3">
              Út frá greiningu færð þú annað hvort innsýn + tækifæri eða skýra framkvæmdaáætlun með forgangsröðun.
            </p>
            <p className="text-brand-primary text-center font-semibold text-sm">
              → Hvað á að gera, í hvaða röð og hvers vegna — tilbúið til framkvæmda
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
              3
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4 text-center">Framkvæmd & rekstrarhald</h3>
            <p className="text-gray-600 text-center leading-relaxed mb-3">
              Ég smíða sjálfvirkni, AI agenta og vinnuflæði — og sé um áframhaldandi rekstur, viðhald og fínstillingu.
            </p>
            <p className="text-brand-primary text-center font-semibold text-sm">
              → Lausnir sem virka daglega án tæknilegra vandræða eða yfirkeyrslu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="roadmap-section" className="py-24 bg-white relative overflow-hidden">
      {/* Gradient divider at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-100/0 via-blue-100/50 to-blue-100/0"></div>

      {/* Subtle background decorations */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-50/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-slate-100/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            Tilbúin/n að byrja?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veldu þá leið sem hentar þér best
          </p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Quick Start Option */}
          <div>
            <p className="text-center text-sm font-medium text-gray-500 mb-3">Fyrir þá sem vilja byrja strax og ókeypis</p>
            <div className="bg-gradient-to-br from-brand-primary to-blue-600 text-white p-10 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider bg-white/20 rounded-full border border-white/30">
                FLJÓTT & AUÐVELT
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Byrjaðu með AI-greiningu</h3>
              <p className="text-blue-100 mb-6">Fáðu innsýn og tækifæri</p>

              <p className="text-white/90 mb-8 leading-relaxed">
                Fljótleg sjálfvirk greining sem metur stöðu rekstrarins og skilar 3–5 skýrum tækifærum til úrbóta.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0" />
                  <span className="text-sm">Tilbúið fljótt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0" />
                  <span className="text-sm">Skýr framkvæmdaáætlun</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0" />
                  <span className="text-sm">Hægt að byrja strax</span>
                </div>
              </div>

              <Link
                to="/greining"
                className="w-full py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg flex justify-center items-center group"
              >
                Fá AI-greiningu <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              </div>
            </div>
          </div>

          {/* Custom Solution Option */}
          <div>
            <p className="text-center text-sm font-medium text-gray-500 mb-3">Fyrir þá sem vilja sérfræðiráðgjöf og innleiðingu</p>
            <div className="bg-white border-2 border-gray-200 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-primary bg-blue-50 rounded-full border border-blue-200">
                SÉRSNIÐIÐ
              </div>
              <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">Sérsniðin lausn</h3>
              <p className="text-gray-600 mb-6">Við vinnum saman</p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Fáðu persónulega ráðgjöf, sérsniðna greiningu og aðstoð við innleiðingu. Allt frá einföldum sjálfvirknilausnum til heildarumbreytinga.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-brand-primary" />
                  </div>
                  <span className="text-gray-700">Persónuleg ráðgjöf</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-brand-primary" />
                  </div>
                  <span className="text-gray-700">Sérsniðnar lausnir</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-brand-primary" />
                  </div>
                  <span className="text-gray-700">Framkvæmd og viðhald</span>
                </div>
              </div>

              <Link
                to="/quote"
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg flex justify-center items-center group mb-4"
              >
                Fá verðtilboð <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const years = useCounter(10, 2000, isVisible);
  const projects = useCounter(300, 2000, isVisible);

  return (
    <section id={SectionId.ABOUT} className="py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`bg-white rounded-3xl p-8 md:p-16 shadow-soft flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="md:w-1/3">
            {/* Profile Image */}
            <div className="aspect-square rounded-2xl overflow-hidden relative shadow-lg transform hover:scale-105 transition-transform duration-500">
              <img src="/family.jpg" alt="LioraTech fjölskyldan" className="w-full h-full object-cover object-center" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-brand-dark">Ingi Þór Gunnarsson</p>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Hver stendur að baki LioraTech?</h2>
            <h3 className="text-xl text-brand-primary font-medium mb-6">AI Ráðgjafi & Innleiðingarsérfræðingur</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ég hef starfað við stafræna þróun og ráðgjöf í yfir áratug, með reynslu úr auglýsingabransanum og tæknigeiranum. Áður stofnaði ég KIWI, þar sem ég hafði umsjón með stafrænum birtingum, greiningu, sjálfvirkni, SEO og Google Ads fyrir fjölbreytt íslensk fyrirtæki — allt frá litlum rekstri til stærri fyrirtækja.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ástríða mín er að gera tækni aðgengilega og gagnlega fyrir alla — ekki bara tæknitröllin.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Markmið LioraTech er að hjálpa íslenskum fyrirtækjum að ná mælanlegum árangri með AI. Ég einblíni ekki á tæknina sjálfa, heldur á rekstrarárangur: að spara tíma, einfalda ferla og styðja fyrirtæki í því sem skiptir máli.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 transform hover:scale-[1.02] transition-transform duration-300">
              <p className="text-sm font-semibold text-brand-dark mb-2">Sérhæfing:</p>
              <p className="text-sm text-gray-700">n8n vinnuflæði · API tengingar · LLM innleiðing · CRM sjálfvirkni · Rekstrarflæði · AI agentar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center px-6 py-3 bg-gray-50 rounded-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <span className="block font-bold text-2xl text-brand-dark">{years}+</span>
                <span className="text-xs text-gray-500 tracking-wide">Ára reynsla í stafrænni þróun, auglýsingum & rekstri</span>
              </div>
              <div className="text-center px-6 py-3 bg-gray-50 rounded-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <span className="block font-bold text-2xl text-brand-dark">{projects}+</span>
                <span className="text-xs text-gray-500 tracking-wide">Íslensk fyrirtæki sem ég hef unnið með í gegnum tíðina</span>
              </div>
              <div className="text-center px-6 py-3 bg-gray-50 rounded-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <span className="block font-bold text-2xl text-brand-dark">100%</span>
                <span className="text-xs text-gray-500 tracking-wide">Fagmennska, trúnaður og skýr árangursmiðlun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'loading'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://lioratech.app.n8n.cloud/webhook-test/7e156326-1ad2-4543-b4c8-3429825c2f40', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response status:', response.status);
      console.log('Response:', response);

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('idle');
        console.error('Response not OK:', await response.text());
        alert('Eitthvað fór úrskeiðis. Reyndu aftur.');
      }
    } catch (error) {
      setStatus('idle');
      console.error('Error:', error);
      alert('Eitthvað fór úrskeiðis. Reyndu aftur. Error: ' + (error as Error).message);
    }
  };

  return (
    <section id={SectionId.NEWSLETTER} className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="w-10 h-10 text-brand-accent mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Fáðu AI ráð beint í innhólfið</h2>
          <p className="text-gray-400 mb-6">
            Vikulegur tölvupóstur með hagnýtum ráðum, tólum og dæmum sem þú getur prófað strax. Sent á föstudögum.
          </p>
          <div className="mb-8 space-y-2 text-gray-300 text-sm">
            <p>✓ Eitt nýtt AI verkfæri á viku</p>
            <p>✓ Dæmi um hvernig íslensk fyrirtæki nota AI</p>
            <p>✓ Engin sala - bara gagnlegar upplýsingar</p>
          </div>

          {status === 'success' ? (
             <div className="p-4 bg-green-500/20 border border-green-500 text-green-300 rounded-xl animate-fade-in-up">
               Takk fyrir skráninguna! Athugaðu innhólfið þitt til að staðfesta.
             </div>
          ) : (
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto mb-3">
                <input
                  type="email"
                  required
                  placeholder="Þitt netfang..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-gray-700 focus:border-brand-accent text-white placeholder-gray-400 outline-none transition-colors backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-3 bg-brand-accent text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Skrá mig ókeypis'}
                </button>
              </form>
              <p className="text-xs text-gray-400">Afskráðu þig hvenær sem er. Engin ruslpóstur.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const scrollTo = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-serif font-bold text-gray-800">Liora<span className="text-brand-primary">Tech</span></span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI ráðgjöf og innleiðing fyrir íslensk fyrirtæki.
            </p>
          </div>

          {/* Column 2: Þjónusta */}
          <div>
            <h4 className="font-bold text-brand-dark mb-4">Þjónusta</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/greining" className="hover:text-brand-primary transition-colors">Ókeypis AI-greining</Link></li>
              <li><Link to="/30dagaplan" className="hover:text-brand-primary transition-colors">30 daga AI plan</Link></li>
              <li><Link to="/quote" className="hover:text-brand-primary transition-colors">12 mánaða roadmap</Link></li>
              <li><Link to="/quote" className="hover:text-brand-primary transition-colors">Smíði lausna</Link></li>
              <li><Link to="/quote" className="hover:text-brand-primary transition-colors">AI rekstrarhald</Link></li>
            </ul>
          </div>

          {/* Column 3: Fyrirtækið */}
          <div>
            <h4 className="font-bold text-brand-dark mb-4">Fyrirtækið</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => scrollTo(SectionId.ABOUT)} className="hover:text-brand-primary transition-colors">Um okkur</button></li>
              <li><button onClick={() => scrollTo(SectionId.PROCESS)} className="hover:text-brand-primary transition-colors">Hvernig það virkar</button></li>
              <li><button onClick={() => scrollTo(SectionId.NEWSLETTER)} className="hover:text-brand-primary transition-colors">Fréttabréf</button></li>
              <li><Link to="/skilmalar" className="hover:text-brand-primary transition-colors">Skilmálar</Link></li>
            </ul>
          </div>

          {/* Column 4: Hafðu samband */}
          <div>
            <h4 className="font-bold text-brand-dark mb-4">Hafðu samband</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@lioratech.is</span>
              </li>
            </ul>
            <Link
              to="/quote"
              className="mt-4 px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors inline-block"
            >
              Bóka samtal
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} LioraTech Ráðgjöf. Allur réttur áskilinn.
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>
      <div className="min-h-screen font-sans text-brand-dark">
        <Navbar />
        <main>
          <Hero />
          <ServicesSection />
          <WhyUsSection />
          <ProvenResultsSection />
          <ProcessSection />
          <ProductsSection />
          <AboutSection />
          <NewsletterSection />
        </main>
        <Footer />
        <AIChatWidget />
      </div>
    </>
  );
};

export default HomePage;
