import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { ApiError } from '@/types/api';
import {
  LoginProps,
  loginResponse,
  RegisterProps,
  registerResponse,
} from '@/types/form';

export const useLogin = () => {
  const router = useRouter();
  const { isPending, data, mutateAsync } = useMutation<
    loginResponse,
    ApiError,
    LoginProps
  >({
    mutationFn: async (data: LoginProps) => {
      const { data: responseData } = await api.post('/user/login', data);

      return responseData;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (responseData) => {
      toast.success('Logged in successfully');
      setCookie('accessToken', responseData.accessToken);
      router.push('/home');
    },
  });

  return { isPending, data, mutateAsync };
};

export const useRegister = () => {
  const router = useRouter();
  const { isPending, mutateAsync } = useMutation<
    registerResponse,
    ApiError,
    RegisterProps
  >({
    mutationFn: async (data: RegisterProps) => {
      const { data: responseData } = await api.post('/user', {
        ...data,
        language: 'en',
      });

      return responseData;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Registered successfully');
      router.push('/login');
    },
  });

  return { isPending, mutateAsync };
};
