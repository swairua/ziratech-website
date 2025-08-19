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

// Note: Fetch patching has been moved to specific handlers (fullstoryHandler.ts)
// to avoid interfering with Vite HMR and other internal operations

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
