import { useMutation } from '@tanstack/react-query';

import api from '@/lib/api';
import { LoginProps, RegisterProps } from '@/types/form';

export const useLogin = () => {
  const { isPending, mutateAsync } = useMutation<LoginProps>({
    mutationFn: async (data) => {
      return await api.post('/user/login', data);
    },
  });

  return { isPending, mutateAsync };
};

export const useRegister = () => {
  const { isPending, mutateAsync } = useMutation<RegisterProps>({
    mutationFn: async (data) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-expect-error */
      return await api.post('/user', { ...data, language: 'en' });
    },
  });

  return { isPending, mutateAsync };
};
