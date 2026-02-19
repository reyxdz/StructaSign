import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: true,
  activeSection: 'overview',
  
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}));
