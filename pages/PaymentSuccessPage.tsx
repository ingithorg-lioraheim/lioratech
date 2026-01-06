import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Home, Mail, Loader2 } from 'lucide-react';
import { trackPurchase } from '../utils/analytics';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const trackSuccess = async () => {
      try {
        // Get orderId from URL or localStorage
        const orderId = searchParams.get('orderid') || localStorage.getItem('payment_order_id');

        if (!orderId) {
          console.warn('No orderId found');
          setProcessing(false);
          return;
        }

        console.log('Payment successful for order:', orderId);

        // Track purchase in Google Analytics (CONVERSION!)
        // Note: COO agent trigger is handled by payment-callback function
        trackPurchase(orderId, 86676, '30 Day AI Roadmap');

        setProcessing(false);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
        setProcessing(false);
      }
    };

    trackSuccess();
  }, [searchParams]);

  if (processing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-6">
        <div className="text-center">
          <Loader2 size={60} className="text-brand-primary animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-dark">Vinnsla í gangi...</h2>
          <p className="text-gray-600 mt-2">Við erum að setja af stað 30 daga roadmap-ið þitt</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center py-12 px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Eitthvað fór úrskeiðis</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <p className="text-gray-600">Vinsamlegast hafðu samband við okkur á ingi@lioratech.is</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle2 size={60} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            Greiðsla tókst!
          </h1>
          <p className="text-xl text-gray-600">
            Takk fyrir pöntunina þína
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 mb-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">
            Hvað gerist núna?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">
                  Staðfesting send á netfang
                </h3>
                <p className="text-gray-600">
                  Þú færð kvittun og staðfestingu á pöntun þinni strax á netfangið þitt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">
                  Byrjum strax að greina
                </h3>
                <p className="text-gray-600">
                  Við byrjum strax að greina fyrirtækið þitt og byggja persónulega 30 daga framkvæmdaáætlun.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">
                  Greining og framkvæmdaáætlun tilbúin innan 3-5 virka daga
                </h3>
                <p className="text-gray-600">
                  Ég hef samband við þig um leið og við höfum greint fyrirtækið þitt og útbúið 30 daga áætlun sem ég fer svo yfir með þér.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-brand-light rounded-xl p-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-dark mb-2">
            <Mail size={20} />
            <span className="font-medium">Spurningar?</span>
          </div>
          <p className="text-gray-600">
            Sendu okkur póst á{' '}
            <a
              href="mailto:ingi@lioratech.is"
              className="text-brand-primary hover:text-brand-dark font-medium"
            >
              ingi@lioratech.is
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg"
          >
            <Home size={20} />
            <span>Til baka á forsíðu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
