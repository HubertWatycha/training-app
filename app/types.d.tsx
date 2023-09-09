

import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session extends Session {
    user: {
      id: number; 
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }
}