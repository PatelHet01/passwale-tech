import { useIsDark } from '@/hooks/useIsDark';
import ScenesDark from './ScenesDark';
import ScenesLight from './ScenesLight';

export default function ScenesPage() {
  const isDark = useIsDark();
  return isDark ? <ScenesDark /> : <ScenesLight />;
}
