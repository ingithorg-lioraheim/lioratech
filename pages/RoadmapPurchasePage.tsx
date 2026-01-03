import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft, CreditCard, Sparkles } from 'lucide-react';
import { trackPageView, trackFormSubmit, trackLead, trackCTAClick } from '../utils/analytics';

type Step = 'intro' | 'questionnaire' | 'payment' | 'success';

const RoadmapPurchasePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    website: '',
    industry: '',
    employees: '',
    currentChallenges: '',
    goals: '',
    currentTools: '',
    timeline: ''
  });

  // Track page view on mount
  useEffect(() => {
    trackPageView('/greining', 'Ókeypis AI Greining');
  }, []);

  const handleIntro = () => {
    trackCTAClick('Halda áfram', 'intro_section');
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaire = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Track form submission
      trackFormSubmit('Ókeypis AI Greining', 'free_analysis');

      // Send data to n8n
      const response = await fetch('https://lioratech.app.n8n.cloud/webhook/roadmap-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Track successful lead generation (FREE - high value!)
        trackLead('free_analysis', 0);

        setCurrentStep('success');
      } else {
        alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
      setIsSubmitting(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Integrate with Stripe/payment gateway here
      // For now, send data to n8n after "payment"
      const response = await fetch('https://lioratech.app.n8n.cloud/webhook/roadmap-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCurrentStep('success');
      } else {
        alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
    }
  };

  const progressSteps = [
    { id: 'intro', label: 'Yfirlit', number: 1 },
    { id: 'questionnaire', label: 'Spurningar', number: 2 },
    { id: 'success', label: 'Klárað', number: 3 }
  ];

  const currentStepIndex = progressSteps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-brand-light py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Til baka</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-full mb-4">
            SJÁLFVIRK AI-GREINING
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            {currentStep === 'intro' && 'Fáðu ókeypis AI-greining'}
            {currentStep === 'questionnaire' && 'Segðu okkur um fyrirtækið þitt'}
            {currentStep === 'success' && 'Takk fyrir!'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {currentStep === 'intro' && 'Fljótleg sjálfvirk greining sem metur stöðu rekstrarins og skilar 3–5 skýrum tækifærum til úrbóta. Engin skuldbinding.'}
            {currentStep === 'questionnaire' && 'Þessar upplýsingar hjálpa AI að greina reksturinn og finna bestu tækifærin'}
            {currentStep === 'success' && 'Greiningin þín verður tilbúin innan 24 klst'}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto">
          {progressSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center gap-2 ${index <= currentStepIndex ? 'text-brand-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index <= currentStepIndex ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>
                  {step.number}
                </div>
                <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">{step.label}</span>
              </div>
              {index < progressSteps.length - 1 && (
                <div className={`w-8 h-0.5 ${index < currentStepIndex ? 'bg-brand-primary' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Intro Step */}
        {currentStep === 'intro' && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-brand-primary" size={24} />
              <h3 className="text-2xl font-bold text-brand-dark">Hvað færðu?</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle2 size={24} className="text-brand-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">3–5 skýr tækifæri til úrbóta</h4>
                  <p className="text-sm text-gray-600">Fáðu innsýn í bestu möguleikana fyrir reksturinn þinn</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle2 size={24} className="text-brand-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Sjálfvirk AI-greining</h4>
                  <p className="text-sm text-gray-600">AI greinir svörin þín og metur stöðu rekstrarins</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle2 size={24} className="text-brand-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Fljótleg niðurstaða</h4>
                  <p className="text-sm text-gray-600">Greiningin þín send innan 24 klst</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle2 size={24} className="text-brand-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Engin skuldbinding</h4>
                  <p className="text-sm text-gray-600">Prófaðu þjónustuna án skuldbindingar</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 p-6 rounded-xl mb-8">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-brand-dark mb-2">100% ókeypis</p>
                <p className="text-sm text-gray-600">Ókeypis greining – niðurstöður sendar innan 24 klst.</p>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Engin kreditkort gögn þörf</span>
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Engin skuldbinding</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleIntro}
              className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-lg text-lg flex items-center justify-center gap-2"
            >
              Halda áfram <ArrowRight size={20} />
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              🔒 Við deilum aldrei upplýsingum þínum
            </p>
          </div>
        )}

        {/* Questionnaire Step */}
        {currentStep === 'questionnaire' && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleQuestionnaire} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Netfang *</label>
                <input
                  required
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="jon@fyrirtaeki.is"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Roadmap-ið verður sent hingað</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nafn fyrirtækis *</label>
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="Fyrirtæki ehf."
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vefsíða fyrirtækis</label>
                <input
                  type="url"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="https://fyrirtaeki.is"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Hjálpar AI að greina reksturinn betur</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Iðnaður *</label>
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="T.d. smásala, ráðgjöf, þjónusta..."
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fjöldi starfsmanna *</label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.employees}
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                >
                  <option value="">Veldu fjölda...</option>
                  <option value="1-5">1-5</option>
                  <option value="6-20">6-20</option>
                  <option value="21-50">21-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hverjar eru stærstu áskoranirnar í rekstrinum núna? *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. of mikill tími fer í handvirkar uppfærslur, erfitt að halda utan um verkefni..."
                  value={formData.currentChallenges}
                  onChange={(e) => setFormData({...formData, currentChallenges: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hvað vilt þú ná með AI? *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. spara tíma, bæta þjónustu við viðskiptavini, sjálfvirka verkefni..."
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hvaða tól notið þið í dag? *</label>
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="T.d. Excel, Slack, Google Workspace..."
                  value={formData.currentTools}
                  onChange={(e) => setFormData({...formData, currentTools: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hversu hratt vilt þú innleiða? *</label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                >
                  <option value="">Veldu tímalínu...</option>
                  <option value="asap">Eins fljótt og hægt er</option>
                  <option value="1-3-months">Innan 1-3 mánaða</option>
                  <option value="3-6-months">Innan 3-6 mánaða</option>
                  <option value="flexible">Sveigjanlegur</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-white font-bold rounded-lg transition-colors shadow-lg text-lg flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-brand-primary hover:bg-brand-dark'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sendir inn...
                  </>
                ) : (
                  <>
                    Fá ókeypis greiningu <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-brand-dark mb-4">Takk fyrir!</h3>
            <p className="text-gray-700 mb-2 text-lg">AI er byrjað að greina svörin þín.</p>
            <p className="text-gray-600 mb-8">Þú munt fá greininguna þína með 3–5 tækifærum sent á <span className="font-semibold text-brand-primary">{formData.email}</span> innan 24 klst.</p>

            <div className="bg-white rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h4 className="font-bold text-brand-dark mb-3">Hvað gerist næst?</h4>
              <ul className="text-sm text-gray-600 text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary">→</span>
                  <span>AI greinir svörin þín og metur stöðu rekstrarins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary">→</span>
                  <span>Þú færð 3–5 skýr tækifæri til úrbóta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary">→</span>
                  <span>Nýttu innsýnina til að bæta reksturinn!</span>
                </li>
              </ul>
            </div>

            <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors">
              Til baka á forsíðu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPurchasePage;
