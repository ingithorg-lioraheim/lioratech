import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import RoadmapPurchasePage from './pages/RoadmapPurchasePage';
import ThirtyDayRoadmapPage from './pages/ThirtyDayRoadmapPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuoteRequestPage />} />
        <Route path="/roadmap" element={<RoadmapPurchasePage />} />
        <Route path="/30roadmap" element={<ThirtyDayRoadmapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
