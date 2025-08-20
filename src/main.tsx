import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Temporarily commenting out all error handlers to debug fetch issues
// import './lib/passiveErrorHandler' // Passive external service error handling
// import './lib/hmrErrorHandler' // Handle HMR connectivity issues
// import './lib/devConnectivityStatus' // Development connectivity status

createRoot(document.getElementById("root")!).render(<App />);
