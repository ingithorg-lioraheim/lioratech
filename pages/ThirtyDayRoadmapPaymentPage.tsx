import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Loader2 } from 'lucide-react';

const ThirtyDayRoadmapPaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    companyName: '',
    website: '',
    phone: '',
  });

  // Load Order ID and pre-fill form data from questionnaire
  useEffect(() => {
    // Get Order ID from URL or localStorage
    const urlOrderId = searchParams.get('orderId');
    const storedOrderId = localStorage.getItem('roadmap_order_id');
    const activeOrderId = urlOrderId || storedOrderId || '';

    setOrderId(activeOrderId);

    // Pre-fill form data from localStorage if available
    const storedFormData = localStorage.getItem('roadmap_form_data');
    if (storedFormData) {
      try {
        const parsed = JSON.parse(storedFormData);
        setFormData({
          email: parsed.email || '',
          name: parsed.name || '',
          companyName: parsed.companyName || '',
          website: parsed.website || '',
          phone: parsed.phone || '',
        });
      } catch (err) {
        console.error('Failed to parse stored form data:', err);
      }
    }
  }, [searchParams]);

  const PRICE_ISK = 69900; // Price in ISK (Icelandic Kr�na)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call Netlify Function to create Rapyd checkout
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: PRICE_ISK,
          currency: 'ISK',
          customerEmail: formData.email,
          customerName: formData.name,
          companyName: formData.companyName,
          metadata: {
            product: '30-day-roadmap',
            orderId: orderId, // Include Order ID to link with questionnaire
            company: formData.companyName,
            website: formData.website,
            phone: formData.phone,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout');
      }

      // Redirect to Rapyd hosted checkout page
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Eitthva� f�r �rskei�is. Vinsamlegast reyndu aftur.');
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
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            Grei�sla
          </h1>
          <p className="text-gray-600 text-lg">
            Skr��u uppl�singar ��nar og haltu �fram � grei�slu
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-brand-primary/5 border-2 border-brand-primary/20 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-brand-dark mb-4">P�ntun ��n</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">30 Daga Framkv�mda��tlun</span>
            <span className="font-bold text-brand-dark">{PRICE_ISK.toLocaleString('is-IS')} kr</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>VSK (24%)</span>
            <span>{Math.round(PRICE_ISK * 0.24).toLocaleString('is-IS')} kr</span>
          </div>
          <div className="border-t border-brand-primary/20 mt-4 pt-4 flex justify-between items-center">
            <span className="font-bold text-lg text-brand-dark">Samtals</span>
            <span className="font-bold text-2xl text-brand-primary">
              {Math.round(PRICE_ISK * 1.24).toLocaleString('is-IS')} kr
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <p className="text-xs text-gray-500 mt-1">Roadmap-i� ver�ur sent hinga�</p>
            </div>

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
                Vefs��a fyrirt�kis
              </label>
              <input
                type="url"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                placeholder="https://fyrirtaeki.is"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Vinsamlegast b��i�...</span>
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  <span>Halda �fram � grei�slu</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lock size={16} />
              <span>�ruggar grei�slur me� Rapyd</span>
            </div>
          </form>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Vi� notum Rapyd fyrir �ruggar grei�slur.</p>
          <p className="mt-2">
            �� munt f� kvittun strax og grei�sla hefur veri� sta�fest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThirtyDayRoadmapPaymentPage;
