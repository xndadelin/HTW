import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import type { Profile } from '@/types/database';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error };
}

export function useUpdateProfile() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function updateProfile(updates: Partial<Profile>) {
    try {
      setUpdating(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      setError(error as Error);
      return { success: false, error };
    } finally {
      setUpdating(false);
    }
  }

  return { updateProfile, updating, error };
}
