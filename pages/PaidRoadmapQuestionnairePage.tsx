import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';

const PaidRoadmapQuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Contact Info
    email: '',
    name: '',
    companyName: '',
    website: '',
    phone: '',

    // Company Details
    industry: '',
    employees: '',
    revenue: '',

    // Current State
    currentChallenges: '',
    goals: '',
    currentTools: '',
    dataQuality: '',

    // AI Experience
    aiExperience: '',

    // Timeline & Budget
    timeline: '',
    budget: '',

    // Support
    supportLevel: '',
  });

  // Generate unique order ID
  const generateOrderId = () => {
    const date = new Date().toISOString().split('T')[0];
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORDER-${date}-${randomId}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Generate Order ID
      const orderId = generateOrderId();

      // Prepare data for n8n
      const orderData = {
        orderId,
        timestamp: new Date().toISOString(),
        status: 'questionnaire_completed',
        product: '30-day-roadmap',
        ...formData,
      };

      // Send to n8n to save immediately (even before payment)
      const n8nResponse = await fetch('https://lioratech.app.n8n.cloud/webhook/roadmap-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!n8nResponse.ok) {
        throw new Error('Failed to save questionnaire data');
      }

      // Save Order ID and form data to localStorage (backup)
      localStorage.setItem('roadmap_order_id', orderId);
      localStorage.setItem('roadmap_form_data', JSON.stringify(formData));

      console.log('Questionnaire saved with Order ID:', orderId);

      // Redirect to payment page with Order ID
      navigate(`/payment/30dagaplan?orderId=${orderId}`);
    } catch (err: any) {
      console.error('Error saving questionnaire:', err);
      setError('Ekki tókst að vista gögnin. Vinsamlegast reyndu aftur.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      {/* Header */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center cursor-pointer">
            <span className="text-2xl font-serif font-bold text-brand-primary tracking-tight">
              Liora<span className="text-brand-accent">Tech</span>
            </span>
          </Link>
          <Link
            to="/30dagaplan"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Til baka</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-full mb-4">
            SKREF 1 AF 2
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            Segðu okkur um fyrirtækið þitt
          </h1>
          <p className="text-gray-600 text-lg">
            Þessar upplýsingar hjálpa AI að búa til persónulega 30 daga áætlun
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Save className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Gögnin þín eru vistuð strax</h3>
              <p className="text-blue-800 text-sm">
                Við vistum svörin þín áður en þú ferð í greiðslu. Ef eitthvað fer úrskeiðis
                eru gögnin þín örugg og þú getur haldið áfram þar sem þú varst staddur.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 space-y-8">

          {/* Section 1: Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              1. Tengiliðaupplýsingar
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fullt nafn *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="Jón Jónsson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Netfang *
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="jon@fyrirtaeki.is"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fyrirtæki *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="Fyrirtæki ehf."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Símanúmer
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="+354 xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vefsíða fyrirtækis
                </label>
                <input
                  type="url"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="https://fyrirtaeki.is"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Hjálpar AI að greina reksturinn betur</p>
              </div>
            </div>
          </div>

          {/* Section 2: Company Details */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              2. Um fyrirtækið
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Iðnaður *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="T.d. smásala, ráðgjöf, þjónusta..."
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fjöldi starfsmanna *
                  </label>
                  <select
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  >
                    <option value="">Veldu fjölda...</option>
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-50">21-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Áætlaður ársveltu *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                >
                  <option value="">Veldu svið...</option>
                  <option value="0-50m">Undir 50 milljónir</option>
                  <option value="50-200m">50-200 milljónir</option>
                  <option value="200-500m">200-500 milljónir</option>
                  <option value="500m+">Yfir 500 milljónir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Current State */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              3. Núverandi staða
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hverjar eru stærstu áskoranirnar í rekstrinum núna? *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. of mikill tími fer í handvirkar uppfærslur, erfitt að halda utan um verkefni, viðskiptavinir bíða of lengi eftir svörum..."
                  value={formData.currentChallenges}
                  onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hvað vilt þú ná með AI? *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. spara 10+ klst á viku, bæta þjónustu við viðskiptavini, sjálfvirka ítrekunar verkefni..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hvaða tól/kerfi notið þið í dag? *
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="T.d. Excel, Slack, Google Workspace, Salesforce..."
                  value={formData.currentTools}
                  onChange={(e) => setFormData({ ...formData, currentTools: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hversu skipulögð eru gögn ykkar? *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.dataQuality}
                  onChange={(e) => setFormData({ ...formData, dataQuality: e.target.value })}
                >
                  <option value="">Veldu...</option>
                  <option value="not-organized">Ekki skipulögð - allt í tölvupósti og skjölum</option>
                  <option value="partially">Að hluta - í Excel/Sheets</option>
                  <option value="well-organized">Vel skipulögð - í CRM/database</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: AI Experience */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              4. AI reynsla
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hafið þið notað AI áður? *
              </label>
              <select
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                value={formData.aiExperience}
                onChange={(e) => setFormData({ ...formData, aiExperience: e.target.value })}
              >
                <option value="">Veldu...</option>
                <option value="none">Nei, aldrei</option>
                <option value="basic">Já, notað ChatGPT eða álíka</option>
                <option value="integrated">Já, við höfum AI samþætt í rekstur</option>
              </select>
            </div>
          </div>

          {/* Section 5: Timeline & Budget */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              5. Tímalína og fjárhagsáætlun
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hversu hratt vilt þú innleiða? *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                >
                  <option value="">Veldu tímalínu...</option>
                  <option value="asap">Eins fljótt og hægt er (innan mánaðar)</option>
                  <option value="1-3-months">Innan 1-3 mánaða</option>
                  <option value="3-6-months">Innan 3-6 mánaða</option>
                  <option value="flexible">Sveigjanlegur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fjárhagsáætlun fyrir innleiðingu *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">Veldu svið...</option>
                  <option value="0-500k">0-500 þúsund kr</option>
                  <option value="500k-2m">500 þúsund - 2 milljónir</option>
                  <option value="2m-5m">2-5 milljónir</option>
                  <option value="5m+">Yfir 5 milljónir</option>
                  <option value="uncertain">Ekki viss/viss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hvaða stuðning vilt þú? *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.supportLevel}
                  onChange={(e) => setFormData({ ...formData, supportLevel: e.target.value })}
                >
                  <option value="">Veldu...</option>
                  <option value="self-service">DIY - Við viljum bara áætlunina</option>
                  <option value="guidance">Leiðsögn - Smá aðstoð til að byrja</option>
                  <option value="full-service">Full þjónusta - Við viljum að þið gerir þetta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6 border-t-2 border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span>Vista og halda áfram...</span>
                </>
              ) : (
                <>
                  <span>Vista og fara í greiðslu</span>
                  <ArrowRight size={24} />
                </>
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Svörin þín eru vistuð áður en þú ferð í greiðslu
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaidRoadmapQuestionnairePage;
