import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const applyThemeToDocument = (theme, systemTheme) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'system', // 'light' | 'dark' | 'system'
      
      setTheme: (newTheme) => {
        set({ theme: newTheme });
        const systemTheme = getSystemTheme();
        applyThemeToDocument(newTheme, systemTheme);
      },
      
      initTheme: () => {
        const { theme } = get();
        const systemTheme = getSystemTheme();
        applyThemeToDocument(theme, systemTheme);
        
        // Setup listener for system theme changes if we are using 'system'
        if (typeof window !== 'undefined' && window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          
          const handleChange = (e) => {
            if (get().theme === 'system') {
              applyThemeToDocument('system', e.matches ? 'dark' : 'light');
            }
          };
          
          // Modern browsers
          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
          } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
          }
          
          // Return cleanup function
          return () => {
            if (mediaQuery.removeEventListener) {
              mediaQuery.removeEventListener('change', handleChange);
            } else {
              mediaQuery.removeListener(handleChange);
            }
          };
        }
      }
    }),
    {
      name: 'passwale-theme-storage',
    }
  )
);
