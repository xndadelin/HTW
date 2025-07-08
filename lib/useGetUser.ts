import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/client';
import { type Profile } from '@/types/database';
import type { User as SupabaseUser } from '@supabase/auth-js';

type UseGetUserResult = {
  user: (SupabaseUser & { profile?: Profile }) | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
};

export default function useGetUser(): UseGetUserResult {
  const [user, setUser] = useState<(SupabaseUser & { profile?: Profile }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!authUser) {
        setUser(null);
        return;
      }
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      setUser({ ...authUser, profile: profile || undefined });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refresh = async () => {
    await fetchUser();
  };

  return { user, loading, error, refresh };
}