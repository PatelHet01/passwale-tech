import { useThemeStore } from '@/stores/themeStore';
import DashboardDark from './DashboardDark';
import DashboardLight from './DashboardLight';

export default function DashboardPage() {
  const { theme } = useThemeStore();

  if (theme === 'dark') {
    return <DashboardDark />;
  }

  return <DashboardLight />;
}
