import supabase from '@/utils/supabase/client'

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

