import supabase from '@/utils/supabase/client'


export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  window.location.reload()

  if (error) throw error
}