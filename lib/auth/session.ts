import type { User } from '@/lib/auth/types'

// Single source of truth for "who is logged in". The header switches between the
// guest buttons and the avatar menu based on this value.
export async function getCurrentUser(): Promise<User | null> {
  // TODO: Supabase — read the session, e.g. `const { data } = await supabase.auth.getUser()`
  // and map `data.user` to `User` (name from user_metadata.display_name).
  return null
}
