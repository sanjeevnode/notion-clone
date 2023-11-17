import { create } from "zustand";

type CoverImageStore = {
  isOpen: boolean;
  url?: string;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
  isOpen: false,
  url: undefined,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url) => set({ isOpen: true, url }),
}));
