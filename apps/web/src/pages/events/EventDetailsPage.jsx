import { useThemeStore } from '@/stores/themeStore';
import EventDetailsLight from './EventDetailsLight';
import EventDetailsDark from './EventDetailsDark';

export default function EventDetailsPage() {
  const { theme } = useThemeStore();
  
  if (theme === 'dark') {
    return <EventDetailsDark />;
  }
  
  return <EventDetailsLight />;
}
