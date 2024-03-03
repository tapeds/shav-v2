import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import List from '@/container/List';
import { DeleteTask, PostTask } from '@/hooks/task';
import { useListStore } from '@/store/useListStore';

export default function DragDrop() {
  const { lists, setLists } = useListStore();

  const OnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const sourceList = [...lists[source.droppableId]];
    const card = sourceList[source.index];
    sourceList.splice(source.index, 1);

    const destinationList = [...lists[destination.droppableId]];
    destinationList.splice(destination.index, 0, card);

    const newLists = {
      ...lists,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    };

    setLists(newLists);

    const task = {
      title: card.title,
      description: card.description,
      status: destination.droppableId,
      dueDate: card.dueDate,
      tags: card.tags,
    };

    PostTask(task);
    DeleteTask(card._id);
  };

  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <div className='flex h-[450px] w-[1200px] gap-3 divide-x-2 divide-gray-600 rounded-xl bg-gray-900 p-3'>
        <List title='To Do' className='rounded-l-md' />
        <List title='In Progress' />
        <List title='In Revision' />
        <List title='Done' className='rounded-r-md' />
      </div>
    </DragDropContext>
  );
}
