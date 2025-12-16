import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const QuoteRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    employees: '',
    goals: '',
    budget: '',
    serviceInterest: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://lioratech.app.n8n.cloud/webhook-test/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Til baka</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Fáðu frítt verðtilboð</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Svaraðu nokkrum spurningum og við sendum þér sérsniðið verðtilboð innan 24 klst - með preliminary roadmap sem sýnir hvað er mögulegt í þínum rekstri.</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Takk fyrir beiðnina!</h3>
            <p className="text-gray-600 mb-2">Við höfum móttekið upplýsingarnar þínar og munum senda þér verðtilboð innan 24 klst.</p>
            <p className="text-gray-600 mb-8">Athugaðu tölvupóstinn þinn á <span className="font-semibold text-brand-primary">{formData.email}</span></p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors">
              Til baka á forsíðu
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Þitt nafn *</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="Jón Jónsson"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Símanúmer</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    placeholder="000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vefsíða</label>
                <input
                  type="url"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  placeholder="https://fyrirtaeki.is"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
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
                  <option value="1-5">1-5 starfsmenn</option>
                  <option value="6-20">6-20 starfsmenn</option>
                  <option value="21-50">21-50 starfsmenn</option>
                  <option value="50+">50+ starfsmenn</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hvað viltu ná með AI? *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                  placeholder="T.d. spara tíma í þjónustuveri, sjálfvirka markaðssetningu, greina gögn betur..."
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hvað leitarðu eftir? *</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary transition-colors">
                    <input
                      type="radio"
                      name="serviceInterest"
                      value="30-day-plan"
                      checked={formData.serviceInterest === '30-day-plan'}
                      onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      className="mt-1"
                      required
                    />
                    <div>
                      <div className="font-semibold text-brand-dark">AI rekstrargreining + 30 daga plan</div>
                      <div className="text-sm text-gray-600">Sérsniðin greining á rekstri, ferlum og tækifærum með ítarlegri 30 daga framkvæmdaáætlun</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary transition-colors">
                    <input
                      type="radio"
                      name="serviceInterest"
                      value="12-month-roadmap"
                      checked={formData.serviceInterest === '12-month-roadmap'}
                      onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-brand-dark">12 mánaða AI-roadmap</div>
                      <div className="text-sm text-gray-600">Heildstæð greining og framkvæmdaáætlun fyrir heilt ár</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary transition-colors">
                    <input
                      type="radio"
                      name="serviceInterest"
                      value="full-implementation"
                      checked={formData.serviceInterest === 'full-implementation'}
                      onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-brand-dark">Full innleiðing (1–12 mánuðir)</div>
                      <div className="text-sm text-gray-600">Greining, hönnun, innleiðing, þjálfun og viðhald</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary transition-colors">
                    <input
                      type="radio"
                      name="serviceInterest"
                      value="not-sure"
                      checked={formData.serviceInterest === 'not-sure'}
                      onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-brand-dark">Ég þarf ráðgjöf um hvaða lausn hentar</div>
                      <div className="text-sm text-gray-600">Við hjálpum þér að finna rétta lausnina út frá þínum þörfum</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Áætlað budget</label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">Veldu budget...</option>
                  <option value="<150k">Undir 150.000 kr</option>
                  <option value="150-300k">150.000 - 300.000 kr</option>
                  <option value="300-500k">300.000 - 500.000 kr</option>
                  <option value="500k+">Yfir 500.000 kr</option>
                  <option value="unsure">Óviss</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Sendi...' : 'Senda beiðni'} <ArrowRight size={20} />
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                🔒 Við deila aldrei upplýsingum þínum og sendum 0 ruslpóst
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteRequestPage;
