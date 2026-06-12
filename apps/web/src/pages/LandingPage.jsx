import { useIsDark } from '@/hooks/useIsDark';
import HomeDark from './home/HomeDark';
import HomeLight from './home/HomeLight';

export default function LandingPage() {
  const isDark = useIsDark();
  return isDark ? <HomeDark /> : <HomeLight />;
}
