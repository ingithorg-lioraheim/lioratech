import React, { useState, useEffect } from 'react';
import { 
  Menu, X, CheckCircle2, 
  ArrowRight, Mail, Calendar, 
  Clock, Zap, Target, BarChart3,
  BrainCircuit, ChevronDown, TrendingUp
} from 'lucide-react';
import { SectionId } from './types';
import AIChatWidget from './components/AIChatWidget';

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
        <div className="flex items-center cursor-pointer" onClick={() => scrollTo(SectionId.HOME)}>
          <span className="text-2xl font-serif font-bold text-brand-primary tracking-tight">Liora<span className="text-brand-accent">Tech</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button onClick={() => scrollTo(SectionId.SERVICES)} className="text-gray-600 hover:text-brand-primary transition-colors">Þjónusta</button>
          <button onClick={() => scrollTo(SectionId.PLAYBOOK)} className="text-gray-600 hover:text-brand-primary transition-colors">Playbook</button>
          <button onClick={() => scrollTo(SectionId.ABOUT)} className="text-gray-600 hover:text-brand-primary transition-colors">Um mig</button>
          <button 
            onClick={() => scrollTo(SectionId.CONSULTATION)}
            className="px-6 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Bóka Ráðgjöf
          </button>
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
            <button onClick={() => scrollTo(SectionId.PLAYBOOK)} className="text-left text-gray-600 font-medium">Playbook</button>
            <button onClick={() => scrollTo(SectionId.ABOUT)} className="text-left text-gray-600 font-medium">Um mig</button>
            <button onClick={() => scrollTo(SectionId.CONSULTATION)} className="text-brand-primary font-bold">Bóka Ráðgjöf</button>
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
        <div className="max-w-xl animate-fade-in-up order-2 md:order-1">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-brand-primary uppercase bg-blue-100 rounded-full border border-blue-200">
            Nýsköpun & Hagræðing
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-brand-dark leading-tight">
            Gerum gervigreind að <span className="text-brand-primary relative">
              samstarfsfélaga
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Við hjálpum íslenskum fyrirtækjum að búa til skýra aðgerðaráætlun fyrir AI innleiðingu. Fáðu nákvæman leiðarvísi um hvernig, hvar og hvenær á að innleiða gervigreind í þínum rekstri.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById(SectionId.CONSULTATION)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-dark transition-all flex items-center justify-center text-lg"
            >
              Bóka fría ráðgjöf <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">Bókað af 50+ íslenskum fyrirtækjum</p>
        </div>

        {/* Hero Visual - Professional/Corporate Look */}
        <div className="relative hidden md:flex order-1 md:order-2 h-full items-center justify-center">
           {/* Decorative background blob */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

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
  return (
    <section id={SectionId.WHY_US} className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">Af hverju fyrirtæki velja okkur</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Reynsla, skýrleiki og árangur sem þú getur treyst.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
            <h3 className="text-xl font-bold text-brand-dark mb-3">Borgaðu bara fyrir það sem virkar</h3>
            <p className="text-gray-600 leading-relaxed">
              Engin langtímaskuldbinding. Ef þú sérð ekki árangur fyrstu vikuna, þá erum við ekki að vinna verkið rétt. Þú ræður ferðinni.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-20 bg-brand-light">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Hvað við gerum</h2>
           <p className="text-gray-600 mb-6 text-lg leading-relaxed">
             Við sérhæfum okkur í að búa til AI innleiðingarleiðarvísi sem gefur þér skýra sýn á hvernig gervigreind getur bætt þinn rekstur. Markmiðið er að þú vitir nákvæmlega hvað á að gera næst.
           </p>
           <ul className="space-y-6 text-gray-700">
             <li className="flex items-start">
               <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1 text-brand-primary">
                 <CheckCircle2 size={20} />
               </div>
               <div>
                 <span className="font-bold text-brand-dark block mb-1">Greining ferla</span>
                 <span className="text-sm text-gray-600">Við kortleggjum núverandi verkferla og greinum hvar AI getur skapað mest verðmæti. Niðurstaðan er skýr mynd af tækifærum í þínum rekstri.</span>
               </div>
             </li>
             <li className="flex items-start">
               <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1 text-brand-primary">
                 <BrainCircuit size={20} />
               </div>
               <div>
                 <span className="font-bold text-brand-dark block mb-1">Leiðarvísir (Playbook)</span>
                 <span className="text-sm text-gray-600">Ítarleg skýrsla með 10-15 innleiðanlegum tillögum, forgangsskipun og nákvæmum aðgerðaáætlunum fyrir næstu 7 og 90 daga.</span>
               </div>
             </li>
             <li className="flex items-start">
               <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1 text-brand-primary">
                 <Target size={20} />
               </div>
               <div>
                 <span className="font-bold text-brand-dark block mb-1">Valfrjáls innleiðing</span>
                 <span className="text-sm text-gray-600">Ef þú vilt, getum við aðstoðað við innleiðinguna eftir að playbookið er tilbúið. Þú ræður hversu langt þú vilt fara.</span>
               </div>
             </li>
           </ul>
        </div>
        
        <div className="md:w-1/2 w-full relative">
           {/* Decorative elements behind */}
           <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
           
           <div className="bg-white p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
             
             {/* Header */}
             <div className="flex justify-between items-start mb-8">
               <div className="bg-brand-primary/5 p-3 rounded-xl">
                 <BarChart3 className="text-brand-primary" size={32} />
               </div>
               <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-100 flex items-center gap-1">
                 <TrendingUp size={12} /> Staðfest
               </div>
             </div>

             <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Skýr aðgerðaráætlun</h3>
             <p className="text-gray-500 mb-8 leading-relaxed">
               Playbookið gefur þér nákvæmlega það sem þú þarft: Hvaða tól á að nota, í hvaða röð, og hvernig þú mælir árangurinn. Engin óvissa - bara skýr vegur áfram.
             </p>

             {/* Metric Cards Grid */}
             <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-brand-primary/30 transition-colors">
                 <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Tímasparnaður</p>
                 <div className="text-2xl font-bold text-brand-primary">30-40%</div>
                 <p className="text-[10px] text-gray-400 mt-1">Við sjálfvirknivæðingu</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-brand-primary/30 transition-colors">
                 <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Arðsemi</p>
                 <div className="text-2xl font-bold text-brand-dark">Strax</div>
                 <p className="text-[10px] text-gray-400 mt-1">Eftir innleiðingu</p>
               </div>
             </div>

             {/* Footer / Quote area */}
             <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-xs">
                    L
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "Markmiðið er að þú fáir leiðarvísi sem þú getur byrjað að fylgja strax - skýr, hagnýtur og sérsniðinn að þínum þörfum."
                  </p>
                </div>
             </div>

           </div>
           
           {/* Floating Badge */}
           <div className="absolute -bottom-6 -left-6 bg-white py-3 px-5 rounded-lg shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce-slow hidden md:flex">
              <div className="bg-blue-50 p-2 rounded-full text-brand-primary">
                <Zap size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Skilvirkni</p>
                <p className="font-bold text-brand-dark">Hámarka afköst</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-16">Hvernig það virkar</h2>
        
        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

          {/* Step 1 */}
          <div className="relative bg-white pt-4">
            <div className="w-16 h-16 mx-auto bg-brand-dark text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Ókeypis samtal</h3>
            <p className="text-gray-600 px-4">
              20 mín samtal þar sem við förum yfir reksturinn og finnum hvar AI getur skapað mest verðmæti. Engin skuldbinding.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white pt-4">
            <div className="w-16 h-16 mx-auto bg-brand-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Ferlagreining</h3>
            <p className="text-gray-600 px-4">
              1–2 tíma djúpköfun í gögn og ferla til að finna tækifærin fyrir mestan ávinning með AI.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white pt-4">
            <div className="w-16 h-16 mx-auto bg-brand-accent text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-3">Leiðarvísir afhentur</h3>
            <p className="text-gray-600 px-4">
              Innan 3 daga færðu fullmótaða skýrslu og aðgerðaplan (roadmap) sem þú getur byrjað að vinna eftir strax.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlaybookSection: React.FC = () => {
  return (
    <section id={SectionId.PLAYBOOK} className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-blue-300 uppercase bg-blue-900/50 rounded-full border border-blue-700">
              Best fyrir fyrirtæki 5-50 starfsmenn
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Heildstæð AI Innleiðingaráætlun
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Playbookið snýst um að innleiða gervigreind í fyrirtækið þitt á markvissan hátt. Þetta er ekki bara skýrsla, heldur vegkort með skýrum aðgerðum fyrir næstu 90 daga.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-blue-500/20 p-2 rounded text-blue-300">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Greining á ferlum</h4>
                  <p className="text-blue-200/80 text-sm">Ítarleg yfirferð á núverandi verkefnum og flöskuhálsum með mælanlegum niðurstöðum.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-blue-500/20 p-2 rounded text-blue-300">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">15 síðna skýrsla</h4>
                  <p className="text-blue-200/80 text-sm">10-15 innleiðanlegar lausnir með ROI útreikningum og gagnadrifinni greiningu.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-blue-500/20 p-2 rounded text-blue-300">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">7 og 90 daga roadmap</h4>
                  <p className="text-blue-200/80 text-sm">Nákvæmt plan með forgangsskiptu verkefnum og tímalínum fyrir fyrstu 3 mánuði.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white text-brand-dark p-8 md:p-12 rounded-2xl shadow-2xl relative">
              <div className="text-center pb-8 border-b border-gray-100">
                <p className="text-gray-500 font-medium mb-2">Heildarpakki fyrir lítil og meðalstór fyrirtæki</p>
                <div className="text-5xl font-serif font-bold text-brand-primary mb-2">Frá 150.000<span className="text-lg text-gray-400 font-sans ml-1">kr.+vsk</span></div>
                <p className="text-sm text-gray-400">Verðbil: 150-250 þús. fer eftir umfangi</p>
                <p className="text-sm font-medium text-green-600 mt-3">Borgar sig til baka á 2-3 mánuðum</p>
              </div>

              <div className="pt-8">
                <div className="mb-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Ítarleg greining á ferlum og tækifærum</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>10-15 hagnýtar tillögur með ROI útreikningu</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Nákvæm 7 og 90 daga roadmap</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Allt sem þú þarft til að byrja</span>
                  </div>
                </div>
                <button
                  onClick={() => document.getElementById(SectionId.CONSULTATION)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-colors shadow-lg flex justify-center items-center group"
                >
                  Fá tilboð í verkefnið <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Playbookið borgar sig margfalt til baka með skýrri áætlun og forgangsskipun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-soft flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            {/* Profile Image */}
            <div className="aspect-square rounded-2xl overflow-hidden relative shadow-lg">
              <img src="/profile.png" alt="Ingithor - AI Ráðgjafi" className="w-full h-full object-cover object-top" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-brand-dark">Ingi Þór Gunnarsson</p>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Hver stendur að baki LioraTech?</h2>
            <h3 className="text-xl text-brand-primary font-medium mb-6">AI Ráðgjafi & Innleiðingarsérfræðingur</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ég hef starfað við stafræna þróun og ráðgjöf í yfir áratug, með reynslu úr auglýsingabransanum og tæknigeiranum. Ástríða mín liggur í að gera tækni aðgengilega og nýtanlega fyrir alla - ekki bara tæknitröllin.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Markmið LioraTech er að hjálpa íslenskum fyrirtækjum að ná mælanlegum árangri með AI. Ástríða mín er ekki bara tæknin sjálf, heldur að sjá íslensk fyrirtæki ná framúrskarandi árangri og spara tíma sem þau geta nýtt í það sem skiptir máli.
            </p>
            <div className="flex gap-4">
              <div className="text-center px-6 py-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="block font-bold text-2xl text-brand-dark">10+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Ára reynsla</span>
              </div>
              <div className="text-center px-6 py-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="block font-bold text-2xl text-brand-dark">100%</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Fagmennska</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultationSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      // Wait for Calendly script to load and initialize the widget
      const initCalendly = () => {
        const widget = document.querySelector('.calendly-inline-widget');
        if (widget && (window as any).Calendly) {
          (window as any).Calendly.initInlineWidget({
            url: 'https://calendly.com/ingithorg/okeypis-ai-radgjof-30-min',
            parentElement: widget,
          });
        } else if (!((window as any).Calendly)) {
          // If Calendly hasn't loaded yet, try again
          setTimeout(initCalendly, 200);
        }
      };

      setTimeout(initCalendly, 100);
    }
  }, [submitted]);

  return (
    <section id={SectionId.CONSULTATION} className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Tökum spjallið</h2>
          <p className="text-gray-600">Bókaðu 20 mínútna fund þar sem við ræðum AI tækifæri í þínum rekstri. Engin skuldbinding.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-brand-primary text-white p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Hvað gerist næst?</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-white/10 p-2 rounded mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">20 mín spjall</h4>
                    <p className="text-blue-100 text-sm mt-1">Við förum yfir stöðuna þína á Google Meet / Zoom.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/10 p-2 rounded mr-4">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Þú velur tíma</h4>
                    <p className="text-blue-100 text-sm mt-1">Finnur tíma sem hentar þér í dagatalinu - venjulega innan 1-2 daga.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/10 p-2 rounded mr-4">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Skýr næstu skref</h4>
                    <p className="text-blue-100 text-sm mt-1">Þú færð skýra mynd af því hvort playbookið hentar þér og hvað það felur í sér.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-3/5 p-10">
            {submitted ? (
              <div className="h-full">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/ingithorg/okeypis-ai-radgjof-30-min"
                  style={{minWidth: '320px', height: '700px'}}
                ></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fullt nafn</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="Jón Jónsson"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vinnunetfang</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="jon@fyrirtaeki.is"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fyrirtæki</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="Fyrirtæki ehf."
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors mt-4 shadow-md text-lg">
                  Bóka fund
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  🔒 Við deila aldrei netfanginu þínu og sendum 0 ruslpóst
                </p>
              </form>
            )}
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
              <li><button onClick={() => scrollTo(SectionId.SERVICES)} className="hover:text-brand-primary transition-colors">Ferlagreining</button></li>
              <li><button onClick={() => scrollTo(SectionId.SERVICES)} className="hover:text-brand-primary transition-colors">Innleiðing lausna</button></li>
              <li><button onClick={() => scrollTo(SectionId.SERVICES)} className="hover:text-brand-primary transition-colors">Þjálfun & Kennsla</button></li>
              <li><button onClick={() => scrollTo(SectionId.PLAYBOOK)} className="hover:text-brand-primary transition-colors">AI Playbook</button></li>
            </ul>
          </div>

          {/* Column 3: Fyrirtækið */}
          <div>
            <h4 className="font-bold text-brand-dark mb-4">Fyrirtækið</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => scrollTo(SectionId.ABOUT)} className="hover:text-brand-primary transition-colors">Um okkur</button></li>
              <li><button onClick={() => scrollTo(SectionId.WHY_US)} className="hover:text-brand-primary transition-colors">Af hverju við</button></li>
              <li><button onClick={() => scrollTo(SectionId.PROCESS)} className="hover:text-brand-primary transition-colors">Hvernig það virkar</button></li>
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
            <button
              onClick={() => scrollTo(SectionId.CONSULTATION)}
              className="mt-4 px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors"
            >
              Bóka samtal
            </button>
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

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <PlaybookSection />
        <AboutSection />
        <ConsultationSection />
        <NewsletterSection />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default App;