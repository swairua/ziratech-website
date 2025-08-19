import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/fetchWrapper' // Initialize enhanced fetch handling
// import './lib/viteErrorSuppression' // Disabled - was too aggressive

// Global error handler for external service failures only
window.addEventListener('error', (event) => {
  // Only suppress errors from known external services
  if (event.error?.message?.includes('Failed to fetch') &&
      (event.filename?.includes('fullstory.com') ||
       event.filename?.includes('edge.fullstory.com'))) {
    console.warn('External service error suppressed:', event.error.message);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from external services only
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.toString() || '';
  if (reason.includes('fullstory.com') || reason.includes('edge.fullstory.com')) {
    console.warn('External service promise rejection suppressed:', event.reason);
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
