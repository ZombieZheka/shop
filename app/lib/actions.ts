// lib/actions.ts

'use server';

import { sql } from '@vercel/postgres';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { User } from '@/app/lib/definitions';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { signUpSchema } from '@/app/lib/zod';
import bcrypt from 'bcryptjs';

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

export async function getUserFromDb(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    console.log(user.rows[0]);
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    phone_number: formData.get('phone_number'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    // handle error then return
    return validatedFields.error.issues[0].message;
  }
  const { name, email, phone_number, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password, phone_number)
      VALUES (${name}, ${email}, ${hashedPassword}, ${phone_number})
    `
  } catch (error) {
    return "Database Error: Failed to Create Account.";
  }

  redirect('/auth/signin');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
