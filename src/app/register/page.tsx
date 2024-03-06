'use client';

import Image from 'next/image';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';

import Input from '@/components/Input';
import { useRegister } from '@/hooks/auth';
import clsxm from '@/lib/clsxm';
import { RegisterProps } from '@/types/form';

export default function Register() {
  const methods = useForm<RegisterProps>();
  const { mutateAsync, isPending } = useRegister();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterProps> = (data) => {
    mutateAsync(data);
  };

  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-[#F6F6F6]'>
      <Image
        src='/logo.jpg'
        alt='logo'
        width={60}
        height={60}
        className='absolute left-5 top-5 hover:cursor-pointer md:left-10 md:top-10'
      />
      <FormProvider {...methods}>
        <form
          className='flex w-[300px] flex-col gap-5 md:w-[500px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-6xl font-bold text-gray-900'>Register</h1>
          <div className='flex flex-col gap-3 text-gray-900'>
            <Input
              id='username'
              label='Username'
              placeholder='Enter your username'
              validation={{ required: 'Username cannot be empty' }}
            />
            <Input
              id='name'
              label='Name'
              placeholder='Enter your name'
              validation={{ required: 'Name cannot be empty' }}
            />
            <Input
              id='email'
              label='Email'
              placeholder='example@example.com'
              validation={{
                required: 'Email cannot be empty',
                pattern: { value: /^\S+@\S+$/i, message: 'Email not valid' },
              }}
            />
            <Input
              id='password'
              label='Password'
              placeholder='Enter your password'
              validation={{
                required: 'Password cannot be empty',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
            />
            <button
              type='submit'
              className='relative mt-3 flex w-full items-center justify-center rounded-md bg-gray-900 p-2 text-slate-50'
            >
              {!isPending && 'Register'}
              {isPending && (
                <div className={clsxm('size-6 text-slate-50')}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              )}
            </button>
            <div>
              Already have an account?{' '}
              <span className='transition-all duration-200 hover:underline'>
                <a href='/login'>Login</a>
              </span>
            </div>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
