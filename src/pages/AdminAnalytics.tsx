import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ComingSoon } from '@/components/admin/ComingSoon';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      <ComingSoon
        title="Advanced Analytics"
        description="Comprehensive business intelligence dashboard with real-time insights and custom reporting."
        icon={BarChart3}
        features={[
          "Real-time business metrics",
          "Custom dashboard creation",
          "Advanced data visualization",
          "Conversion funnel analysis",
          "User behavior tracking",
          "Performance benchmarking"
        ]}
        estimatedDate="Q2 2026"
      />
    </AdminLayout>
  );
};

export default AdminAnalytics;