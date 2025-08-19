/**
 * Enhanced fetch wrapper that handles common network errors gracefully
 */

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

/**
 * Enhanced fetch with retry logic, timeout, and error handling
 */
export async function fetchWrapper(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const {
    timeout = 30000,
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      lastError = error as Error;

      // Don't retry certain errors
      if (error instanceof Error) {
        // Network errors, timeouts, or external service failures
        if (
          error.name === 'AbortError' ||
          error.message.includes('Failed to fetch') ||
          error.message.includes('NetworkError') ||
          url.includes('fullstory.com') ||
          url.includes('edge.fullstory.com')
        ) {
          // For external services, fail silently after first attempt
          if (url.includes('fullstory.com') || url.includes('edge.fullstory.com')) {
            console.warn(`External service unavailable: ${url}`);
            throw new FetchError(`External service unavailable: ${url}`, 0);
          }
        }
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries) {
        const delay = retryDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new FetchError(
    `Failed to fetch ${url} after ${retries + 1} attempts. Last error: ${lastError.message}`,
    0
  );
}

/**
 * Selective fetch patching for external services only
 */
if (import.meta.env.DEV) {
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();

    // Only intercept external service URLs that are known to cause issues
    const isExternalService =
      url.includes('fullstory.com') ||
      url.includes('edge.fullstory.com') ||
      url.includes('google-analytics.com') ||
      url.includes('googletagmanager.com') ||
      url.includes('facebook.com') ||
      url.includes('twitter.com');

    // Don't intercept localhost, Vite HMR, or internal API calls
    const isInternalRequest =
      url.includes('localhost') ||
      url.includes('127.0.0.1') ||
      url.includes(window.location.host) ||
      url.startsWith('/') ||
      url.includes('__vite') ||
      url.includes('supabase.co');

    if (isExternalService && !isInternalRequest) {
      try {
        // Quick timeout for external services
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await originalFetch(input, {
          ...init,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        // Silently return a mock response for failed external services
        console.warn(`External service unavailable: ${url}`);
        return new Response(JSON.stringify({ error: 'Service unavailable' }), {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Use original fetch for all other requests (including Vite HMR)
    return originalFetch(input, init);
  };
}

/**
 * Utility to check if an error is a network error that should be suppressed
 */
export function isNetworkError(error: Error): boolean {
  const networkErrorPatterns = [
    'Failed to fetch',
    'NetworkError',
    'ERR_NETWORK',
    'ERR_INTERNET_DISCONNECTED',
    'ERR_CONNECTION_REFUSED',
    'AbortError',
    'TimeoutError'
  ];

  return networkErrorPatterns.some(pattern => 
    error.message.includes(pattern) || error.name.includes(pattern)
  );
}

/**
 * Utility to check if an error is from an external service
 */
export function isExternalServiceError(error: Error, url?: string): boolean {
  const externalServices = [
    'fullstory.com',
    'edge.fullstory.com',
    'google-analytics.com',
    'googletagmanager.com',
    'facebook.com',
    'twitter.com'
  ];

  if (url) {
    return externalServices.some(service => url.includes(service));
  }

  return externalServices.some(service => 
    error.message.includes(service) || error.stack?.includes(service)
  );
}
