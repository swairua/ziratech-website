import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/fullstoryHandler' // Handle FullStory errors specifically

// Comprehensive passive error suppression for external services
window.addEventListener('error', (event) => {
  const error = event.error;
  const filename = event.filename || '';
  const message = error?.message || '';

  // Suppress FullStory errors
  if ((filename.includes('fullstory.com') || filename.includes('edge.fullstory.com')) ||
      (message.includes('fullstory') && message.includes('Failed to fetch'))) {
    console.warn('FullStory service error suppressed');
    event.preventDefault();
    return false;
  }

  // Suppress other external analytics errors
  if (filename.includes('google-analytics.com') ||
      filename.includes('googletagmanager.com') ||
      filename.includes('facebook.com') ||
      filename.includes('twitter.com')) {
    console.warn('External analytics service error suppressed');
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from external services
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.toString() || '';
  const stack = event.reason?.stack || '';

  // Suppress external service rejections
  if (reason.includes('fullstory.com') ||
      reason.includes('edge.fullstory.com') ||
      reason.includes('google-analytics.com') ||
      reason.includes('googletagmanager.com') ||
      stack.includes('fullstory') ||
      stack.includes('analytics')) {
    console.warn('External service promise rejection suppressed');
    event.preventDefault();
  }
});

// Suppress console errors from external services only
if (import.meta.env.DEV) {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args.join(' ');

    // Only suppress external service errors
    if (message.includes('fullstory') ||
        message.includes('Failed to fetch') &&
        (message.includes('analytics') || message.includes('tracking'))) {
      // Silently ignore external service errors
      return;
    }

    originalConsoleError.apply(console, args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
