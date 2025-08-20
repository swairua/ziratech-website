import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/passiveErrorHandler' // Only passive external service error handling

createRoot(document.getElementById("root")!).render(<App />);
