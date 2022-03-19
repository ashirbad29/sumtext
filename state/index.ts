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
  synching: boolean;
  hasUnsavedContent: boolean;
  setText: (data: any) => void;
  setContent: (content: Array<Descendant>) => void;
  setSynching: (val: boolean) => void;
  setHasUnsavedContent: (val: boolean) => void;
};

export const useEditorState = create<StoreType>((set) => ({
  textData: {
    id: null,
    slug: null,
  },
  content: initialValue,
  synching: false,
  hasUnsavedContent: false,
  setText: (data) => set((state) => ({ textData: { ...state.textData, ...data } })),
  setContent: (content) => set({ content }),
  setSynching: (value: boolean) => set({ synching: value }),
  setHasUnsavedContent: (value: boolean) => set({ hasUnsavedContent: value }),
}));
