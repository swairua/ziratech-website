import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null;
}

interface UserFormData {
  email: string;
  fullName: string;
  password: string;
  role: 'admin' | 'hr' | 'editor' | 'support_agent' | 'user';
  status: string;
}

export const UserModal = ({ isOpen, onClose, userId }: UserModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    fullName: '',
    password: '',
    role: 'user',
    status: 'active'
  });
  const { toast } = useToast();

  const isEditing = Boolean(userId);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserData();
    } else if (isOpen) {
      // Reset form for new user
      setFormData({
        email: '',
        fullName: '',
        password: '',
        role: 'user',
        status: 'active'
      });
    }
  }, [isOpen, userId]);

  const fetchUserData = async () => {
    if (!userId) return;

    try {
      // Fetch user profile and role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) throw profileError;

      // Fetch user role separately
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      setFormData({
        email: profile.company_email || '',
        fullName: profile.full_name || '',
        password: '', // Don't show existing password
        role: (roleData?.role as 'admin' | 'hr' | 'editor' | 'support_agent' | 'user') || 'user',
        status: profile.status || 'active'
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch user data: " + error.message,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await updateUser();
      } else {
        await createUser();
      }
      
      onClose();
      toast({
        title: "Success",
        description: `User ${isEditing ? 'updated' : 'created'} successfully`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    // Call the edge function to create user with admin privileges
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }

    const response = await fetch('https://vzznvztokpdtlzcvojar.supabase.co/functions/v1/admin-create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        status: formData.status
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to create user');
    }

    return result;
  };

  const updateUser = async () => {
    if (!userId) return;

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: formData.fullName,
        company_email: formData.email,
        status: formData.status
      })
      .eq('user_id', userId);

    if (profileError) throw profileError;

    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: formData.role as any
      });

    if (roleError) throw roleError;

    // For password updates, we'll need another edge function or handle differently
    // For now, skip password updates in edit mode to avoid admin API issues
    if (formData.password) {
      toast({
        title: "Note",
        description: "Password updates require direct database access. Please use the auth dashboard for password resets.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl mx-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update user information and permissions' 
              : 'Create a new user account with role assignment'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password {isEditing && "(leave blank to keep current)"}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder={isEditing ? "New password (optional)" : "Password"}
              required={!isEditing}
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as 'admin' | 'hr' | 'editor' | 'support_agent' | 'user' }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="support_agent">Support Agent</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-brand-orange hover:bg-brand-orange-dark"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Update User' : 'Create User'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
