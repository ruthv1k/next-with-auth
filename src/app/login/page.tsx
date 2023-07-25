'use client';

import InputField from '@/components/input-field';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const user = await signIn('credentials', {
        ...form,
        redirect: false,
      });

      if (user?.error) {
        throw new Error(user?.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-sm px-6 mx-auto md:px-4 md:my-16'>
      <div className='mb-14'>
        <h2 className='mb-2 text-3xl font-extrabold text-center text-neutral-900'>
          Login
        </h2>
      </div>

      <form className='w-full '>
        <div className='mb-6'>
          <InputField
            label='Email Id'
            type='email'
            placeholder='sam@example.com'
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className='mb-6'>
          <InputField
            label='Password'
            type='password'
            placeholder='Your password'
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <button
            onClick={onLogin}
            className='inline-block w-full px-8 py-2 font-medium text-white transition-all duration-200 transform bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95'
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      <span className='block mt-8 text-center'>
        Need an account?
        <Link
          href='/register'
          className='ml-2 text-blue-600 border-b border-blue-600 hover:border-0'
        >
          Create your account
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
