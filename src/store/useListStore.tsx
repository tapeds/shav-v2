import { create } from 'zustand';

import { ListStore } from '@/types/store';

export const useListStore = create<ListStore>((set) => ({
  lists: {
    'To Do': [],
    'In Progress': [],
    'In Revision': [],
    Done: [],
  },
  setLists: (lists) => set({ lists }),
}));
