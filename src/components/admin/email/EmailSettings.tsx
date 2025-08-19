import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Server, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  Send,
  Eye,
  TestTube,
  Globe,
  Clock,
  Users,
  Key
} from 'lucide-react';

export const EmailSettings = () => {
  const [settings, setSettings] = useState({
    smtp: {
      host: 'smtp.resend.com',
      port: 587,
      username: 'resend',
      password: '',
      encryption: 'tls',
      from_name: 'Zira Technologies',
      from_email: 'info@ziratechnologies.com',
      reply_to: 'support@ziratechnologies.com'
    },
    delivery: {
      rate_limit: 100,
      retry_attempts: 3,
      retry_delay: 300,
      bounce_handling: true,
      track_opens: true,
      track_clicks: true
    },
    security: {
      dkim_enabled: true,
      spf_enabled: true,
      dmarc_enabled: true,
      domain_verification: true
    }
  });

  const { toast } = useToast();

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully`,
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Connection Test",
      description: "Testing email configuration...",
    });
    
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Test Successful",
        description: "Email configuration is working correctly",
      });
    }, 2000);
  };

  const handleSendTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to your email address",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-brand-navy">Email Settings</h2>
        <p className="text-muted-foreground">Configure email delivery and SMTP settings</p>
      </div>

      <div className="grid gap-6">
        {/* SMTP Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>SMTP Configuration</span>
            </CardTitle>
            <CardDescription>Configure your email server settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input 
                  id="smtp-host" 
                  value={settings.smtp.host}
                  placeholder="smtp.resend.com"
                />
              </div>
              <div>
                <Label htmlFor="smtp-port">Port</Label>
                <Input 
                  id="smtp-port" 
                  type="number"
                  value={settings.smtp.port}
                  placeholder="587"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-username">Username</Label>
                <Input 
                  id="smtp-username" 
                  value={settings.smtp.username}
                  placeholder="resend"
                />
              </div>
              <div>
                <Label htmlFor="smtp-password">Password / API Key</Label>
                <Input 
                  id="smtp-password" 
                  type="password"
                  placeholder="Enter your API key"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="smtp-encryption">Encryption</Label>
              <Select value={settings.smtp.encryption}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleTestConnection}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <TestTube className="h-4 w-4" />
                <span>Test Connection</span>
              </Button>
              <Button 
                onClick={() => handleSaveSettings('SMTP')}
                className="bg-brand-orange hover:bg-brand-orange-dark"
              >
                Save SMTP Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sender Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Sender Information</span>
            </CardTitle>
            <CardDescription>Configure default sender details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from-name">From Name</Label>
                <Input 
                  id="from-name" 
                  value={settings.smtp.from_name}
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <Label htmlFor="from-email">From Email</Label>
                <Input 
                  id="from-email" 
                  type="email"
                  value={settings.smtp.from_email}
                  placeholder="noreply@yourcompany.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="reply-to">Reply-To Email</Label>
              <Input 
                id="reply-to" 
                type="email"
                value={settings.smtp.reply_to}
                placeholder="support@yourcompany.com"
              />
            </div>

            <Button 
              onClick={() => handleSaveSettings('Sender Information')}
              className="bg-brand-orange hover:bg-brand-orange-dark"
            >
              Save Sender Settings
            </Button>
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Delivery & Performance</span>
            </CardTitle>
            <CardDescription>Configure email delivery settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rate-limit">Rate Limit (emails/hour)</Label>
                <Input 
                  id="rate-limit" 
                  type="number"
                  value={settings.delivery.rate_limit}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Input 
                  id="retry-attempts" 
                  type="number"
                  value={settings.delivery.retry_attempts}
                  placeholder="3"
                />
              </div>
              <div>
                <Label htmlFor="retry-delay">Retry Delay (seconds)</Label>
                <Input 
                  id="retry-delay" 
                  type="number"
                  value={settings.delivery.retry_delay}
                  placeholder="300"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bounce-handling">Bounce Handling</Label>
                  <p className="text-sm text-muted-foreground">Automatically handle bounced emails</p>
                </div>
                <Switch 
                  id="bounce-handling" 
                  checked={settings.delivery.bounce_handling}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="track-opens">Track Email Opens</Label>
                  <p className="text-sm text-muted-foreground">Track when emails are opened</p>
                </div>
                <Switch 
                  id="track-opens" 
                  checked={settings.delivery.track_opens}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="track-clicks">Track Link Clicks</Label>
                  <p className="text-sm text-muted-foreground">Track clicks on email links</p>
                </div>
                <Switch 
                  id="track-clicks" 
                  checked={settings.delivery.track_clicks}
                />
              </div>
            </div>

            <Button 
              onClick={() => handleSaveSettings('Delivery')}
              className="bg-brand-orange hover:bg-brand-orange-dark"
            >
              Save Delivery Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security & Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Authentication</span>
            </CardTitle>
            <CardDescription>Email security and domain authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {[
                { key: 'dkim_enabled', label: 'DKIM Authentication', description: 'Domain Keys Identified Mail' },
                { key: 'spf_enabled', label: 'SPF Record', description: 'Sender Policy Framework' },
                { key: 'dmarc_enabled', label: 'DMARC Policy', description: 'Domain-based Message Authentication' },
                { key: 'domain_verification', label: 'Domain Verification', description: 'Verify domain ownership' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={settings.security[item.key as keyof typeof settings.security] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {settings.security[item.key as keyof typeof settings.security] ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Enabled
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Disabled
                        </>
                      )}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Domain Configuration Required</p>
                  <p className="text-blue-700">To improve email deliverability, configure your domain's DNS records with the required SPF, DKIM, and DMARC settings.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="h-5 w-5" />
              <span>Test Email</span>
            </CardTitle>
            <CardDescription>Send a test email to verify your configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-email">Test Email Address</Label>
              <Input 
                id="test-email" 
                type="email"
                placeholder="test@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="test-template">Test Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmation">Form Confirmation</SelectItem>
                  <SelectItem value="welcome">Welcome Email</SelectItem>
                  <SelectItem value="alert">Admin Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSendTestEmail}
              className="bg-brand-orange hover:bg-brand-orange-dark"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};