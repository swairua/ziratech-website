import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SettingsManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Settings Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input id="site-name" placeholder="Enter site name" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input id="admin-email" type="email" placeholder="admin@example.com" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" placeholder="support@example.com" />
          </div>
          
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input id="session-timeout" type="number" placeholder="30" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="max-attempts">Max Login Attempts</Label>
            <Input id="max-attempts" type="number" placeholder="5" />
          </div>
          
          <Button>Update Security Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};
