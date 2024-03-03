import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa6';

import Card from '@/components/Card';
import Modal from '@/components/Modal';
import clsxm from '@/lib/clsxm';
import { useListStore } from '@/store/useListStore';
import { ListProps } from '@/types/list';
import { Task } from '@/types/task';

function List({ title, className }: ListProps) {
  const [open, setOpen] = useState(false);
  const { lists } = useListStore();

  const data = lists[title];

  return (
    <>
      <Modal open={open} setOpen={setOpen} storage={title} />
      <div
        className={clsxm(
          'flex h-max w-1/4 flex-col justify-between gap-y-2 p-3',
          className,
        )}
      >
        <div className='text-center font-semibold text-slate-50'>{title}</div>
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              className='flex h-full flex-col gap-y-1.5 overflow-auto rounded-lg'
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
          className='flex items-center gap-2 text-slate-50 hover:cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          <FaPlus className='size-4' /> Add Item
        </div>
      </div>
    </>
  );
}

export default List;
