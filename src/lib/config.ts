// Environment configuration utility for Zira Technologies

interface AppConfig {
  // Supabase
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
  };
  
  // Application
  app: {
    name: string;
    description: string;
    url: string;
    environment: 'development' | 'production' | 'staging';
    debug: boolean;
  };
  
  // Company Information
  company: {
    email: string;
    phone: string;
    address: string;
  };
  
  // Social Media
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
  };
  
  // Features
  features: {
    analytics: boolean;
    blog: boolean;
    auth: boolean;
  };
}

const config: AppConfig = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://eflkozuqjcjsswiwqckl.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8',
    serviceRoleKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Zira Technologies',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Smart Digital Platforms for Africa',
    url: import.meta.env.VITE_APP_URL || 'https://ziratech.com',
    environment: (import.meta.env.VITE_ENVIRONMENT as 'development' | 'production' | 'staging') || 'development',
    debug: import.meta.env.VITE_DEBUG === 'true' || import.meta.env.MODE === 'development',
  },
  
  company: {
    email: import.meta.env.VITE_COMPANY_EMAIL || 'info@ziratech.com',
    phone: import.meta.env.VITE_COMPANY_PHONE || '+254 700 000 000',
    address: import.meta.env.VITE_COMPANY_ADDRESS || 'Nairobi, Kenya',
  },
  
  social: {
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || '@zira_tech',
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || 'zira-technologies',
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || 'ziratechnologies',
  },
  
  features: {
    analytics: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
    blog: true,
    auth: true,
  },
};

// Validation
const validateConfig = (): boolean => {
  const required = [
    config.supabase.url,
    config.supabase.anonKey,
    config.app.name,
    config.company.email,
  ];
  
  const missing = required.filter(value => !value || value === 'undefined');
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', {
      supabaseUrl: !config.supabase.url,
      supabaseKey: !config.supabase.anonKey,
      appName: !config.app.name,
      companyEmail: !config.company.email,
    });
    return false;
  }
  
  return true;
};

// Initialize and validate
if (config.app.debug) {
  console.log('🔧 Configuration loaded:', {
    environment: config.app.environment,
    appName: config.app.name,
    supabaseUrl: config.supabase.url,
    hasSupabaseKey: !!config.supabase.anonKey,
    features: config.features,
  });
}

const isValid = validateConfig();

if (!isValid && config.app.environment === 'production') {
  throw new Error('Invalid configuration for production environment');
}

export default config;

// Helper functions
export const isDevelopment = config.app.environment === 'development';
export const isProduction = config.app.environment === 'production';
export const isDebug = config.app.debug;

// Specific configs
export const supabaseConfig = config.supabase;
export const appConfig = config.app;
export const companyConfig = config.company;
export const socialConfig = config.social;
export const featuresConfig = config.features;
