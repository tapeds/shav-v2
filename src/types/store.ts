import { ListsState } from '@/types/task';

export type ListStore = {
  lists: ListsState;
  setLists: (lists: ListsState) => void;
};
