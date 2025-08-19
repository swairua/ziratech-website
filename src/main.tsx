import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/passiveErrorHandler' // Passive external service error handling
import './lib/hmrErrorHandler' // Handle HMR connectivity issues

// Comprehensive passive error suppression for external services and HMR
window.addEventListener('error', (event) => {
  const error = event.error;
  const filename = event.filename || '';
  const message = error?.message || '';
  const stack = error?.stack || '';

  // Suppress Vite HMR ping errors
  if (message.includes('Failed to fetch') &&
      (stack.includes('ping') ||
       stack.includes('waitForSuccessfulPing') ||
       stack.includes('@vite/client') ||
       filename.includes('@vite/client'))) {
    console.debug('Vite HMR ping error suppressed (network connectivity issue)');
    event.preventDefault();
    return false;
  }

  // Suppress FullStory errors
  if ((filename.includes('fullstory.com') || filename.includes('edge.fullstory.com')) ||
      (message.includes('fullstory') && message.includes('Failed to fetch'))) {
    console.debug('FullStory service error suppressed');
    event.preventDefault();
    return false;
  }

  // Suppress other external analytics errors
  if (filename.includes('google-analytics.com') ||
      filename.includes('googletagmanager.com') ||
      filename.includes('facebook.com') ||
      filename.includes('twitter.com')) {
    console.debug('External analytics service error suppressed');
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from external services and HMR
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.toString() || '';
  const stack = event.reason?.stack || '';

  // Suppress Vite HMR rejections
  if (reason.includes('Failed to fetch') &&
      (stack.includes('ping') ||
       stack.includes('waitForSuccessfulPing') ||
       stack.includes('@vite/client'))) {
    console.debug('Vite HMR promise rejection suppressed');
    event.preventDefault();
    return;
  }

  // Suppress external service rejections
  if (reason.includes('fullstory.com') ||
      reason.includes('edge.fullstory.com') ||
      reason.includes('google-analytics.com') ||
      reason.includes('googletagmanager.com') ||
      stack.includes('fullstory') ||
      stack.includes('analytics')) {
    console.debug('External service promise rejection suppressed');
    event.preventDefault();
  }
});

// Suppress console errors from external services and HMR issues
if (import.meta.env.DEV) {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args.join(' ');

    // Suppress HMR and external service errors
    if (message.includes('Failed to fetch') &&
        (message.includes('ping') ||
         message.includes('waitForSuccessfulPing') ||
         message.includes('@vite/client') ||
         message.includes('fullstory') ||
         message.includes('analytics') ||
         message.includes('tracking'))) {
      // Silently ignore these development-only errors
      return;
    }

    originalConsoleError.apply(console, args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
