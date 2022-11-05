import create from "zustand";

export const usePosthData = create((set) => ({
  title: "",
  body: "",
  setTitle: (title) => set(() => ({ title })),
  setBody: (body) => set(() => ({ body })),

  
}));
