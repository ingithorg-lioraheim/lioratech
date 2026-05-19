import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, Mail, RefreshCw } from 'lucide-react';

const PaymentErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <XCircle size={60} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            Grei�sla mist�kst
          </h1>
          <p className="text-xl text-gray-600">
            Eitthva� f�r �rskei�is vi� grei�sluna
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200 mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-4">
            Hva� g�ti hafa fari� �rskei�is?
          </h2>

          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500">"</span>
              <span>Kortauppl�singar voru rangar e�a �fulln�gjandi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">"</span>
              <span>Ekki n�gilegt f� � kortinu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">"</span>
              <span>Korti� �itt hefur veri� l�st e�a �trunni�</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">"</span>
              <span>T�mabundin villa � grei�slukerfi</span>
            </li>
          </ul>

          <div className="bg-brand-light rounded-lg p-4">
            <p className="text-brand-dark font-medium">
              Engar uppl�singar voru vista�ar og ekkert var rukka� af kortinu ��nu.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 mb-8">
          <Link
            to="/30dagaplan/payment"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg"
          >
            <RefreshCw size={20} />
            <span>Reyna aftur</span>
          </Link>

          <Link
            to="/30dagaplan"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-brand-dark font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Til baka</span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="bg-brand-light rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-dark mb-2">
            <Mail size={20} />
            <span className="font-medium">�arftu a�sto�?</span>
          </div>
          <p className="text-gray-600">
            Sendu okkur p�st �{' '}
            <a
              href="mailto:ingi@lioratech.is"
              className="text-brand-primary hover:text-brand-dark font-medium"
            >
              ingi@lioratech.is
            </a>
            {' '}og vi� leysum �etta fyrir �ig
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorPage;
