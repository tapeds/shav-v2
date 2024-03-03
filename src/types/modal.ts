import { Dispatch, SetStateAction } from 'react';

export type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  storage: string;
};
