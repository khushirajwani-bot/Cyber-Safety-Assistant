import { create } from 'zustand';

interface UserProgressState {
  phishingScore: number;
  urlsChecked: number;
  passwordChecks: number;
  // actions will be added later
}

export const useUserProgressStore = create<UserProgressState>(() => ({
  phishingScore: 0,
  urlsChecked: 0,
  passwordChecks: 0,
}));

