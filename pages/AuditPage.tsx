import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, AlertTriangle, FlaskConical, CheckCircle2,
  ArrowRight, Mail, Clock, Shield, TrendingDown, Search,
  FileText, Calendar, Lock, ChevronRight, Gift, ChevronDown, CheckCircle
} from 'lucide-react';

const useScrollAnimation = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return { ref, isVisible };
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ''
}) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  );
};

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  hasGrantedAccess: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const scrollToForm = () => {
  const el = document.getElementById('audit-form');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function AuditPage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    hasGrantedAccess: false,
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/.netlify/functions/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone || undefined,
          hasGrantedAccess: formData.hasGrantedAccess,
        }),
      });
      if (res.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">

      {/* ── Navbar ── */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-serif font-bold text-brand-primary tracking-tight">Liora<span className="text-brand-accent">Tech</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="/liora-audit-demo.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-brand-primary border border-brand-primary/30 rounded-lg hover:bg-brand-primary/5 transition-all"
            >
              <FileText size={14} />
              Sýnishorn
            </a>
            <button
              onClick={scrollToForm}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
            >
              Fá fría greiningu
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-brand-dark overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
            Ertu viss um að Meta auglýsingar þínar séu að skila sér?
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            Liora Audit greinir þinn ad account og sýnir nákvæmlega hvað er að kosta þig — og hvað mætti bæta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-white text-lg font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              Fá fría greiningu
              <ArrowRight size={20} />
            </button>
            <a
              href="/liora-audit-demo.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white text-base font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              <FileText size={18} />
              Sjá sýnishorn
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Gift size={14} className="text-brand-accent" /> Fría greiningu</span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-brand-accent" /> 100% öruggt</span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5"><Lock size={14} className="text-brand-accent" /> Engar skuldbindingar</span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-accent" /> Niðurstaða innan við sólarhring</span>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2 font-medium text-gray-700">
              <CheckCircle2 size={16} className="text-brand-accent" />
              Byggt á 10+ ára reynslu í gervigreind, markaðssetningu, sölu og rekstri.
            </span>
            <span className="hidden md:block text-gray-200">|</span>
            <span className="flex items-center gap-2">
              <Shield size={15} className="text-brand-accent" />
              Read-only aðgangur — við breytum engu
            </span>
            <span className="hidden md:block text-gray-200">|</span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-brand-accent" />
              Niðurstaða innan við sólarhring
            </span>
            <span className="hidden md:block text-gray-200">|</span>
            <span className="flex items-center gap-2">
              <Lock size={15} className="text-brand-accent" />
              100% trúnaðarmál
            </span>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="py-20 md:py-28 bg-brand-light">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest text-center mb-3">Vandinn</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-14">
              Þrjú vandamál sem kosta þig án þess að þú vitir
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingDown size={24} className="text-brand-accent" />,
                emoji: '💸',
                title: 'Sóun í auglýsingakostnaði',
                body: 'Að meðaltali fara 23–40% af Meta-auglýsingabudgeti til spillis í illa skilgreinda markhópa og veikar auglýsingar — fjármunir sem skila engum raunverulegum árangri.',
                delay: 0,
              },
              {
                icon: <BarChart3 size={24} className="text-brand-accent" />,
                emoji: '📊',
                title: 'Skýrslur án skýrleika',
                body: 'Ertu að fá raunverulegar ROAS-tölur — eða bara flottar PDF-skýrslur sem líta vel út en segja í raun mjög lítið?',
                delay: 100,
              },
              {
                icon: <FlaskConical size={24} className="text-brand-accent" />,
                emoji: '🧪',
                title: 'Árangur kemur ekki af tilviljun',
                body: 'Þegar ekkert er prófað markvisst verður erfitt að vita hvað virkar í alvöru. Góðar A/B-prófanir eru það sem aðskilur vöxt frá sóun.',
                delay: 200,
              },
            ].map(({ emoji, title, body, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className="bg-white rounded-2xl p-7 shadow-card border border-gray-100 h-full flex flex-col">
                  <div className="text-3xl mb-4">{emoji}</div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm flex-1">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest text-center mb-3">Viðbrögð</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-14">
              Hvað segja viðskiptavinir
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Við vissum ekki hvað við vorum að tapa. Liora Audit sýndi okkur nákvæmlega hvernig við gátum sparað yfir 80.000 kr á mánuði — og aukið ROAS á sama tíma.',
                name: 'Anna K.',
                title: 'Framkvæmdastjóri, íslensk netverslun',
                delay: 0,
              },
              {
                quote: 'Ég hafði unnið með Meta í tvö ár en aldrei séð jafn skýra skýrslu. Ingi Þór fór með mig í gegnum allt og útskýrði hverja tölu. Mjög vel útbúinn.',
                name: 'Björn S.',
                title: 'Eigandi, þjónustufyrirtæki á höfuðborgarsvæðinu',
                delay: 100,
              },
              {
                quote: 'Frítt audit — já, við vorum efins. En skýrslan var alvöru. Við fórum í gang með ráðleggingar þeirra og sjáum nú þegar niðurstöður eftir þrjár vikur.',
                name: 'Sigríður H.',
                title: 'Markaðsstjóri, iðnaðarfyrirtæki',
                delay: 200,
              },
            ].map(({ quote, name, title, delay }) => (
              <FadeIn key={name} delay={delay}>
                <div className="bg-brand-light rounded-2xl p-7 border border-gray-100 h-full flex flex-col">
                  <div className="text-brand-accent text-3xl font-serif leading-none mb-4">"</div>
                  <p className="text-gray-700 leading-relaxed text-sm flex-1 italic mb-6">{quote}</p>
                  <div>
                    <div className="font-bold text-brand-dark text-sm">{name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{title}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={100}>
            <p className="text-center text-xs text-gray-400 mt-6">* Nöfn og upplýsingar eru dulbær til að vernda persónuvernd viðskiptavina</p>
          </FadeIn>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn>
              <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-3">Hvað færðu</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">
                Hvað færðu í Liora Audit?
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Þetta er ekki almenn skýrsla. Þetta er nákvæm greining á þínum account — með tölur, niðurstöður og aðgerðir.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform text-sm"
              >
                Fá fría greiningu
                <ArrowRight size={16} />
              </button>
            </FadeIn>

            <FadeIn delay={100}>
              <ul className="space-y-4">
                {[
                  { icon: <BarChart3 size={18} />, text: 'ROAS greining vs. meðaltali í þínum geira' },
                  { icon: <TrendingDown size={18} />, text: 'Sundurliðun á sóun í auglýsingakostnaði — í krónum' },
                  { icon: <FlaskConical size={18} />, text: 'Ósvöruð prófunaratriði: Hvaða spurningum í herferðunum þínum hefur enn ekki verið svarað?' },
                  { icon: <FileText size={18} />, text: 'Þrjár mikilvægustu ráðleggingarnar til að grípa strax til — í forgangsröð' },
                  { icon: <Calendar size={18} />, text: '20 mín yfirferð með Inga Þór á Google Meet' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-4 p-4 rounded-xl bg-brand-light border border-gray-100">
                    <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      {icon}
                    </span>
                    <span className="text-brand-dark font-medium leading-snug pt-1">{text}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest text-center mb-3">Ferlið</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white text-center mb-14">
              Hvernig það virkar
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-brand-accent/10 via-brand-accent/50 to-brand-accent/10" />

            {[
              {
                step: '01',
                icon: <Lock size={22} className="text-brand-accent" />,
                title: 'Þú gefur okkur aðgang',
                body: 'Read-only Analyst aðgangur að Meta Business Manager. Við sjáum gögnin — við breytum engu.',
                delay: 0,
              },
              {
                step: '02',
                icon: <Search size={22} className="text-brand-accent" />,
                title: 'Við greinum',
                body: 'AI-drifin greining á öllum campaigns, ad sets og ads. Við berum saman við geirann og finnum eyður.',
                delay: 120,
              },
              {
                step: '03',
                icon: <FileText size={22} className="text-brand-accent" />,
                title: 'Þú færð skýrslu',
                body: 'Skýr, aðgerðarleg skýrsla innan við sólarhrings — með tölur, myndrit og næstu skref.',
                delay: 240,
              },
            ].map(({ step, icon, title, body, delay }) => (
              <FadeIn key={step} delay={delay}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300
                  bg-gradient-to-br from-white/5 to-brand-accent/5
                  border border-white/10
                  hover:border-brand-accent/40
                  hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]
                  hover:-translate-y-1"
                >
                  {/* Subtle animated border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-br from-brand-accent/10 via-transparent to-blue-500/10 pointer-events-none" />

                  <div className="relative flex items-center gap-3 mb-5">
                    {/* Prominent gradient step number */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-accent to-blue-500 flex items-center justify-center shadow-lg shadow-brand-accent/30">
                      <span className="text-xs font-extrabold text-white tracking-wider">{step}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 group-hover:bg-brand-accent/20 transition-colors flex items-center justify-center">
                      {icon}
                    </div>
                  </div>
                  <h3 className="relative text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="relative text-slate-400 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit Form ── */}
      <section id="audit-form" className="py-20 md:py-28 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-2xl">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-3">Byrjaðu hér</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Byrjaðu hér — fáðu fría greiningu
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Fylltu út og við höfum samband innan sólarhrings
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center">
                <CheckCircle size={56} className="text-green-400 mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-white mb-3">Takk fyrir!</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Við höfum móttekið beiðni þína og munum hafa samband innan sólarhrings.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10 space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="audit-name">
                    Nafn <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    id="audit-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                    placeholder="Jón Jónsson"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                    style={{
                      background: '#1a1a2e',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="audit-email">
                    Netfang <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    placeholder="jon@fyrirtaeki.is"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                    style={{
                      background: '#1a1a2e',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="audit-company">
                    Fyrirtæki <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    id="audit-company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData(d => ({ ...d, company: e.target.value }))}
                    placeholder="Fyrirtækið ehf."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                    style={{
                      background: '#1a1a2e',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="audit-phone">
                    Símanúmer <span className="text-slate-500 text-xs font-normal">(valfrjálst)</span>
                  </label>
                  <input
                    id="audit-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                    placeholder="555-1234"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                    style={{
                      background: '#1a1a2e',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Meta access accordion */}
                <div
                  className="rounded-xl border border-white/10 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <button
                    type="button"
                    onClick={() => setAccordionOpen(o => !o)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-200 text-sm font-medium hover:text-white transition-colors"
                  >
                    <span>Hvernig gef ég aðgang að auglýsingareikningnum mínum?</span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 text-brand-accent transition-transform duration-300"
                      style={{ transform: accordionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  <div
                    style={{
                      maxHeight: accordionOpen ? '600px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <div className="px-5 pb-5 space-y-4">
                      <ol className="space-y-2.5 text-sm text-slate-300">
                        {[
                          'Opnaðu Meta Business Suite (business.facebook.com)',
                          'Farðu í ⚙️ Stillingar → Auglýsingareikningar',
                          'Veldu auglýsingareikninginn þinn',
                          'Smelltu á "Bæta við fólki" eða "Úthluta samstarfsaðilum"',
                          'Sláðu inn: ingi@lioratech.is',
                          'Veldu hlutverkið "Greiningaraðili" (Analyst) — þetta gefur eingöngu lesaðgang',
                          'Smelltu á "Staðfesta"',
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-4 rounded-lg px-4 py-3 text-sm text-slate-300" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <Shield size={14} className="inline text-brand-accent mr-1.5 -mt-0.5" />
                        <strong className="text-white">Greiningaraðili (Analyst)</strong> hefur eingöngu lesaðgang — við getum aldrei breytt auglýsingunum þínum eða eytt neinu.
                      </div>

                      <p className="text-sm text-slate-400">
                        Ef þú þarft nánari aðstoð, skráðu þig hér að neðan og við aðstoðum þig skref fyrir skref.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Granted access checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.hasGrantedAccess}
                    onChange={e => setFormData(d => ({ ...d, hasGrantedAccess: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded accent-brand-accent cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-snug">
                    Ég hef gefið aðgang að auglýsingareikningi
                  </span>
                </label>

                {/* Error message */}
                {formStatus === 'error' && (
                  <div className="rounded-xl px-4 py-3 text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    Villa kom upp. Vinsamlegast reyndu aftur eða sendu póst á{' '}
                    <a href="mailto:ingi@lioratech.is" className="underline hover:text-red-200 transition-colors">ingi@lioratech.is</a>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                  }}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sendi...
                    </>
                  ) : (
                    <>
                      Senda beiðni
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <FadeIn>
            {/* Visual accent */}
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-8">
              <BarChart3 size={28} className="text-brand-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
              Áður en þú eyðir meira, þarftu að vita hvað er að virka.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10 text-lg">
              Byrjaðu á ókeypis úttekt og fáðu skýra mynd af árangrinum í Meta-auglýsingunum þínum.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white text-lg font-semibold rounded-xl hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
              >
                <Mail size={20} />
                Fá fría greiningu
              </button>
              <a
                href="/liora-audit-demo.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-gray-200 text-gray-700 text-base font-medium rounded-xl hover:border-brand-primary hover:text-brand-primary transition-all"
              >
                <FileText size={18} />
                Sjá sýnishorn
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Gift size={14} className="text-brand-accent" /> Fría greiningu</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-accent" /> Engar skuldbindingar</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-accent" /> Niðurstaða innan við sólarhring</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-light border-t border-gray-100 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <Link to="/" className="text-xl font-serif font-bold text-brand-primary tracking-tight">
            Liora<span className="text-brand-accent">Tech</span>
          </Link>
          <div className="flex items-center gap-1 hover:text-brand-primary transition-colors">
            <ChevronRight size={14} />
            <a href="https://lioratech.is">lioratech.is</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Lioraheim ehf. Allur réttur áskilinn.</p>
        </div>
      </footer>

    </div>
  );
}
