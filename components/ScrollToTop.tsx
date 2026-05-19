import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Scrolls to top of page whenever route changes
 * Optimized for both desktop and mobile browsers
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple scroll methods for maximum mobile compatibility
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Fallback for iOS Safari
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }, 0);
  }, [pathname]);

  return null;
}
