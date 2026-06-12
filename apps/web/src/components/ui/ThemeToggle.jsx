import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  const handleToggle = () => {
    if (theme === 'system') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }

  return (
    <button
      onClick={handleToggle}
      className="theme-toggle"
      title={`Current theme: ${theme}. Click to change.`}
    >
      {theme === 'system' && <Monitor size={18} />}
      {theme === 'light' && <Sun size={18} />}
      {theme === 'dark' && <Moon size={18} />}
    </button>
  )
}
