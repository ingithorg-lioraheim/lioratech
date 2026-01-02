import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Cookie Consent Banner
 * GDPR-compliant cookie notice for Google Analytics
 */
const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Enable Google Analytics if not already enabled
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);

    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-brand-primary shadow-2xl animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Text */}
          <div className="flex-1">
            <h3 className="font-bold text-brand-dark mb-2">🍪 Vafrakökur</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Við notum vafrakökur til að bæta upplifun þína og greina umferð á vefnum.
              Með því að smella á "Samþykkja" samþykkir þú notkun okkar á vafrakökum.
              {' '}
              <a href="/skilmalar" className="text-brand-primary hover:underline">
                Lesa nánar
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-dark transition-colors"
            >
              Hafna
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors"
            >
              Samþykkja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
