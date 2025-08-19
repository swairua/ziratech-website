/**
 * Robust HMR error handler for development environment
 * Handles Vite HMR connectivity issues gracefully
 */

if (import.meta.env.DEV) {
  // Track HMR connection state
  let hmrConnected = true;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;

  // Enhanced WebSocket error handling
  const originalWebSocket = window.WebSocket;
  
  class EnhancedWebSocket extends originalWebSocket {
    constructor(url: string | URL, protocols?: string | string[]) {
      super(url, protocols);
      
      const urlString = url.toString();
      
      // Only handle Vite HMR WebSockets
      if (urlString.includes('localhost') || urlString.includes('127.0.0.1')) {
        
        this.addEventListener('open', () => {
          hmrConnected = true;
          reconnectAttempts = 0;
          console.debug('HMR connection established');
        });
        
        this.addEventListener('close', (event) => {
          hmrConnected = false;
          console.debug('HMR connection closed');
          
          // Don't spam reconnection attempts
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.debug(`HMR will attempt to reconnect (${reconnectAttempts}/${maxReconnectAttempts})`);
          }
        });
        
        this.addEventListener('error', (event) => {
          hmrConnected = false;
          console.debug('HMR connection error (network issue, continuing development)');
          
          // Prevent error from bubbling up
          event.stopPropagation();
          event.preventDefault();
        });
      }
    }
  }
  
  // Replace WebSocket only in development
  window.WebSocket = EnhancedWebSocket;

  // Handle fetch errors specifically for Vite ping operations
  const originalFetch = window.fetch;
  
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : input.toString();
    
    try {
      return await originalFetch(input, init);
    } catch (error) {
      // Check if this is a Vite ping operation
      const stack = new Error().stack || '';
      const isVitePing = stack.includes('ping') || 
                        stack.includes('waitForSuccessfulPing') ||
                        stack.includes('@vite/client');
      
      if (isVitePing) {
        console.debug('Vite HMR ping failed (network connectivity issue)');
        
        // Return a fake response to prevent errors from propagating
        return new Response(JSON.stringify({ ok: false }), {
          status: 503,
          statusText: 'Service Temporarily Unavailable',
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Re-throw non-HMR errors
      throw error;
    }
  };

  // Provide status info for debugging
  (window as any).__HMR_DEBUG__ = {
    isConnected: () => hmrConnected,
    getReconnectAttempts: () => reconnectAttempts,
    getMaxAttempts: () => maxReconnectAttempts
  };
}

export {};
