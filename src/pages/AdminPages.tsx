import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ComingSoon } from '@/components/admin/ComingSoon';
import { Globe } from 'lucide-react';

const AdminPages = () => {
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
        title="Web Pages Management"
        description="Manage your website pages, content, and SEO settings with our powerful content management system."
        icon={Globe}
        features={[
          "Dynamic page creation and editing",
          "SEO optimization tools",
          "Content versioning and history",
          "Media library integration",
          "Template management system",
          "Multi-language support"
        ]}
        estimatedDate="Q3 2025"
      />
    </AdminLayout>
  );
};

export default AdminPages;