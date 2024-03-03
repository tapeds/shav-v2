import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';

import { PostTask } from '@/hooks/task';
import { ModalProps } from '@/types/modal';
import { ModalTask } from '@/types/task';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function CustomModal({ open, setOpen, storage }: ModalProps) {
  const methods = useForm<ModalTask>();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = methods;

  const onSubmit = (formData: ModalTask) => {
    const data = {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      tags: [formData.priority],
      status: storage,
    };
    PostTask(data)
      .catch(() => toast.error('Failed to add task'))
      .then(() => {
        toast.success('Task added');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-expect-error */
        queryClient.invalidateQueries('/task');
        reset();
      });

    setOpen(false);
  };

  return (
    <Modal isOpen={open} style={customStyles}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-[250px] text-gray-900 md:w-[300px]'>
            <div className='flex items-center justify-between'>
              <h3 className='text-2xl font-medium text-gray-900'>Add Item</h3>
              <IoClose
                className='size-6 hover:cursor-pointer'
                onClick={() => setOpen(false)}
              />
            </div>
            <div className='mt-5 flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='title'>Title</label>
                <input
                  id='title'
                  type='text'
                  placeholder='Masukkan title'
                  className='rounded-lg border-2 px-2 py-1'
                  {...register('title', { required: true })}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor='description'>Description</label>
                <input
                  id='description'
                  type='text'
                  placeholder='Masukkan description'
                  className='rounded-lg border-2 px-2 py-1'
                  {...register('description', { required: true })}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor='dueDate'>Due Date</label>
                <input
                  id='dueDate'
                  type='date'
                  placeholder='Masukkan description'
                  className='rounded-lg border-2 px-2 py-1'
                  {...register('dueDate', { required: true })}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor='priority'>Priority</label>
                <div className='flex justify-around'>
                  <div className='flex items-center gap-1'>
                    <input
                      type='radio'
                      className='size-4'
                      placeholder='Masukkan description'
                      value='Low'
                      {...register('priority', { required: true })}
                    />
                    <label htmlFor='priority'>Low</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input
                      type='radio'
                      className='size-4'
                      placeholder='Masukkan description'
                      value='Medium'
                      {...register('priority', { required: true })}
                    />
                    <label htmlFor='priority'>Medium</label>
                  </div>
                  <div className='flex items-center gap-1'>
                    <input
                      type='radio'
                      className='size-4'
                      placeholder='Masukkan description'
                      value='High'
                      {...register('priority', { required: true })}
                    />
                    <label htmlFor='priority'>High</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className='mt-5 w-full rounded-xl border bg-gray-900 py-2 font-semibold text-slate-50 transition-all duration-200'
            type='submit'
          >
            Add
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default CustomModal;
