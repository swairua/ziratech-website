import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global error handler for external service failures
window.addEventListener('error', (event) => {
  // Suppress FullStory, Vite HMR, and other external service errors in development
  if (event.error?.message?.includes('Failed to fetch') &&
      (event.filename?.includes('fullstory.com') ||
       event.filename?.includes('edge.fullstory.com') ||
       event.filename?.includes('@vite/client') ||
       event.error?.stack?.includes('ping') ||
       event.error?.stack?.includes('waitForSuccessfulPing'))) {
    console.warn('External service/HMR error suppressed:', event.error.message);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from external services
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('Failed to fetch') ||
      event.reason?.toString().includes('fullstory') ||
      event.reason?.toString().includes('ping') ||
      event.reason?.toString().includes('waitForSuccessfulPing')) {
    console.warn('External service/HMR promise rejection suppressed:', event.reason);
    event.preventDefault();
  }
});

// Override console.error to filter noise in development
const originalConsoleError = console.error;
console.error = (...args) => {
  const message = args.join(' ');
  if (message.includes('Failed to fetch') &&
      (message.includes('fullstory') || message.includes('ping'))) {
    // Suppress noisy external service errors
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
