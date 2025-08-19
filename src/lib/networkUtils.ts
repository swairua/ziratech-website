/**
 * Network utilities for handling fetch errors and connectivity issues
 */

export const networkUtils = {
  /**
   * Enhanced fetch with retry logic and error handling
   */
  async fetchWithRetry(
    url: string, 
    options: RequestInit = {}, 
    maxRetries = 3,
    delay = 1000
  ): Promise<Response> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response;
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.warn(`Request timeout on attempt ${attempt + 1} for ${url}`);
          } else if (error.message.includes('NetworkError')) {
            console.warn(`Network error on attempt ${attempt + 1} for ${url}`);
          } else {
            console.warn(`Fetch error on attempt ${attempt + 1} for ${url}:`, error.message);
          }
        }
        
        // Wait before retrying (with exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
        }
      }
    }
    
    throw new Error(`Failed to fetch ${url} after ${maxRetries + 1} attempts. Last error: ${lastError.message}`);
  },

  /**
   * Check if the client is online
   */
  isOnline(): boolean {
    return navigator.onLine;
  },

  /**
   * Add online/offline event listeners
   */
  addConnectionListeners(
    onOnline?: () => void,
    onOffline?: () => void
  ): () => void {
    const handleOnline = () => {
      console.log('Network connection restored');
      onOnline?.();
    };
    
    const handleOffline = () => {
      console.warn('Network connection lost');
      onOffline?.();
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  },

  /**
   * Test connection to a service
   */
  async testConnection(url: string = '/favicon.ico'): Promise<boolean> {
    try {
      await this.fetchWithRetry(url, { method: 'HEAD' }, 1, 500);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Handle external service errors gracefully
   */
  handleExternalServiceError(error: Error, serviceName: string): void {
    if (error.message.includes('Failed to fetch') || 
        error.message.includes('NetworkError') ||
        error.name === 'TypeError') {
      console.warn(`${serviceName} service unavailable:`, error.message);
      // Don't throw - gracefully degrade
      return;
    }
    
    // For other errors, let them bubble up
    throw error;
  }
};

/**
 * Enhanced error boundary for network-related errors
 */
export class NetworkErrorBoundary {
  static handleError(error: Error, context: string): boolean {
    // Handle common network errors
    const networkErrors = [
      'Failed to fetch',
      'NetworkError',
      'ERR_NETWORK',
      'ERR_INTERNET_DISCONNECTED',
      'ERR_CONNECTION_REFUSED'
    ];
    
    const isNetworkError = networkErrors.some(networkError => 
      error.message.includes(networkError) || error.name.includes(networkError)
    );
    
    if (isNetworkError) {
      console.warn(`Network error in ${context}:`, error.message);
      return true; // Error handled
    }
    
    return false; // Let error bubble up
  }
}
