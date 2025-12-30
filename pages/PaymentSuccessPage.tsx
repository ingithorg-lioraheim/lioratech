import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Home, Mail, Loader2 } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const triggerRoadmapGeneration = async () => {
      try {
        // Get orderId from URL
        const orderId = searchParams.get('orderId');
        const checkout = searchParams.get('checkout'); // Rapyd checkout ID

        if (!orderId) {
          throw new Error('Missing orderId in URL');
        }

        // Call n8n webhook to trigger roadmap generation
        const response = await fetch('https://lioratech.app.n8n.cloud/webhook/30-day-payment-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: {
              data: {
                metadata: {
                  orderId: orderId
                },
                id: checkout || 'manual-trigger',
                status: 'CLO', // Closed/Completed
                amount: 69900,
                currency: 'ISK'
              }
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to trigger roadmap generation');
        }

        console.log('Roadmap generation triggered successfully');
        setProcessing(false);
      } catch (err: any) {
        console.error('Error triggering roadmap:', err);
        setError(err.message);
        setProcessing(false);
      }
    };

    triggerRoadmapGeneration();
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
            Grei�sla t�kst!
          </h1>
          <p className="text-xl text-gray-600">
            Takk fyrir p�ntunina ��na
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 mb-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">
            Hva� gerist n�st?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">
                  Sta�festing send � netfang
                </h3>
                <p className="text-gray-600">
                  �� f�r� kvittun og sta�festingu � p�ntun �inni strax � netfangi� �itt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">
                  AI byrjar a� greina
                </h3>
                <p className="text-gray-600">
                  COO-Agent okkar byrjar strax a� greina fyrirt�ki� �itt og byggja pers�nulega 30 daga framkv�mda��tlun.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">
                  Roadmap sent innan 24 klst
                </h3>
                <p className="text-gray-600">
                  �� f�r� pers�nulega AI-greiningu og n�kv�ma 30 daga ��tlun senda � netfangi� �itt sem fagleg PDF sk�rsla.
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
            Sendu okkur p�st �{' '}
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
            <span>Til baka � fors��u</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
