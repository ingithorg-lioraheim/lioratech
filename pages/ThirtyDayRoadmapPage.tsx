import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft, Target, Clock, BarChart3, Zap } from 'lucide-react';
import { trackViewItem, trackCTAClick, trackPageView } from '../utils/analytics';

const ThirtyDayRoadmapPage: React.FC = () => {
  // Track page view and product view on page load
  useEffect(() => {
    trackPageView('/30dagaplan', '30 daga plan - Landing síða');

    // Track that user is viewing the 30 day plan product
    trackViewItem({
      item_id: '30-daga-plan',
      item_name: '30 daga plan',
      price: 86676, // Total with VSK
      quantity: 1
    });
  }, []);

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
          <Link to="/" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors">
            <ArrowLeft size={20} />
            <span>Til baka</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-full mb-6">
              PERSÓNULEG RÁÐGJÖF
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-6 leading-tight">
              30 Daga Framkvæmdaáætlun
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fáðu persónulega ráðgjöf og nákvæma, skref-fyrir-skref áætlun til að innleiða AI í þínum rekstri.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12 border-2 border-brand-primary/10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-6">Hvað færðu?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">Persónuleg ráðgjöf</h3>
                      <p className="text-gray-600">Ég greini reksturinn þinn í samstarfi við þig - ekki bara sjálfvirk greining</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">Ítarleg 30 daga framkvæmdaáætlun</h3>
                      <p className="text-gray-600">Skref fyrir skref hvað á að gera, hvenær og hvernig</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">Forgangsröðun og tímasetning</h3>
                      <p className="text-gray-600">Hvað á að gera fyrst til að ná mestum árangri</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">Fagleg PDF skýrsla</h3>
                      <p className="text-gray-600">Tilbúið til að deila með teyminu og hrinda í framkvæmd</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-brand-primary to-brand-accent text-white rounded-2xl p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold mb-2">69.900 kr</div>
                  <p className="text-blue-100">+ vsk, eitt skipti greiðsla</p>
                </div>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>Persónuleg greining með sérfræðingi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>30 daga framkvæmdaáætlun</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>Forgangsröðun og tímasetning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>Fagleg PDF skýrsla</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>Klár til framkvæmda strax</span>
                  </div>
                </div>

                <Link
                  to="/30dagaplan/questionnaire"
                  onClick={() => trackCTAClick('Panta núna', '30day_landing_pricing_card')}
                  className="w-full py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg flex justify-center items-center group"
                >
                  Panta núna <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-center text-blue-100 text-xs mt-4">
                  Tilbúið eftir 3-5 virkir daga
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Hvernig það virkar</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2 text-center">Panta</h3>
                <p className="text-gray-600 text-center text-sm">
                  Smelltu á "Panta núna"
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2 text-center">Spurningar</h3>
                <p className="text-gray-600 text-center text-sm">
                  Svaraðu spurningum um reksturinn
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2 text-center">Borga</h3>
                <p className="text-gray-600 text-center text-sm">
                  Öruggar greiðslur með korti
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                  4
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2 text-center">Staðfesting</h3>
                <p className="text-gray-600 text-center text-sm">
                  Fáðu áætlunina eftir 3-5 daga
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose This */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 mb-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-brand-dark mb-6 text-center">Hvers vegna velja 30 daga áætlun?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Target className="text-brand-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-brand-dark mb-2">Skýr stefna</h3>
                  <p className="text-gray-600">Þú veist nákvæmlega hvað þú átt að gera næstu 30 daga</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-brand-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-brand-dark mb-2">Sparar tíma</h3>
                  <p className="text-gray-600">Engin umhugsunarstund - bara framkvæma áætlunina</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BarChart3 className="text-brand-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-brand-dark mb-2">Mælanlegur árangur</h3>
                  <p className="text-gray-600">Þú sérð nákvæmlega hvað á að gerast og hvenær</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="text-brand-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-brand-dark mb-2">Fljótleg innleiðing</h3>
                  <p className="text-gray-600">Byrjaðu að sjá árangur innan 30 daga</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-brand-dark text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Tilbúin/n að byrja?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Fáðu persónulega ráðgjöf og skýra 30 daga áætlun fyrir AI innleiðingu
            </p>
            <Link
              to="/30dagaplan/questionnaire"
              onClick={() => trackCTAClick('Panta 30 daga áætlun', '30day_landing_bottom_cta')}
              className="inline-flex items-center px-10 py-5 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg text-lg"
            >
              Panta 30 daga áætlun <ArrowRight className="ml-2" />
            </Link>
            <p className="text-gray-400 text-sm mt-4">
              Eða <Link to="/quote" className="underline hover:text-white">hafðu samband</Link> ef þú hefur spurningar
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThirtyDayRoadmapPage;
