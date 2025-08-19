/**
 * Completely passive error handler that doesn't interfere with any fetch operations
 * Only suppresses errors after they occur
 */

if (import.meta.env.DEV) {
  // Handle script loading errors for external services
  document.addEventListener('DOMContentLoaded', () => {
    // Monitor for external script errors
    const scripts = document.querySelectorAll('script[src*="fullstory"], script[src*="analytics"]');
    
    scripts.forEach(script => {
      script.addEventListener('error', (event) => {
        console.warn('External script failed to load:', script.getAttribute('src'));
        event.preventDefault();
      });
    });
  });

  // Monitor for dynamically added scripts
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLScriptElement) {
          const src = node.src || '';
          
          if (src.includes('fullstory.com') || 
              src.includes('google-analytics.com') ||
              src.includes('googletagmanager.com')) {
            
            node.addEventListener('error', (event) => {
              console.warn('External service script error:', src);
              event.preventDefault();
            });
            
            // Set timeout for external scripts
            node.setAttribute('async', 'true');
            node.setAttribute('defer', 'true');
          }
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Clean up observer
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
}

/**
 * Create safe fallbacks for common external services
 */
if (typeof window !== 'undefined') {
  // Safe FullStory fallback
  if (!window.FS) {
    (window as any).FS = {
      identify: () => console.debug('FullStory not available'),
      setUserVars: () => console.debug('FullStory not available'),
      event: () => console.debug('FullStory not available'),
      log: () => console.debug('FullStory not available'),
      getCurrentSessionURL: () => '',
      restart: () => {},
      shutdown: () => {},
    };
  }

  // Safe Google Analytics fallback
  if (!window.gtag) {
    (window as any).gtag = () => console.debug('Google Analytics not available');
  }
}

export {};
