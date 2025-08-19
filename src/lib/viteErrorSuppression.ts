/**
 * Vite client error suppression for development environment
 * This handles HMR WebSocket connection issues and ping failures
 */

if (import.meta.env.DEV) {
  // Suppress Vite HMR WebSocket errors
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    
    // Filter out Vite HMR and external service errors
    if (
      message.includes('WebSocket connection to') ||
      message.includes('Failed to fetch') ||
      message.includes('ping') ||
      message.includes('waitForSuccessfulPing') ||
      message.includes('fullstory.com') ||
      message.includes('edge.fullstory.com') ||
      message.includes('@vite/client')
    ) {
      // Silently ignore these errors in development
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    
    // Filter out Vite HMR warnings
    if (
      message.includes('WebSocket connection') ||
      message.includes('HMR connection') ||
      message.includes('ping failed') ||
      message.includes('fullstory')
    ) {
      // Silently ignore these warnings in development
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Override WebSocket to handle connection errors gracefully
  const OriginalWebSocket = window.WebSocket;
  
  window.WebSocket = class extends OriginalWebSocket {
    constructor(url: string | URL, protocols?: string | string[]) {
      super(url, protocols);
      
      // Handle WebSocket errors for Vite HMR
      this.addEventListener('error', (event) => {
        const urlStr = url.toString();
        if (urlStr.includes('localhost') || urlStr.includes('127.0.0.1')) {
          // Suppress HMR WebSocket errors
          event.stopPropagation();
          event.preventDefault();
        }
      });
      
      this.addEventListener('close', (event) => {
        const urlStr = url.toString();
        if (urlStr.includes('localhost') || urlStr.includes('127.0.0.1')) {
          // Suppress HMR WebSocket close events
          event.stopPropagation();
        }
      });
    }
  };

  // Patch XMLHttpRequest for additional error handling
  const OriginalXMLHttpRequest = window.XMLHttpRequest;
  
  window.XMLHttpRequest = class extends OriginalXMLHttpRequest {
    constructor() {
      super();
      
      this.addEventListener('error', (event) => {
        // Suppress external service XHR errors
        if (this.responseURL?.includes('fullstory.com') || 
            this.responseURL?.includes('edge.fullstory.com')) {
          event.stopPropagation();
          event.preventDefault();
        }
      });
    }
  };

  // Handle global unhandled rejections specifically for Vite
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason?.message || reason?.toString() || '';
    
    if (
      message.includes('Failed to fetch') ||
      message.includes('ping') ||
      message.includes('waitForSuccessfulPing') ||
      message.includes('WebSocket') ||
      message.includes('fullstory') ||
      reason?.stack?.includes('@vite/client') ||
      reason?.stack?.includes('ping')
    ) {
      // Prevent these errors from appearing in console
      event.preventDefault();
    }
  });
}
