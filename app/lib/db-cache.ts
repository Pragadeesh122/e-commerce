import { unstable_cache } from 'next/cache';
import { getUserByEmail } from './supabase/helpers';


export const getCachedUserByEmail = unstable_cache(
  async (email: string): Promise<any> => {
    return await getUserByEmail(email);
  },
  ['user-by-email'],
  { tags: ['user', 'cart'], revalidate: 0.1 }
);
