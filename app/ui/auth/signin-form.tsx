// ui/auth/signin-form.tsx

'use client';

import { Button } from "@/app/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import {
  ArrowRightIcon,
  ExclamationCircleIcon
} from '@heroicons/react/20/solid';
import { authenticate } from "@/app/lib/actions";

// async function validateForm(prevState: string | undefined, formData: FormData) {
//   try {
//     console.log('Sign In try');
//     await authenticate(undefined, formData);
//   } catch (error) {
//     if (error instanceof ErrorEvent) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid Credentials';
//         default:
//           return 'Something went wrong';
//       }
//     }
//     throw error;
//   }
// }

export default function SignInForm() {
  const [errorMessage, formAction] = useFormState(
    authenticate,
    undefined,
  );

  return (
    // <form className="space-y-3">
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 text-gray-700">
        <h1 className="md-3 text-2xl text-gray-500">
          SignIn Form
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                // required
              />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                // required
              />
            </div>
          </div>
        </div>
        <SignInButton/>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Sign In <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
