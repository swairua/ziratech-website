/**
 * Development-only connectivity status indicator
 * Shows subtle notifications about network issues without disrupting development
 */

if (import.meta.env.DEV) {
  let connectivityStatusElement: HTMLElement | null = null;
  let statusTimeout: NodeJS.Timeout | null = null;

  function createStatusElement() {
    if (connectivityStatusElement) return connectivityStatusElement;

    const element = document.createElement('div');
    element.id = 'dev-connectivity-status';
    element.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `;
    document.body.appendChild(element);
    connectivityStatusElement = element;
    return element;
  }

  function showStatus(message: string, type: 'info' | 'warning' | 'error' = 'info') {
    const element = createStatusElement();
    
    const colors = {
      info: 'rgba(59, 130, 246, 0.9)',
      warning: 'rgba(245, 158, 11, 0.9)',
      error: 'rgba(239, 68, 68, 0.9)'
    };

    element.style.background = colors[type];
    element.textContent = message;
    element.style.opacity = '1';

    // Clear existing timeout
    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }

    // Auto-hide after 3 seconds
    statusTimeout = setTimeout(() => {
      if (element) {
        element.style.opacity = '0';
      }
    }, 3000);
  }

  // Monitor network status
  let isOffline = false;
  let hmrIssueCount = 0;

  window.addEventListener('online', () => {
    if (isOffline) {
      showStatus('🌐 Network connectivity restored', 'info');
      isOffline = false;
      hmrIssueCount = 0;
    }
  });

  window.addEventListener('offline', () => {
    showStatus('⚠️ Network connectivity lost', 'warning');
    isOffline = true;
  });

  // Monitor HMR connectivity issues
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    const stack = event.reason?.stack || '';

    if (reason.includes('Failed to fetch') && 
        (stack.includes('ping') || stack.includes('@vite/client'))) {
      
      hmrIssueCount++;
      
      if (hmrIssueCount === 1) {
        showStatus('🔄 HMR connectivity issue (development continues)', 'warning');
      } else if (hmrIssueCount >= 5) {
        showStatus('🚨 Persistent HMR issues (check network)', 'error');
        hmrIssueCount = 0; // Reset to avoid spam
      }
    }
  });

  // Reset HMR issue count periodically
  setInterval(() => {
    if (hmrIssueCount > 0) {
      hmrIssueCount = Math.max(0, hmrIssueCount - 1);
    }
  }, 30000); // Decay count every 30 seconds

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (connectivityStatusElement) {
      document.body.removeChild(connectivityStatusElement);
    }
    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }
  });

  // Expose debug info
  (window as any).__DEV_CONNECTIVITY__ = {
    showStatus,
    getHmrIssueCount: () => hmrIssueCount,
    isOffline: () => isOffline
  };
}

export {};
