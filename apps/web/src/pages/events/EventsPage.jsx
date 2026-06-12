import { useIsDark } from '@/hooks/useIsDark';
import EventsDark from './EventsDark';
import EventsLight from './EventsLight';

export default function EventsPage() {
  const isDark = useIsDark();
  return isDark ? <EventsDark /> : <EventsLight />;
}
