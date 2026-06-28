import { create } from 'zustand';

interface UserProgressState {
  phishingScore: number;
  urlsChecked: number;
  passwordChecks: number;
  incrementPhishingScore: () => void;
  incrementUrlsChecked: () => void;
  incrementPasswordChecks: () => void;
  resetProgress: () => void;
}

export const useUserProgressStore = create<UserProgressState>((set) => ({
  phishingScore: 0,
  urlsChecked: 0,
  passwordChecks: 0,
  incrementPhishingScore: () => set((state) => ({ phishingScore: state.phishingScore + 1 })),
  incrementUrlsChecked: () => set((state) => ({ urlsChecked: state.urlsChecked + 1 })),
  incrementPasswordChecks: () => set((state) => ({ passwordChecks: state.passwordChecks + 1 })),
  resetProgress: () => set({ phishingScore: 0, urlsChecked: 0, passwordChecks: 0 }),
}));


