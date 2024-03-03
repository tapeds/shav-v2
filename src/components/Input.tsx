import { get, useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';
import { InputProps } from '@/types/form';

export default function Input({
  id,
  label,
  placeholder,
  validation,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='flex flex-col'>
      <label htmlFor='email'>{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        type='text'
        className={clsxm(
          'rounded-md border-2 border-gray-400 px-2 py-2',
          error && 'border-red-500',
        )}
        {...register(id, validation)}
      />
      {error && <p className='mt-1 text-sm text-red-500'>{error.message}</p>}
    </div>
  );
}
