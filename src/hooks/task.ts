import { useEffect } from 'react';

import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { EditTaskProps } from '@/types/card';
import { ListsState, PostNewTask, Task, TaskProps } from '@/types/task';

export const useTaskFilter = (
  data: ApiResponse<TaskProps> | undefined,
  setLists: (lists: ListsState) => void,
) => {
  useEffect(() => {
    if (data?.data.tasks) {
      const ToDo = data.data.tasks.filter((task) => task.status === 'To Do');
      const InProgress = data.data.tasks.filter(
        (task) => task.status === 'In Progress',
      );
      const InRevision = data.data.tasks.filter(
        (task) => task.status === 'In Revision',
      );
      const Done = data.data.tasks.filter((task) => task.status === 'Done');
      setLists({
        'To Do': ToDo,
        'In Progress': InProgress,
        'In Revision': InRevision,
        Done: Done,
      });
    }
  }, [data, setLists]);
};

export const PostTask = (task: PostNewTask) => {
  return api.post('/task', task);
};

export const DeleteTask = (id: string) => {
  return api.delete(`/task/${id}`);
};

export const EditTask = (id: string, task: EditTaskProps, card: Task) => {
  return api.put(`/task/${id}`, {
    title: task.title || card.title,
    description: task.description || card.description,
    dueDate: task.dueDate || card.dueDate,
    tags: [task.priority || card.tags[0]],
  });
};
