/**
 * Targeted FullStory error handling
 * This specifically handles FullStory service errors without interfering with other operations
 */

if (import.meta.env.DEV) {
  // Monitor for FullStory script loading and patch it if needed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLScriptElement && 
            (node.src?.includes('fullstory.com') || 
             node.src?.includes('edge.fullstory.com'))) {
          
          // Add error handling to FullStory script
          node.onerror = (event) => {
            console.warn('FullStory script failed to load, continuing without analytics');
            event.preventDefault();
            return true;
          };
          
          // Set a reasonable timeout for FullStory loading
          node.async = true;
          node.defer = true;
        }
      });
    });
  });

  // Start observing the document for script additions
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Clean up observer when page unloads
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });

  // Create a safe FullStory mock if the real service fails
  if (!window.FS && typeof window !== 'undefined') {
    (window as any).FS = {
      // Mock FullStory API to prevent errors
      identify: () => {},
      setUserVars: () => {},
      event: () => {},
      log: () => {},
      getCurrentSessionURL: () => '',
      restart: () => {},
      shutdown: () => {},
    };
  }
}

/**
 * Handle FullStory-specific fetch errors
 */
export function handleFullStoryError(error: Error, url?: string): boolean {
  const isFullStoryError = 
    url?.includes('fullstory.com') ||
    url?.includes('edge.fullstory.com') ||
    error.message.includes('fullstory') ||
    error.stack?.includes('fullstory');

  if (isFullStoryError) {
    console.warn('FullStory service error handled gracefully:', error.message);
    return true; // Error handled
  }

  return false; // Not a FullStory error
}

// Note: Removed fetch patching completely to avoid interfering with Vite HMR
// FullStory errors are now handled purely through passive error suppression
