import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { EmailTemplates } from './EmailTemplates';
import { AutomationRules } from './AutomationRules';
import { EmailSettings } from './EmailSettings';
import { 
  Mail, 
  Send, 
  Clock, 
  Users, 
  Settings as SettingsIcon,
  Zap,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Plus,
  FileText,
  BarChart3
} from 'lucide-react';

const emailTemplates = [
  {
    id: 'form_confirmation',
    name: 'Form Confirmation',
    description: 'Automatic confirmation sent to users after form submission',
    trigger: 'Form Submission',
    status: 'active',
    lastSent: '2 hours ago',
    totalSent: 156
  },
  {
    id: 'admin_alert',
    name: 'Admin Alert',
    description: 'Notification to admin when new form is submitted',
    trigger: 'Form Submission',
    status: 'active',
    lastSent: '2 hours ago',
    totalSent: 156
  },
  {
    id: 'user_welcome',
    name: 'Welcome Email',
    description: 'Welcome email for new user registrations',
    trigger: 'User Registration',
    status: 'inactive',
    lastSent: 'Never',
    totalSent: 0
  }
];

const automationRules = [
  {
    id: 'contact_form',
    name: 'Contact Form Automation',
    description: 'Send confirmation to user and alert to admin on contact form submission',
    enabled: true,
    triggers: ['contact_form_submission'],
    actions: ['send_user_confirmation', 'send_admin_alert']
  },
  {
    id: 'career_application',
    name: 'Career Application Automation',
    description: 'Process career applications with HR notifications',
    enabled: true,
    triggers: ['career_form_submission'],
    actions: ['send_application_confirmation', 'notify_hr_team']
  }
];

export const EmailAutomation = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const { toast } = useToast();

  const handleToggleTemplate = (templateId: string, enabled: boolean) => {
    toast({
      title: "Template Updated",
      description: `Template ${enabled ? 'activated' : 'deactivated'} successfully`,
    });
  };

  const handleToggleAutomation = (ruleId: string, enabled: boolean) => {
    toast({
      title: "Automation Updated",
      description: `Automation rule ${enabled ? 'enabled' : 'disabled'} successfully`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Email Automation</h1>
        <p className="text-muted-foreground">Manage automated email campaigns and notifications</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-navy">312</p>
                <p className="text-sm text-muted-foreground">Emails Sent Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-navy">98.5%</p>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Zap className="h-5 w-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-navy">5</p>
                <p className="text-sm text-muted-foreground">Active Automations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-navy">2.4s</p>
                <p className="text-sm text-muted-foreground">Avg. Send Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="automations">Automation Rules</TabsTrigger>
          <TabsTrigger value="settings">Email Settings</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="automations" className="space-y-6">
          <AutomationRules />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <EmailSettings />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <h2 className="text-xl font-semibold text-brand-navy">Activity Logs</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { type: 'sent', email: 'john@example.com', template: 'Form Confirmation', time: '2 minutes ago', status: 'delivered' },
                  { type: 'sent', email: 'admin@ziratechnologies.com', template: 'New Form Alert', time: '5 minutes ago', status: 'delivered' },
                  { type: 'opened', email: 'jane@example.com', template: 'Welcome Email', time: '10 minutes ago', status: 'opened' },
                  { type: 'sent', email: 'contact@example.com', template: 'Form Confirmation', time: '15 minutes ago', status: 'delivered' },
                  { type: 'clicked', email: 'mike@example.com', template: 'Newsletter', time: '1 hour ago', status: 'clicked' },
                  { type: 'bounced', email: 'invalid@email.com', template: 'Form Confirmation', time: '2 hours ago', status: 'bounced' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'delivered' ? 'bg-green-500' : 
                        activity.status === 'opened' ? 'bg-blue-500' : 
                        activity.status === 'clicked' ? 'bg-purple-500' :
                        activity.status === 'bounced' ? 'bg-red-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-medium">{activity.email}</div>
                        <div className="text-sm text-muted-foreground">{activity.template}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{activity.time}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        activity.status === 'opened' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'clicked' ? 'bg-purple-100 text-purple-800' :
                        activity.status === 'bounced' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};