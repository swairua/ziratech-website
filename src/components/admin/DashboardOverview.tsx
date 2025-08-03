import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  ShoppingBag,
  BarChart3,
  TrendingUp,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Form Submissions',
    value: '156',
    change: '+23%',
    changeType: 'positive' as const,
    icon: FileText,
  },
  {
    title: 'Products',
    value: '89',
    change: '+5%',
    changeType: 'positive' as const,
    icon: ShoppingBag,
  },
  {
    title: 'Revenue',
    value: '$54,239',
    change: '+18%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'form_submission',
    message: 'New contact form submission from John Doe',
    time: '2 minutes ago',
    icon: Mail,
  },
  {
    id: 2,
    type: 'user_registration',
    message: 'New user registered: jane@example.com',
    time: '15 minutes ago',
    icon: Users,
  },
  {
    id: 3,
    type: 'order',
    message: 'New order placed - Order #12345',
    time: '1 hour ago',
    icon: ShoppingBag,
  },
  {
    id: 4,
    type: 'blog_post',
    message: 'Blog post "Tech Innovations 2024" published',
    time: '3 hours ago',
    icon: FileText,
  },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-6 w-6 text-brand-orange mb-2" />
                <div className="font-medium text-sm">Add User</div>
                <div className="text-xs text-gray-500">Create new user account</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-6 w-6 text-brand-orange mb-2" />
                <div className="font-medium text-sm">New Blog Post</div>
                <div className="text-xs text-gray-500">Create content</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingBag className="h-6 w-6 text-brand-orange mb-2" />
                <div className="font-medium text-sm">Add Product</div>
                <div className="text-xs text-gray-500">Manage inventory</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="h-6 w-6 text-brand-orange mb-2" />
                <div className="font-medium text-sm">View Reports</div>
                <div className="text-xs text-gray-500">Analytics & insights</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">API Status</div>
                <div className="text-xs text-gray-600">All systems operational</div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Database</div>
                <div className="text-xs text-gray-600">Response time: 45ms</div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Optimal
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Storage</div>
                <div className="text-xs text-gray-600">78% capacity used</div>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Warning
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};