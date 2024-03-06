import { useState } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';
import { InputProps } from '@/types/form';

export default function Input({
  id,
  label,
  placeholder,
  type,
  validation,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='flex flex-col'>
      <label htmlFor='email'>{label}</label>
      <div className='relative'>
        <input
          id={id}
          placeholder={placeholder}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className={clsxm(
            'w-full rounded-md border-2 border-gray-400 px-2 py-2',
            error && 'border-red-500',
          )}
          {...register(id, validation)}
        />
        {type === 'password' && (
          <div
            className={clsxm(
              'absolute bottom-0 right-0 h-full hover:cursor-pointer',
              'flex items-center justify-center pr-3',
              'text-lg text-gray-900 md:text-xl',
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEye /> : <HiEyeOff />}
          </div>
        )}
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error.message}</p>}
    </div>
  );
}
