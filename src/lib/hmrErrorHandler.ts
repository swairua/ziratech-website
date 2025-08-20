/**
 * Minimal HMR error handler for development environment
 * Only handles critical errors without interfering with Vite's normal operation
 */

if (import.meta.env.DEV) {
  // Prevent unhandled promise rejections from HMR ping failures from causing alerts
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    const stack = event.reason?.stack || '';

    // Only suppress Vite HMR ping errors that are expected during development
    if (reason.includes('Failed to fetch') && 
        (stack.includes('ping') || 
         stack.includes('waitForSuccessfulPing') ||
         stack.includes('@vite/client'))) {
      
      // Prevent the error from showing in console as an unhandled rejection
      event.preventDefault();
      
      // Log as debug info instead
      console.debug('Vite HMR ping failed (network connectivity issue, continuing development)');
    }
  });

  // Provide minimal debug info
  (window as any).__HMR_DEBUG__ = {
    version: '1.0.0-minimal'
  };
}

export {};
