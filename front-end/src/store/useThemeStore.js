import { create } from 'zustand';

// Create a Zustand store for theme management
export const useThemeStore = create((set) => ({
  // Initialize theme from localStorage or default to "dark"
  theme: typeof window !== 'undefined' ? localStorage.getItem('chat-theme') || 'dark' : 'dark',

  // Function to set the theme and save it to localStorage
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-theme', theme);
    }
    set({ theme });
  },
}));

export default useThemeStore;