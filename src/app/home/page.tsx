'use client';

import { useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import DragDrop from '@/container/DragDrop';
import { useTaskFilter } from '@/hooks/task';
import { useListStore } from '@/store/useListStore';
import { ApiResponse } from '@/types/api';
import { TaskProps } from '@/types/task';

export default function App() {
  const { data } = useQuery<ApiResponse<TaskProps>>({
    queryKey: ['/task'],
  });
  const { setLists } = useListStore();
  useTaskFilter(data, setLists);

  const router = useRouter();

  return (
    <main className='h-full w-full overflow-hidden bg-[#F6F6F6]'>
      <Image
        src='/logo.jpg'
        alt='logo'
        width={60}
        height={60}
        className='absolute right-5 top-5 hover:cursor-pointer md:left-10 md:top-10'
      />
      <div className='flex h-full min-h-screen w-full flex-col items-start justify-center gap-8 bg-[#F6F6F6] pb-10 pt-20 md:items-center'>
        <div className='flex flex-col md:items-center'>
          <h1 className='px-5 text-4xl font-bold text-gray-900'>SHAV</h1>
          <h2 className='px-5 text-2xl font-bold text-gray-900'>
            Project Management App
          </h2>
        </div>
        <div className='flex w-full flex-col items-start justify-center max-lg:overflow-x-scroll max-lg:px-5 lg:items-center'>
          <DragDrop />
        </div>
      </div>
      <div className='flex h-10 items-center justify-center divide-x-2 divide-gray-900 bg-[#F6F6F6]'>
        <p className='pr-5 text-base font-medium text-gray-900'>
          Farrell Matthew Lim
        </p>
        <p
          className='pl-5 text-base font-medium text-red-500 hover:cursor-pointer'
          onClick={() => {
            toast.success('Logged out successfully');
            deleteCookie('accessToken');
            router.push('/login');
          }}
        >
          Logout
        </p>
      </div>
    </main>
  );
}
