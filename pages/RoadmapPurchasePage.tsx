import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Clock, TrendingUp, Zap } from 'lucide-react';
import { trackPageView, trackFormSubmit, trackLead, trackCTAClick } from '../utils/analytics';

type Step = 'intro' | 'form' | 'loading' | 'success';
type FormStep = 1 | 2 | 3;

interface FormData {
  // Step 1
  name: string;
  company: string;
  size: string;
  industry: string;
  // Step 2
  timeWasters: string;
  tools: string;
  orderMethod: string;
  manualWork: string;
  // Step 3
  biggestProblem: string;
  sixMonthGoal: string;
  email: string;
}

const RoadmapPurchasePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Sendir inn gögn...');
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    size: '',
    industry: '',
    timeWasters: '',
    tools: '',
    orderMethod: '',
    manualWork: '',
    biggestProblem: '',
    sixMonthGoal: '',
    email: '',
  });

  useEffect(() => {
    trackPageView('/greining', 'AI Greining — LioraTech');
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const handleIntro = () => {
    trackCTAClick('Hefja fría greiningu', 'intro_section');
    setCurrentStep('form');
    setFormStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const isStep1Valid = () => formData.name && formData.company && formData.size && formData.industry;
  const isStep2Valid = () => formData.timeWasters && formData.tools && formData.orderMethod && formData.manualWork;
  const isStep3Valid = () => formData.biggestProblem && formData.sixMonthGoal && formData.email;

  const nextFormStep = () => {
    if (formStep === 1 && isStep1Valid()) {
      setFormStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (formStep === 2 && isStep2Valid()) {
      setFormStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevFormStep = () => {
    if (formStep > 1) {
      setFormStep((formStep - 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startLoadingAnimation = () => {
    const texts = [
      'Sendir inn gögn...',
      'AI er að lesa rekstrarinn þinn...',
      'Greinir tímatap og vandamál...',
      'Finnur tækifæri til sjálfvirkni...',
      'Setur saman skýrslu þína...',
    ];
    let textIdx = 0;
    let progress = 0;

    progressInterval.current = setInterval(() => {
      progress += Math.random() * 3 + 1;
      if (progress > 92) progress = 92;
      setLoadingProgress(Math.round(progress));

      const newIdx = Math.min(Math.floor(progress / 20), texts.length - 1);
      if (newIdx !== textIdx) {
        textIdx = newIdx;
        setLoadingText(texts[textIdx]);
      }
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !isStep3Valid()) return;

    setIsSubmitting(true);
    setCurrentStep('loading');
    setLoadingProgress(0);
    startLoadingAnimation();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      trackFormSubmit('AI Greining', 'ai_audit');

      const response = await fetch('https://lioratech.app.n8n.cloud/webhook/roadmap-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Original form fields
          name: formData.name,
          email: formData.email,
          company: formData.company,
          size: formData.size,
          industry: formData.industry,
          timeWasters: formData.timeWasters,
          tools: formData.tools,
          orderMethod: formData.orderMethod,
          manualWork: formData.manualWork,
          biggestProblem: formData.biggestProblem,
          sixMonthGoal: formData.sixMonthGoal,
          // n8n field names
          companyName: formData.company,
          employees: formData.size,
          currentChallenges: [formData.timeWasters, formData.manualWork, formData.biggestProblem].join('\n\n'),
          currentTools: formData.tools,
          goals: formData.sixMonthGoal,
          website: '',
          timeline: '',
        }),
      });

      if (progressInterval.current) clearInterval(progressInterval.current);
      setLoadingProgress(100);

      if (response.ok) {
        trackLead('ai_audit', 0);
        setTimeout(() => {
          setCurrentStep('success');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 600);
      } else {
        const err = await response.json().catch(() => ({}));
        alert(err.error || 'Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
        setCurrentStep('form');
        setFormStep(3);
      }
    } catch (error) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      console.error('Error:', error);
      alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
      setCurrentStep('form');
      setFormStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- UI helpers ---
  const inputClass =
    'w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-2';

  const progressSteps = [
    { id: 'intro', label: 'Yfirlit', number: 1 },
    { id: 'form', label: 'Spurningar', number: 2 },
    { id: 'success', label: 'Lokið', number: 3 },
  ];
  const currentStepIndex =
    currentStep === 'loading' ? 2 : progressSteps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-brand-light py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Til baka</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-full mb-4">
            SJÁLFVIRK AI-GREINING
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            {currentStep === 'intro' && 'Við sýnum þér hvar reksturinn tapar tíma og peninga'}
            {currentStep === 'form' && (
              formStep === 1 ? 'Segðu okkur frá fyrirtækinu' :
              formStep === 2 ? 'Hvernig lítur daglegur rekstur út?' :
              'Hvað er stærsta vandamálið?'
            )}
            {currentStep === 'loading' && 'AI er að greina rekstrarinn þinn...'}
            {currentStep === 'success' && 'Greiningin er tilbúin!'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {currentStep === 'intro' &&
              'Svaraðu 10 spurningum og fáðu skýra greiningu á rekstrinum þínum — frítt og án skuldbindinga.'}
            {currentStep === 'form' && (
              formStep === 1 ? 'Skref 1 af 3 — Grunnupplýsingar um reksturinn' :
              formStep === 2 ? 'Skref 2 af 3 — Daglegar aðgerðir og kerfi' :
              'Skref 3 af 3 — Vandamál og markmið'
            )}
            {currentStep === 'loading' && 'Þetta tekur 30–60 sekúndur...'}
            {currentStep === 'success' &&
              `Greining þín er tilbúin og niðurstöður verða sendar á ${formData.email} fljótlega.`}
          </p>
        </div>

        {/* Progress indicator */}
        {currentStep !== 'loading' && (
          <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2 ${
                    index <= currentStepIndex ? 'text-brand-primary' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index <= currentStepIndex ? 'bg-brand-primary text-white' : 'bg-gray-200'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${
                      index < currentStepIndex ? 'bg-brand-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── INTRO ── */}
        {currentStep === 'intro' && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-brand-primary" size={24} />
              <h3 className="text-2xl font-bold text-brand-dark">Hvað færðu?</h3>
            </div>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <TrendingUp size={24} className="text-brand-primary flex-shrink-0 mt-1" />,
                  title: '3–5 skýr tækifæri til úrbóta',
                  desc: 'AI greinir rekstrarinn þinn og sýnir hvar mest er hægt að bæta',
                },
                {
                  icon: <Clock size={24} className="text-brand-primary flex-shrink-0 mt-1" />,
                  title: 'Áhrifamat á tíma- og peningatap',
                  desc: 'Sjáðu hvað handvirk vinna kostar þig í raun — í klukkustundum og krónum',
                },
                {
                  icon: <Zap size={24} className="text-brand-primary flex-shrink-0 mt-1" />,
                  title: 'Quick wins — hvað þú getur gert strax',
                  desc: 'Hlutir sem hægt er að byrja á í dag — engin tækniþekking þörf',
                },
                {
                  icon: <CheckCircle2 size={24} className="text-brand-primary flex-shrink-0 mt-1" />,
                  title: 'Engin skuldbinding',
                  desc: 'Frítt, án kreditkorts, án þess að þurfa að kaupa neitt',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  {item.icon}
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 p-6 rounded-xl mb-8">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-brand-dark mb-1">100% frítt</p>
                <p className="text-sm text-gray-600">Tekur 5–7 mínútur. Engin skuldbinding.</p>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  Ekkert kreditkort þarf
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  Upplýsingarnar þínar eru aldrei deildar
                </p>
              </div>
            </div>

            <button
              onClick={handleIntro}
              className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-lg text-lg flex items-center justify-center gap-2"
            >
              Hefja fría greiningu →
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">🔒 Gögnin þín eru örugg</p>
          </div>
        )}

        {/* ── FORM ── */}
        {currentStep === 'form' && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            {/* Form step progress */}
            <div className="flex items-center gap-1 mb-8">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <div
                    className={`flex-1 h-2 rounded-full transition-all ${
                      n <= formStep ? 'bg-brand-primary' : 'bg-gray-200'
                    }`}
                  />
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* ── SKREF 1 ── */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Fullt nafn *</label>
                    <input
                      required
                      type="text"
                      className={inputClass}
                      placeholder="t.d. Jón Jónsson"
                      value={formData.name}
                      onChange={update('name')}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Nafn fyrirtækis *</label>
                    <input
                      required
                      type="text"
                      className={inputClass}
                      placeholder="Fyrirtæki ehf."
                      value={formData.company}
                      onChange={update('company')}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Hve margir starfa hjá ykkur? *</label>
                    <select
                      required
                      className={inputClass}
                      value={formData.size}
                      onChange={update('size')}
                    >
                      <option value="">Veldu stærð...</option>
                      <option value="1–5">1–5 starfsmenn</option>
                      <option value="6–20">6–20 starfsmenn</option>
                      <option value="21–50">21–50 starfsmenn</option>
                      <option value="50+">50+ starfsmenn</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Í hvaða atvinnugrein? *</label>
                    <input
                      required
                      type="text"
                      className={inputClass}
                      placeholder="t.d. verslun, ráðgjöf, þjónusta, iðnaður..."
                      value={formData.industry}
                      onChange={update('industry')}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={prevFormStep}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Til baka
                    </button>
                    <button
                      type="button"
                      onClick={nextFormStep}
                      disabled={!isStep1Valid()}
                      className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Áfram <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── SKREF 2 ── */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      Hvað eyðir þú mestum tíma í — og vildir losna við? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="t.d. svara sömu spurningum aftur og aftur, slá inn gögn handvirkt, senda minnismiðar..."
                      value={formData.timeWasters}
                      onChange={update('timeWasters')}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Hvaða kerfi og forrit eru í notkun í dag? *</label>
                    <textarea
                      required
                      rows={2}
                      className={`${inputClass} resize-none`}
                      placeholder="t.d. Excel, Outlook, Instagram, bókhaldshugbúnaður..."
                      value={formData.tools}
                      onChange={update('tools')}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Hvernig berast pantanir / bókanir til ykkar? *
                    </label>
                    <select
                      required
                      className={inputClass}
                      value={formData.orderMethod}
                      onChange={update('orderMethod')}
                    >
                      <option value="">Veldu...</option>
                      <option value="Email">Tölvupóstur</option>
                      <option value="Sími">Sími</option>
                      <option value="Vefsíða">Vefsíða / netverslun</option>
                      <option value="Handvirkt">Handvirkt / í bók</option>
                      <option value="Annað">Annað</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Hvaða þættir í rekstrinum eru handvirkir og endurteknir? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="t.d. reikningagerð, pantanavinnsla, tímasetningar, samskipti við viðskiptavini..."
                      value={formData.manualWork}
                      onChange={update('manualWork')}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={prevFormStep}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Til baka
                    </button>
                    <button
                      type="button"
                      onClick={nextFormStep}
                      disabled={!isStep2Valid()}
                      className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Áfram <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── SKREF 3 ── */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Hvað er stærsta vandamálið þitt í dag? *</label>
                    <textarea
                      required
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Lýstu helsta vandamálinu — hvað veldur þér mestum höfuðverk?"
                      value={formData.biggestProblem}
                      onChange={update('biggestProblem')}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Hvað viltu að líti öðruvísi út eftir 6 mánuði? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Lýstu draumaástandi — hvað lítur vel út þegar þú horfir aftur eftir hálft ár?"
                      value={formData.sixMonthGoal}
                      onChange={update('sixMonthGoal')}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Netfang *</label>
                    <input
                      required
                      type="email"
                      className={inputClass}
                      placeholder="jon@fyrirtaeki.is"
                      value={formData.email}
                      onChange={update('email')}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Greiningin verður send á þetta netfang. Við sendum aldrei ruslpóst.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    ✅ Engin skuldbinding — við sendum þér greininguna og erum alltaf reiðubúin að fara yfir hana saman.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={prevFormStep}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Til baka
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isStep3Valid()}
                      className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                    >
                      Hefja fría greiningu →
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* ── LOADING ── */}
        {currentStep === 'loading' && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <svg
                className="animate-spin w-20 h-20 text-brand-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-brand-dark mb-3">
              AI er að greina rekstrarinn þinn
            </h3>
            <p className="text-gray-600 mb-8 text-lg">{loadingText}</p>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="bg-brand-primary h-3 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{loadingProgress}% lokið</p>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Tímatap', icon: '⏰' },
                { label: 'Tækifæri', icon: '💡' },
                { label: 'Quick Wins', icon: '⚡' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {currentStep === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-brand-dark mb-4">Greiningin er tilbúin!</h3>
            <p className="text-gray-700 mb-2 text-lg">Greining á rekstrinum þínum er lokið.</p>
            <p className="text-gray-600 mb-8">
              Niðurstöður verða sendar á{' '}
              <span className="font-semibold text-brand-primary">{formData.email}</span> fljótlega.
            </p>

            <div className="bg-white rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
              <h4 className="font-bold text-brand-dark mb-3">Hvað er í greiningunni?</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">→</span>
                  <span>3 stærstu tækifærin í rekstrinum þínum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">→</span>
                  <span>Áhrifamat á tíma- og peningatap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">→</span>
                  <span>2–3 quick wins sem hægt er að gera strax</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">→</span>
                  <span>Ferlar sem hægt er að sjálfvirknivæða</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">→</span>
                  <span>Næstu skref — bæði sjálfstætt og með LioraTech</span>
                </li>
              </ul>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors"
            >
              Til baka á forsíðu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPurchasePage;
