import { initialValue } from 'components/Editor/data';
import { Descendant } from 'slate';
import create from 'zustand';

type StoreType = {
  textData: {
    id: string | null;
    slug: string | null;
    private?: boolean;
    password?: string;
  };
  content: Array<Descendant>;
  setText: (data: any) => void;
  setContent: (content: Array<Descendant>) => void;
};

export const useEditorState = create<StoreType>((set) => ({
  textData: {
    id: null,
    slug: null,
  },
  content: initialValue,
  setText: (data) => set((state) => ({ textData: { ...state.textData, ...data } })),
  setContent: (content) => set({ content }),
}));
