import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

// ──────────────────────────────────────────────
// HOOKS
// ──────────────────────────────────────────────

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return scrolled;
};

const useFadeIn = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, [threshold]);
  return { ref, visible };
};

// ──────────────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────────────

const Navbar: React.FC = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur border-b border-slate-200 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          LioraTech
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className={`flex items-center gap-7 text-sm font-medium transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-300'}`}>
            <a href="#audit" className={`hover:text-slate-900 transition-colors ${scrolled ? '' : 'hover:text-white'}`}>Meta Ads Audit</a>
            <a href="#ai-innleid" className={`hover:text-slate-900 transition-colors ${scrolled ? '' : 'hover:text-white'}`}>AI innleiðing</a>
            <a href="#um-inga" className={`hover:text-slate-900 transition-colors ${scrolled ? '' : 'hover:text-white'}`}>Um Inga</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/audit"
              className="px-5 py-2 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Fá ókeypis audit
            </Link>
            <a
              href="https://calendly.com/ingi-lioratech/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                scrolled
                  ? 'border-slate-300 text-slate-700 hover:border-slate-400'
                  : 'border-white/30 text-white hover:border-white/60'
              }`}
            >
              Bóka fund
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800">
          <div className="flex flex-col p-6 gap-5 text-sm font-medium">
            <a href="#audit" onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">Meta Ads Audit</a>
            <a href="#ai-innleid" onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">AI innleiðing</a>
            <a href="#um-inga" onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">Um Inga</a>
            <div className="border-t border-slate-800 pt-5 flex flex-col gap-3">
              <Link
                to="/audit"
                onClick={() => setOpen(false)}
                className="px-5 py-3 bg-amber-500 text-white text-center font-semibold rounded-lg"
              >
                Fá ókeypis Meta Ads audit
              </Link>
              <Link
                to="/greining"
                onClick={() => setOpen(false)}
                className="px-5 py-3 border border-slate-600 text-slate-300 text-center font-medium rounded-lg"
              >
                Fá fría AI greiningu á rekstrinum
              </Link>
              <a
                href="https://calendly.com/ingi-lioratech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-slate-400 text-center"
              >
                Bóka fund →
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ──────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center bg-slate-950 relative overflow-hidden">
      {/* Subtle radial glow in top-left */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-slate-800/40 rounded-full blur-3xl" />
      </div>

      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-400 mb-10 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            AI ráðgjöf · Meta Ads · Akranes
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
            Flestar Meta auglýsingar
            <br />
            <span className="text-amber-400">sóa peningum.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-400 mb-6 max-w-2xl leading-relaxed font-light">
            Við sýnum þér nákvæmlega hverjar — og byggjum AI kerfi
            <br className="hidden md:block" />
            sem taka yfir það sem þú ert að gera handvirkt.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-amber-500 text-white font-bold rounded-xl text-base hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 group"
            >
              Fá fría Meta Ads greiningu
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/greining"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/15 text-white font-medium rounded-xl text-base hover:bg-white/10 hover:border-white/25 transition-all group"
            >
              Fá fría AI greiningu á rekstrinum
              <ArrowRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Trust row */}
          <p className="text-slate-600 text-sm">
            Ekkert þarf að greiða. Engin skuldbinding. Við sendum niðurstöður.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// SOCIAL PROOF BAR
// ──────────────────────────────────────────────

const SocialProofBar: React.FC = () => (
  <section className="bg-slate-900 border-y border-slate-800 py-8">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
        <p className="text-slate-500 text-sm font-medium whitespace-nowrap md:mr-10 md:border-r md:border-slate-700 md:pr-10">
          Treysta okkur
        </p>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-8">
          {[
            'Míró',
            'JB Múr / Dalsverk',
            'Katla Fitness',
            'Fagleg Þrif',
          ].map((name) => (
            <span key={name} className="text-slate-400 text-sm font-semibold tracking-wide">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ──────────────────────────────────────────────
// LIORA AUDIT SECTION
// ──────────────────────────────────────────────

const LioraAuditSection: React.FC = () => {
  const { ref, visible } = useFadeIn();

  return (
    <section id="audit" className="bg-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Liora Audit</span>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left — copy */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Meta auglýsingar þínar
                <br />
                <span className="text-amber-400">kosta þig meira en þær þurfa.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Við greinum Meta Ads reikninginn þinn og sýnum þér nákvæmlega hvar peningarnir fara — og hvar þú gætt fengið mun meira út úr sömu fjárhæð.
              </p>

              <ul className="space-y-5 mb-12">
                {[
                  'Við segjum þér hvaða auglýsingar eru að eyða peningum án árangurs',
                  'Við sýnum þér hvaða markhópar og creative eru að skila og hverjar ekki',
                  'Þú færð skýra tillögu: hvað á að stöðva, hvað á að skala og hvað vantar',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={13} className="text-amber-400" />
                    </div>
                    <span className="text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/audit"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-amber-500 text-white font-bold rounded-xl text-base hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 group"
              >
                Fá ókeypis audit
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-slate-600 text-sm mt-4">
                Tíu mínútur. Engin skuldbinding. Við greinum reikninginn þinn og sendum niðurstöður.
              </p>
            </div>

            {/* Right — what you get */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-6">Hvað þú færð</p>
              <div className="space-y-6">
                {[
                  {
                    label: 'Eyðsluskýrsla',
                    desc: 'Nákvæmt yfirlit yfir hvar peningarnir fara — niður á auglýsingasett og creative.',
                  },
                  {
                    label: 'Árangurspróf',
                    desc: 'Við berum saman árangur þinn við það sem er eðlilegt í þínum geira á Íslandi.',
                  },
                  {
                    label: 'Skýrar tillögur',
                    desc: 'Þrjár til fimm aðgerðir sem þú getur gert strax til að bæta niðurstöður.',
                  },
                  {
                    label: 'Ókeypis ráðgjöf',
                    desc: 'Eftir greiningu boðum við upp á stutt símtal þar sem við förum í gegnum niðurstöður.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-slate-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-slate-400 text-sm">Við tökum við umsóknum — svar á 24 klst</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// AI INNLEIÐING
// ──────────────────────────────────────────────

const aiServices = [
  {
    title: 'Sjálfvirkar vinnulínur',
    desc: 'Við kortleggjum hvað þú ert að gera handvirkt og gerum það sjálfvirkt. Reikningsgerð, tölvupóstar, gagnaflutnin­gur, skýrslugerð — ferlar sem taka tíma hverja viku þar til við setjum upp kerfið.',
    examples: ['n8n vinnuflæði', 'CRM tengingar', 'Sjálfvirk svör'],
  },
  {
    title: 'AI agentar og chatbotar',
    desc: 'Við byggjum AI aðstoðarmenn sem svara spurningum viðskiptavina, vinna gögn og taka yfir endurteknar verkefni — í heildina eins og starfsmaður sem vinnur allan sólarhringinn.',
    examples: ['Þjónustuver-AI', 'Innri gagnagrunnur', 'Leiðargreining'],
  },
  {
    title: 'Greining og skýrslugerð',
    desc: 'Við tengjum gögn frá ólíkum kerfum saman og búum til mælaborð sem sýna þér nákvæmlega hvað er að gerast í rekstrinum — án þess að þú þurfir að sækja gögn handvirkt.',
    examples: ['Lifandi mælaborð', 'Sjálfvirkar skýrslur', 'Ábendingakerfi'],
  },
];

const AISection: React.FC = () => {
  const { ref, visible } = useFadeIn();

  return (
    <section id="ai-innleid" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-slate-400" />
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">AI innleiðing</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Við byggjum AI kerfi
            <br />
            sem vinna í staðinn fyrir þig.
          </h2>
          <div className="flex items-end">
            <p className="text-slate-500 text-lg leading-relaxed">
              Þú þarft ekki tæknideild. Við sjáum um allt frá greiningu til smíðis til reksturs — þú þarft bara að segja okkur hvar þú ert að tapa tíma.
            </p>
          </div>
        </div>

        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {aiServices.map((s, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-colors"
            >
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.examples.map((ex) => (
                  <span key={ex} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/greining"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-slate-900 text-white font-semibold rounded-xl text-sm hover:bg-slate-800 transition-colors group"
          >
            Fá fría AI greiningu á rekstrinum
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="https://calendly.com/ingi-lioratech/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-slate-300 text-slate-700 font-medium rounded-xl text-sm hover:border-slate-400 transition-colors"
          >
            Eða bóka stutt kynningarfund
          </a>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// HOW IT WORKS
// ──────────────────────────────────────────────

const HowItWorksSection: React.FC = () => {
  const { ref, visible } = useFadeIn();

  const steps = [
    {
      num: '01',
      title: 'Þú sendir inn beiðni',
      desc: 'Fylla út stutt form — það tekur fimm til tíu mínútur. Við þurfum að vita um reksturinn þinn, hvað þú ert að nota og hvar þú finnur helstar áskoranir.',
    },
    {
      num: '02',
      title: 'Við greinum og setjum saman',
      desc: 'Við skoðum það sem þú sendir og setjum saman greiningu. Við Meta Ads: við förum í gegnum reikninginn. Við AI greiningu: við kortleggjum rekstrinn og finnum tækifæri.',
    },
    {
      num: '03',
      title: 'Þú færð niðurstöður',
      desc: 'Við sendum þér skýrslu með skýrum niðurstöðum og tillögum. Ef þú vilt, förum við í gegnum þær í stuttu símtali og svarum spurningum.',
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-slate-600" />
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Hvernig það virkar</span>
        </div>

        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-full w-full h-px bg-slate-800 z-0" style={{ width: 'calc(100% - 2rem)' }} />
              )}
              <div className="relative z-10">
                <div className="text-5xl font-bold text-slate-800 mb-4 leading-none">{step.num}</div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// ABOUT INGI
// ──────────────────────────────────────────────

const AboutSection: React.FC = () => {
  const { ref, visible } = useFadeIn();

  return (
    <section id="um-inga" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] max-w-xs rounded-2xl overflow-hidden bg-slate-100">
              <img
                src="/profile.png"
                alt="Ingi Þór Gunnarsson — stofnandi LioraTech"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -right-6 -bottom-6 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white max-w-[200px]">
              <p className="text-xs text-slate-400 mb-1">Staðsetning</p>
              <p className="text-sm font-semibold">Akranes, Ísland</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-slate-300" />
              <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Um Inga</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
              Ingi Þór Gunnarsson
            </h2>
            <p className="text-slate-500 text-base mb-8">Stofnandi — LioraTech</p>

            <div className="space-y-5 text-slate-600 leading-relaxed">
              <p>
                Áður stofnaði ég KIWI þar sem ég hjálpaði íslenskum fyrirtækjum með Meta auglýsingar, stafræna þróun og sjálfvirkni í mörg ár. Ég sá hvað virkaði og hvað þeytist út um gluggann.
              </p>
              <p>
                Með LioraTech er markmið mitt einfalt: hjálpa raunverulegum fyrirtækjum — eins og þínu — að fá meira út úr Meta budget og innleiða AI á þann hátt sem skilar þér tíma og peningum.
              </p>
              <p>
                Ég tala ekki í tæknimáli. Ég tala um rekstur og um árangur.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                'Meta Ads greining',
                'n8n vinnuflæði',
                'AI agentar',
                'API tengingar',
              ].map((tag) => (
                <div key={tag} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                  {tag}
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="https://calendly.com/ingi-lioratech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl text-sm hover:bg-slate-800 transition-colors"
              >
                Bóka fund með Inga
                <ArrowRight size={15} />
              </a>
              <a
                href="mailto:ingi@lioratech.is"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm hover:border-slate-300 transition-colors"
              >
                ingi@lioratech.is
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// BOTTOM CTA
// ──────────────────────────────────────────────

const BottomCTA: React.FC = () => {
  const { ref, visible } = useFadeIn();

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Hvar er peningurinn
            <br />
            <span className="text-amber-400">að fara?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
            Við getum sýnt þér það. Tíu mínútur af þínum tíma. Við gerum restina.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-amber-500 text-white font-bold rounded-xl text-base hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 group"
            >
              Fá fría Meta Ads greiningu
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/greining"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/15 text-white font-medium rounded-xl text-base hover:bg-white/10 transition-all"
            >
              Fá AI greiningu á rekstrinum
            </Link>
          </div>

          <a
            href="https://calendly.com/ingi-lioratech/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 text-sm hover:text-slate-400 transition-colors"
          >
            Eða bóka fund → calendly.com/ingi-lioratech
          </a>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <div className="text-base font-bold text-white mb-3 tracking-tight">LioraTech</div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
            AI ráðgjöf og Meta Ads greining fyrir íslensk fyrirtæki.
            Við hjálpum þér að fá meira út úr tíma þínum og auglýsingabudget.
          </p>
          <p className="text-slate-700 text-xs mt-4">Akranes, Ísland</p>
        </div>
        <div>
          <h4 className="text-slate-400 font-semibold mb-4 text-xs uppercase tracking-widest">Þjónusta</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/audit" className="text-slate-600 hover:text-white transition-colors">Liora Audit (Meta Ads)</Link></li>
            <li><Link to="/greining" className="text-slate-600 hover:text-white transition-colors">AI greining á rekstri</Link></li>
            <li><Link to="/quote" className="text-slate-600 hover:text-white transition-colors">Smíði AI lausna</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-400 font-semibold mb-4 text-xs uppercase tracking-widest">Tenglar</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="https://calendly.com/ingi-lioratech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-white transition-colors"
              >
                Bóka fund
              </a>
            </li>
            <li><a href="mailto:ingi@lioratech.is" className="text-slate-600 hover:text-white transition-colors">ingi@lioratech.is</a></li>
            <li><Link to="/skilmalar" className="text-slate-600 hover:text-white transition-colors">Skilmálar</Link></li>
            <li><Link to="/personuvernd" className="text-slate-600 hover:text-white transition-colors">Persónuvernd</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-6 text-sm text-slate-700">
        © {new Date().getFullYear()} LioraTech. Allur réttur áskilinn.
      </div>
    </div>
  </footer>
);

// ──────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────

const HomePageV2: React.FC = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialProofBar />
        <LioraAuditSection />
        <AISection />
        <HowItWorksSection />
        <AboutSection />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageV2;
