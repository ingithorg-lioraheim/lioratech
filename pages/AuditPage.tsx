import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Shield, Clock, Gift, FileText,
  BarChart3, TrendingDown, FlaskConical, ChevronDown, CheckCircle, Lock
} from 'lucide-react';
import { trackLead, trackFormSubmit } from '../utils/analytics';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  adAccountId: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const scrollToForm = () => {
  const el = document.getElementById('audit-form');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ── Accordion ─────────────────────────────────────────────────────────────────
function HowToFindId() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-200 text-sm font-medium hover:text-white transition-colors"
      >
        <span>Hvernig finn ég Ad Account ID?</span>
        <ChevronDown size={18} className="flex-shrink-0 text-brand-accent transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      <div style={{ maxHeight: open ? '400px' : '0px', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <div className="px-5 pb-5 space-y-3">
          <ol className="space-y-2 text-sm text-slate-300">
            {[
              'Opnaðu Meta Business Suite (business.facebook.com)',
              'Smelltu á ⚙️ Stillingar neðst til vinstri',
              'Veldu "Auglýsingareikningar" (Ad accounts)',
              'ID birtist efst — tölur eins og 1606953747166015',
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-lg px-4 py-3 text-sm text-slate-300" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Shield size={14} className="inline text-brand-accent mr-1.5 -mt-0.5" />
            Við sendum þér beiðni um lesaðgang (Analyst). Við getum aldrei breytt auglýsingunum þínum.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Lead Form ──────────────────────────────────────────────────────────────────
function AuditForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', company: '', phone: '', adAccountId: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const field = (id: keyof FormData) => ({
    value: formData[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData(d => ({ ...d, [id]: e.target.value })),
    className: "w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all",
    style: { background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.12)' } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const getCookie = (name: string) => { const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)')); return m ? m[2] : undefined; };
      const res = await fetch('/.netlify/functions/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, fbc: getCookie('_fbc'), fbp: getCookie('_fbp'), eventSourceUrl: window.location.href, clientUserAgent: navigator.userAgent }),
      });
      if (res.ok) {
        setFormStatus('success');
        trackLead('audit_request', 0, formData.email);
        trackFormSubmit('liora_audit', 'lead');
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', { content_name: 'Liora Audit', content_category: 'Meta Ads Audit' });
        }
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center">
        <CheckCircle size={56} className="text-green-400 mx-auto mb-5" />
        <h3 className="text-2xl font-bold text-white mb-3">Takk fyrir!</h3>
        <p className="text-slate-300 text-lg leading-relaxed">Við höfum móttekið beiðni þína og munum hafa samband innan sólarhrings.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name + Company side by side on desktop */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Nafn <span className="text-brand-accent">*</span></label>
          <input id="audit-name" type="text" required placeholder="Jón Jónsson" {...field('name')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Fyrirtæki <span className="text-brand-accent">*</span></label>
          <input id="audit-company" type="text" required placeholder="Fyrirtækið ehf." {...field('company')} />
        </div>
      </div>
      {/* Email + Phone side by side */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Netfang <span className="text-brand-accent">*</span></label>
          <input id="audit-email" type="email" required placeholder="jon@fyrirtaeki.is" {...field('email')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Sími <span className="text-slate-500 text-xs font-normal">(valfrjálst)</span></label>
          <input id="audit-phone" type="tel" placeholder="555-1234" {...field('phone')} />
        </div>
      </div>
      {/* Ad Account ID */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Auglýsingareikningur (Ad Account ID) <span className="text-slate-500 text-xs font-normal">(valfrjálst)</span></label>
        <input id="audit-ad-account" type="text" placeholder="1606953747166015" {...field('adAccountId')} />
        <p className="text-xs text-slate-500 mt-1.5">Hægt að gefa upp seinna — við aðstoðum þig</p>
      </div>

      <HowToFindId />

      {formStatus === 'error' && (
        <div className="rounded-xl px-4 py-3 text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          Villa kom upp. Reyndu aftur eða sendu póst á{' '}
          <a href="mailto:ingi@lioratech.is" className="underline hover:text-red-200">ingi@lioratech.is</a>
        </div>
      )}

      <button
        type="submit"
        disabled={formStatus === 'loading'}
        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}
      >
        {formStatus === 'loading' ? (
          <><svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> Sendi...</>
        ) : (
          <>Fá fría greiningu <ArrowRight size={18} /></>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Gift size={12} className="text-brand-accent" /> Fría</span>
        <span className="flex items-center gap-1"><Shield size={12} className="text-brand-accent" /> 100% öruggt</span>
        <span className="flex items-center gap-1"><Lock size={12} className="text-brand-accent" /> Engar skuldbindingar</span>
        <span className="flex items-center gap-1"><Clock size={12} className="text-brand-accent" /> Svar innan sólarhrings</span>
      </div>
    </form>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AuditPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">

      {/* ── Navbar ── */}
      <nav className="fixed w-full z-40 bg-brand-dark/95 backdrop-blur-sm border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-serif font-bold text-white tracking-tight">
            Liora<span className="text-brand-accent">Tech</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="/liora-audit-demo.html" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 border border-white/20 rounded-lg hover:bg-white/10 transition-all">
              <FileText size={14} /> Sýnishorn
            </a>
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-all shadow-md">
              Fá fría greiningu
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO — two-column, form on the right ── */}
      <section className="relative bg-brand-dark overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/4" />

        <div className="relative container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">

            {/* Left — copy */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
                Ertu að fá raunverulegt <span className="text-brand-accent">virði</span> úr Meta auglýsingunum þínum?
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Við greinum Meta account þinn og sýnum þér nákvæmlega hvað er að kosta þig — og hvað mætti bæta. Ókeypis, án skuldbindinga.
              </p>

              {/* Social proof bullets */}
              <ul className="space-y-3 mb-8">
                {[
                  'ROAS greining vs. meðaltali í þínum geira',
                  'Sundurliðun á sóun — í krónum',
                  '3 mikilvægustu aðgerðirnar til að grípa strax til',
                  '20 mín yfirferð með Inga Þór á Google Meet',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Shield size={13} className="text-brand-accent" /> Read-only — við breytum engu</span>
                <span className="flex items-center gap-1.5"><Clock size={13} className="text-brand-accent" /> Svar innan sólarhrings</span>
                <span className="flex items-center gap-1.5"><Gift size={13} className="text-brand-accent" /> 100% fría</span>
              </div>

              {/* Sample report link */}
              <div className="mt-6">
                <a href="/liora-audit-demo.html" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-accent hover:text-blue-400 transition-colors">
                  <FileText size={15} /> Sjá dæmi um skýrslu →
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div id="audit-form" className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">Fáðu fría greiningu</h2>
                <p className="text-slate-400 text-sm">Fylltu út — við höfum samband innan sólarhrings</p>
              </div>
              <AuditForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2 font-medium text-gray-700">
              <CheckCircle2 size={15} className="text-brand-accent" /> 10+ ára reynsla í AI, markaðssetningu og rekstri
            </span>
            <span className="hidden md:block text-gray-200">|</span>
            <span className="flex items-center gap-2"><Shield size={14} className="text-brand-accent" /> Read-only aðgangur</span>
            <span className="hidden md:block text-gray-200">|</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-brand-accent" /> Niðurstaða innan sólarhrings</span>
            <span className="hidden md:block text-gray-200">|</span>
            <span className="flex items-center gap-2"><Lock size={14} className="text-brand-accent" /> 100% trúnaðarmál</span>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-2">Vandinn</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Þrjú vandamál sem kosta þig án þess að þú vitir</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '💸', title: 'Sóun í budget', body: 'Að meðaltali fara 23–40% af Meta budget til spillis í illa skilgreinda markhópa og veikar auglýsingar.', delay: 0 },
              { emoji: '📊', title: 'Skýrslur án skýrleika', body: 'Flottar PDF-skýrslur sem líta vel út en segja í raun mjög lítið um raunverulegan árangur.', delay: 100 },
              { emoji: '🧪', title: 'Enginn A/B testing', body: 'Þegar ekkert er prófað markvisst verður erfitt að vita hvað virkar. Það er það sem aðskilur vöxt frá sóun.', delay: 200 },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-card border border-gray-100">
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-2">Ferlið</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Hvernig það virkar</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <Lock size={22} className="text-brand-accent" />, title: 'Þú gefur okkur aðgang', body: 'Read-only Analyst aðgangur að Meta Business Manager. Við sjáum gögnin — við breytum engu.' },
              { step: '02', icon: <BarChart3 size={22} className="text-brand-accent" />, title: 'Við greinum', body: 'Greining á öllum campaigns og ads. Við berum saman við geirann og finnum eyður og tækifæri.' },
              { step: '03', icon: <FileText size={22} className="text-brand-accent" />, title: 'Þú færð skýrslu', body: 'Skýr, aðgerðarleg skýrsla innan sólarhrings — með tölur, myndrit og næstu skref.' },
            ].map(({ step, icon, title, body }) => (
              <div key={step} className="rounded-2xl p-7 border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-accent to-blue-500 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-extrabold text-white">{step}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">{icon}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-2">Viðbrögð</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Hvað segja viðskiptavinir</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Liora Audit sýndi okkur nákvæmlega hvernig við gátum sparað yfir 80.000 kr á mánuði — og aukið ROAS á sama tíma.', name: 'Anna K.', title: 'Framkvæmdastjóri, íslensk netverslun' },
              { quote: 'Ég hafði unnið með Meta í tvö ár en aldrei séð jafn skýra skýrslu. Ingi Þór fór með mig í gegnum allt og útskýrði hverja tölu.', name: 'Björn S.', title: 'Eigandi, þjónustufyrirtæki' },
              { quote: 'Frítt audit — já, við vorum efins. En skýrslan var alvöru. Við sjáum þegar niðurstöður eftir þrjár vikur.', name: 'Sigríður H.', title: 'Markaðsstjóri, iðnaðarfyrirtæki' },
            ].map(({ quote, name, title }) => (
              <div key={name} className="bg-slate-50 rounded-2xl p-7 border border-gray-100 flex flex-col">
                <div className="text-brand-accent text-3xl font-serif leading-none mb-4">"</div>
                <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-5">{quote}</p>
                <div>
                  <div className="font-bold text-brand-dark text-sm">{name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{title}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5">* Nöfn dulbær til að vernda persónuvernd</p>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-3xl p-8 md:p-14 shadow-soft flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 w-full max-w-xs mx-auto md:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img src="/family.jpg" alt="Ingi Þór Gunnarsson" className="w-full h-full object-cover object-center" />
              </div>
              <p className="text-center font-bold text-brand-dark mt-4">Ingi Þór Gunnarsson</p>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-serif font-bold text-brand-dark mb-2">Hver stendur að baki LioraTech?</h2>
              <h3 className="text-lg text-brand-primary font-medium mb-5">AI Ráðgjafi & Innleiðingarsérfræðingur</h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                Ég hef starfað við stafræna þróun og ráðgjöf í yfir áratug, með reynslu úr auglýsingabransanum og tæknigeiranum. Áður stofnaði ég KIWI, þar sem ég hafði umsjón með stafrænum birtingum, greiningu, sjálfvirkni, SEO og Google Ads fyrir fjölbreytt íslensk fyrirtæki.
              </p>
              <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                Markmið LioraTech er að hjálpa íslenskum fyrirtækjum að ná mælanlegum árangri með AI — ekki tæknina sjálfa, heldur raunverulegan rekstrarárangur.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-brand-dark mb-1">Sérhæfing:</p>
                <p className="text-sm text-gray-700">Meta Ads · AI greining · n8n vinnuflæði · API tengingar · CRM sjálfvirkni</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: '10+', label: 'Ára reynsla í stafrænni þróun og auglýsingum' },
                  { num: '300+', label: 'Íslensk fyrirtæki sem ég hef unnið með' },
                  { num: '100%', label: 'Fagmennska, trúnaður og skýr niðurstöður' },
                ].map(({ num, label }) => (
                  <div key={num} className="text-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="block font-bold text-2xl text-brand-dark">{num}</span>
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Áður en þú eyðir meira, þarftu að vita hvað er að virka.
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Byrjaðu á ókeypis úttekt og fáðu skýra mynd af árangrinum í Meta-auglýsingunum þínum.
          </p>
          <button onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-white text-lg font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
            Fá fría greiningu <ArrowRight size={20} />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Gift size={12} className="text-brand-accent" /> Fría</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-brand-accent" /> Engar skuldbindingar</span>
            <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-accent" /> Svar innan sólarhrings</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-dark border-t border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <Link to="/" className="text-xl font-serif font-bold text-white tracking-tight">Liora<span className="text-brand-accent">Tech</span></Link>
          <a href="https://lioratech.is" className="hover:text-slate-300 transition-colors">lioratech.is</a>
          <p>&copy; {new Date().getFullYear()} Lioraheim ehf. Allur réttur áskilinn.</p>
        </div>
      </footer>

    </div>
  );
}
