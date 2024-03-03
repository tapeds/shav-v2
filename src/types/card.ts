import { Task } from '@/types/task';

export type CardProps = {
  index: number;
  storage: string;
  card: Task;
};

export type EditTaskProps = {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
};
