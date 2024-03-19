import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import  VoiceSearchButton from '@/components/VoiceSearchButton/VoiceSearchButton';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <VoiceSearchButton />
    </>
  );
}
