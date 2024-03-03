'use client';

import { useQuery } from '@tanstack/react-query';

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

  return (
    <main className='h-full w-full overflow-hidden'>
      <div className='flex h-full min-h-screen w-full flex-col items-start justify-center gap-8 bg-[#F6F6F6] md:items-center'>
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
      <div className='flex h-10 flex-col items-center justify-center bg-[#F6F6F6]'>
        <p className='text-base font-medium text-gray-900'>
          Farrell Matthew Lim - 5025221258
        </p>
      </div>
    </main>
  );
}
