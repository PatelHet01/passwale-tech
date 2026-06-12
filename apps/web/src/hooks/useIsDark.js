import { useThemeStore } from '@/stores/themeStore';

/**
 * Returns true if the current resolved theme is dark.
 * Reads from themeStore and resolves 'system' via matchMedia.
 */
export function useIsDark() {
  const theme = useThemeStore((s) => s.theme);
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  // system
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}
