'use client';

import InputField from '@/components/input-field';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (response.status === 201) {
        toast.success('Registered');
        router.push('/login');
      }

      const { message } = await response.json();
      toast.error(message);
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
          Hi there!
        </h2>

        <p className='leading-6 text-center text-neutral-500 '>
          Happy to see you here, use your email to sign up and start your
          journey with us
        </p>
      </div>

      <form className='w-full '>
        <div className='mb-6'>
          <InputField
            label='Your name'
            type='text'
            placeholder='Sam Phillipe'
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

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
            onClick={onRegister}
            className='inline-block w-full px-8 py-2 font-medium text-white transition-all duration-200 transform bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95'
          >
            {isLoading ? 'Processing...' : 'Create Account'}
          </button>
        </div>
      </form>

      <span className='block mt-8 text-center'>
        Already have an account ?
        <Link
          href='/login'
          className='ml-2 text-blue-600 border-b border-blue-600 hover:border-0'
        >
          Login.
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
