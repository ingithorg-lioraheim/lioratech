import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';
import { trackBeginCheckout, trackPageView } from '../utils/analytics';

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

  // Track page view and begin checkout on mount
  useEffect(() => {
    trackPageView('/questionnaire/30dagaplan', '30 daga plan - Spurningalisti');

    // Track that user has begun the checkout process
    trackBeginCheckout({
      item_id: '30-daga-plan',
      item_name: '30 daga plan',
      price: 86676, // Total with VSK
      quantity: 1
    });
  }, []);

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
      setError('Ekki t�kst a� vista g�gnin. Vinsamlegast reyndu aftur.');
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
            Seg�u okkur um fyrirt�ki� �itt
          </h1>
          <p className="text-gray-600 text-lg">
            �essar uppl�singar hj�lpa AI a� b�a til pers�nulega 30 daga ��tlun
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Save className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">G�gnin ��n eru vistu� strax</h3>
              <p className="text-blue-800 text-sm">
                Vi� vistum sv�rin ��n ��ur en �� fer� � grei�slu. Ef eitthva� fer �rskei�is
                eru g�gnin ��n �rugg og �� getur haldi� �fram �ar sem �� varst staddur.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 space-y-8">

          {/* Section 1: Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              1. Tengili�auppl�singar
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
                    placeholder="J�n J�nsson"
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
                    Fyrirt�ki *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="Fyrirt�ki ehf."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    S�man�mer
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
                  Vefs��a fyrirt�kis
                </label>
                <input
                  type="url"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="https://fyrirtaeki.is"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Hj�lpar AI a� greina reksturinn betur</p>
              </div>
            </div>
          </div>

          {/* Section 2: Company Details */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              2. Um fyrirt�ki�
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I�na�ur *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="T.d. sm�sala, r��gj�f, �j�nusta..."
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fj�ldi starfsmanna *
                  </label>
                  <select
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  >
                    <option value="">Veldu fj�lda...</option>
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-50">21-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ��tla�ur �rsveltu *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                >
                  <option value="">Veldu svi�...</option>
                  <option value="0-50m">Undir 50 millj�nir</option>
                  <option value="50-200m">50-200 millj�nir</option>
                  <option value="200-500m">200-500 millj�nir</option>
                  <option value="500m+">Yfir 500 millj�nir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Current State */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              3. N�verandi sta�a
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hverjar eru st�rstu �skoranirnar � rekstrinum n�na? *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. of mikill t�mi fer � handvirkar uppf�rslur, erfitt a� halda utan um verkefni, vi�skiptavinir b��a of lengi eftir sv�rum..."
                  value={formData.currentChallenges}
                  onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hva� vilt �� n� me� AI? *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. spara 10+ klst � viku, b�ta �j�nustu vi� vi�skiptavini, sj�lfvirka �trekunar verkefni..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hva�a t�l/kerfi noti� �i� � dag? *
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
                  Hversu skipul�g� eru g�gn ykkar? *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.dataQuality}
                  onChange={(e) => setFormData({ ...formData, dataQuality: e.target.value })}
                >
                  <option value="">Veldu...</option>
                  <option value="not-organized">Ekki skipul�g� - allt � t�lvup�sti og skj�lum</option>
                  <option value="partially">A� hluta - � Excel/Sheets</option>
                  <option value="well-organized">Vel skipul�g� - � CRM/database</option>
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
                Hafi� �i� nota� AI ��ur? *
              </label>
              <select
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                value={formData.aiExperience}
                onChange={(e) => setFormData({ ...formData, aiExperience: e.target.value })}
              >
                <option value="">Veldu...</option>
                <option value="none">Nei, aldrei</option>
                <option value="basic">J�, nota� ChatGPT e�a �l�ka</option>
                <option value="integrated">J�, vi� h�fum AI sam��tt � rekstur</option>
              </select>
            </div>
          </div>

          {/* Section 5: Timeline & Budget */}
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 pb-2 border-b-2 border-brand-primary/20">
              5. T�mal�na og fj�rhags��tlun
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hversu hratt vilt �� innlei�a? *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                >
                  <option value="">Veldu t�mal�nu...</option>
                  <option value="asap">Eins flj�tt og h�gt er (innan m�na�ar)</option>
                  <option value="1-3-months">Innan 1-3 m�na�a</option>
                  <option value="3-6-months">Innan 3-6 m�na�a</option>
                  <option value="flexible">Sveigjanlegur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fj�rhags��tlun fyrir innlei�ingu *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">Veldu svi�...</option>
                  <option value="0-500k">0-500 ��sund kr</option>
                  <option value="500k-2m">500 ��sund - 2 millj�nir</option>
                  <option value="2m-5m">2-5 millj�nir</option>
                  <option value="5m+">Yfir 5 millj�nir</option>
                  <option value="uncertain">Ekki viss/viss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hva�a stu�ning vilt ��? *
                </label>
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.supportLevel}
                  onChange={(e) => setFormData({ ...formData, supportLevel: e.target.value })}
                >
                  <option value="">Veldu...</option>
                  <option value="self-service">DIY - Vi� viljum bara ��tlunina</option>
                  <option value="guidance">Lei�s�gn - Sm� a�sto� til a� byrja</option>
                  <option value="full-service">Full �j�nusta - Vi� viljum a� �i� gerir �etta</option>
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
                  <span>Vista og halda �fram...</span>
                </>
              ) : (
                <>
                  <span>Vista og fara � grei�slu</span>
                  <ArrowRight size={24} />
                </>
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Sv�rin ��n eru vistu� ��ur en �� fer� � grei�slu
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaidRoadmapQuestionnairePage;
