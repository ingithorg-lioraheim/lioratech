import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import RoadmapPurchasePage from './pages/RoadmapPurchasePage';
import ThirtyDayRoadmapPage from './pages/ThirtyDayRoadmapPage';
import ThirtyDayRoadmapQuestionnairePage from './pages/ThirtyDayRoadmapQuestionnairePage';
import ThirtyDayRoadmapPaymentPage from './pages/ThirtyDayRoadmapPaymentPage';
import PaidRoadmapQuestionnairePage from './pages/PaidRoadmapQuestionnairePage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentErrorPage from './pages/PaymentErrorPage';
import TermsPage from './pages/TermsPage';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuoteRequestPage />} />
        <Route path="/greining" element={<RoadmapPurchasePage />} />
        <Route path="/30dagaplan" element={<ThirtyDayRoadmapPage />} />

        {/* New payment flow: questionnaire → payment → success */}
        <Route path="/30dagaplan/questionnaire" element={<ThirtyDayRoadmapQuestionnairePage />} />
        <Route path="/30dagaplan/payment" element={<ThirtyDayRoadmapPaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-error" element={<PaymentErrorPage />} />

        {/* Old routes (deprecated) */}
        <Route path="/questionnaire/30dagaplan-paid" element={<PaidRoadmapQuestionnairePage />} />
        <Route path="/payment/30dagaplan" element={<ThirtyDayRoadmapPaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/questionnaire/30dagaplan" element={<ThirtyDayRoadmapQuestionnairePage />} />
        <Route path="/skilmalar" element={<TermsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
