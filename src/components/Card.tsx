import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { LuSave } from 'react-icons/lu';

import { DeleteTask, EditTask } from '@/hooks/task';
import clsxm from '@/lib/clsxm';
import { CardProps, EditTaskProps } from '@/types/card';

function Card({ card, index, storage }: CardProps) {
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<EditTaskProps>();
  const { register, handleSubmit } = methods;

  const onClick = () => {
    DeleteTask(card._id)
      .catch(() => toast.error('Failed to delete task'))
      .then(() => {
        toast.success('Task deleted');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-expect-error */
        queryClient.invalidateQueries('/task');
      });
  };

  const editData = (formData: EditTaskProps) => {
    EditTask(card._id, formData, card)
      .catch(() => toast.error('Failed to edit task'))
      .then(() => {
        toast.success('Task edited');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-expect-error */
        queryClient.invalidateQueries('/task');
      });
  };

  function getDaysFromToday(dateString: string) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const givenDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      Math.abs((today.getTime() - givenDate.getTime()) / oneDay),
    );

    return diffDays;
  }

  const date = new Date(card.dueDate);
  const dateString = date.toDateString();
  const daysFromToday = getDaysFromToday(dateString);

  return (
    <Draggable draggableId={`${storage}-${index}`} index={index}>
      {(provided) => (
        <div
          className='group flex w-full flex-col items-center justify-center rounded-md bg-[#F6F6F6] px-4 py-2 transition-all duration-300'
          onMouseLeave={() => setEdit(false)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(editData)}>
              <div className='flex w-full items-center justify-between text-gray-900'>
                <div
                  className={clsxm(
                    'flex w-full flex-col py-[5px]',
                    edit && 'w-[200px] gap-0.5',
                  )}
                >
                  {!edit ? (
                    <>
                      <h5 className='text-start text-xl font-bold text-gray-900'>
                        {card.title}
                      </h5>
                      <p className='w-[200px] truncate text-wrap text-xs text-gray-800'>
                        {card.description}
                      </p>
                      <div className='flex w-[200px] items-center justify-start'>
                        <p className='w-[200px] truncate text-wrap text-xs text-gray-900'>
                          Due{' '}
                          <span className='text-red-500'>{daysFromToday}</span>{' '}
                          days left
                        </p>
                        {card.tags[0] === 'Low' && (
                          <div className='w-fit rounded-full bg-green-300 px-3 py-0.5 text-sm'>
                            Low
                          </div>
                        )}
                        {card.tags[0] === 'Medium' && (
                          <div className='w-fit rounded-full bg-yellow-300 px-3 py-0.5 text-sm'>
                            Medium
                          </div>
                        )}
                        {card.tags[0] === 'High' && (
                          <div className='w-fit rounded-full bg-red-300 px-3 py-0.5 text-sm'>
                            High
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor='priority' className='mt-2.5 text-xs'>
                        Title
                      </label>
                      <input
                        placeholder='Edit title'
                        className='w-[150px] rounded-md px-1'
                        {...register('title')}
                      />
                      <label htmlFor='priority' className='mt-2.5 text-xs '>
                        Description
                      </label>
                      <input
                        placeholder='Edit description'
                        className='w-[150px] rounded-md px-1'
                        {...register('description')}
                      />
                      <label htmlFor='priority' className='mt-2.5 text-xs'>
                        Priority
                      </label>
                      <select
                        id='priority'
                        className='w-[150px] p-0.5'
                        defaultValue={card.tags[0]}
                        {...register('priority')}
                      >
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                      </select>
                      <label htmlFor='date' className='mt-2.5 text-xs'>
                        Change Due Date
                      </label>
                      <input
                        id='date'
                        type='date'
                        className='w-[150px]'
                        {...register('dueDate')}
                      />
                    </>
                  )}
                </div>
                {!edit ? (
                  <FaEdit
                    className='size-6 text-gray-900 opacity-0 group-hover:cursor-pointer group-hover:opacity-100'
                    onClick={() => setEdit(!edit)}
                  />
                ) : (
                  <div className='flex flex-col gap-5'>
                    <button type='submit'>
                      <LuSave className='size-5 text-green-500 hover:cursor-pointer' />
                    </button>
                    <FiTrash2
                      className='size-5 text-red-500 hover:cursor-pointer'
                      onClick={() => onClick()}
                    />
                  </div>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
