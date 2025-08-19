import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global error handler for external service failures
window.addEventListener('error', (event) => {
  // Suppress FullStory and other external service errors in development
  if (event.error?.message?.includes('Failed to fetch') &&
      (event.filename?.includes('fullstory.com') ||
       event.filename?.includes('edge.fullstory.com'))) {
    console.warn('External service error suppressed:', event.error);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from external services
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('Failed to fetch') ||
      event.reason?.toString().includes('fullstory')) {
    console.warn('External service promise rejection suppressed:', event.reason);
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
