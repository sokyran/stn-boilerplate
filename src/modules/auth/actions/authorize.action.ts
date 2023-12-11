'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../client';
import { AuthorizeData } from '../types';

export const authorizeAction = async ({ data, type }: AuthorizeData): Promise<string | null> => {
  try {
    await signIn('credentials', {
      type,
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return null;
  } catch (error) {
    const err = error as AuthError;

    if (err.type && err.type.includes('CredentialsSignin')) {
      throw new Error('Invalid credentials');
    }

    throw err.cause?.err;
  }
};
