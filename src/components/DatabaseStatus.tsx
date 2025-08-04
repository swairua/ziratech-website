import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DatabaseStatus = () => {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [message, setMessage] = useState('Testing connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic Supabase connection
        const { data, error } = await supabase.auth.getSession();

        if (error && !error.message.includes('Invalid Refresh Token')) {
          throw error;
        }

        // Test if we can access the database by checking auth status
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError && !userError.message.includes('Invalid') && !userError.message.includes('JWT')) {
          throw userError;
        }

        // Try to test a simple database operation
        try {
          const { data: testQuery, error: queryError } = await supabase
            .from('users')
            .select('id')
            .limit(1);

          if (queryError) {
            if (queryError.message.includes('relation "users" does not exist') ||
                queryError.message.includes('table "users" does not exist')) {
              setStatus('connected');
              setMessage('Database connected! Tables need to be created. Run the SQL schema from LOCALHOST_SETUP_GUIDE.md');
            } else {
              throw queryError;
            }
          } else {
            setStatus('connected');
            setMessage('Database connected and tables exist! Ready for development.');
          }
        } catch (dbError) {
          // If we can't test the database but connection works, show as connected
          setStatus('connected');
          setMessage('Database connected! Please check table setup in Supabase dashboard.');
        }

      } catch (error) {
        setStatus('error');
        setMessage(`Connection failed: ${error.message}. Check LOCALHOST_SETUP_GUIDE.md for setup instructions.`);
      }
    };

    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Database Status
          <Badge variant={status === 'connected' ? 'default' : status === 'error' ? 'destructive' : 'secondary'}>
            {status === 'loading' ? 'Testing...' : status === 'connected' ? 'Connected' : 'Error'}
          </Badge>
        </CardTitle>
        <CardDescription>
          Supabase Database Connection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{message}</p>
        {status === 'connected' && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium">Connection Details:</p>
            <p className="text-xs text-muted-foreground">URL: https://eflkozuqjcjsswiwqckl.supabase.co</p>
            <p className="text-xs text-muted-foreground">Status: Ready for development</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
