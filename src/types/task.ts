export type TaskProps = {
  tasks: Task[];
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type ListsState = {
  [key: string]: Task[];
};

export type PostNewTask = {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  tags: string[];
};

export type ModalTask = {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  priority: string;
};
