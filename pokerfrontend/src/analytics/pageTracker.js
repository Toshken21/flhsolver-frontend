import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;  // or return children, depending on where you use it
};

export default PageViewTracker;