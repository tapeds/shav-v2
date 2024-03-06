import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa6';

import Card from '@/components/Card';
import clsxm from '@/lib/clsxm';
import { useListStore } from '@/store/useListStore';
import { ListProps } from '@/types/list';
import { Task } from '@/types/task';

const Modal = dynamic(() => import('@/components/Modal'));

function List({ title, className }: ListProps) {
  const [open, setOpen] = useState(false);
  const { lists } = useListStore();

  const data = lists[title];

  return (
    <>
      <Modal open={open} setOpen={setOpen} storage={title} />
      <div
        className={clsxm(
          'container-list flex h-full w-1/4 flex-col justify-between gap-y-2 p-3',
          className,
        )}
      >
        <div className='list-title text-center font-semibold text-slate-50'>
          {title}
        </div>
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              className='list-card flex h-full flex-col overflow-auto rounded-lg'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data &&
                data.map((card: Task, index: number) => {
                  if (!card.deletedAt) {
                    return (
                      <Card
                        key={card._id}
                        index={index}
                        storage={title}
                        card={card}
                      />
                    );
                  }
                  return null;
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div
          className='add-button flex items-center text-slate-50 hover:cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          <FaPlus className='size-4' /> Add Item
        </div>
      </div>
    </>
  );
}

export default List;
