import styles from './page.module.css';
import SpotifyLoginButton from '@/components/spotify-login-button';
import Image from 'next/image';
import ParticleBackground from '@/components/animations/particle-background';

export default function Home() {
  return (
    <div className={styles.page}>
      <ParticleBackground />
      <Image src="./alcheify.svg" alt="logo" width={128} height={128}></Image>
      <div className={styles.title}>Alcheify</div>
      <h3>An AI-powered playlist generator for Spotify</h3>
      <p className={styles.subtext}>Choose your ingredients, add any modifications and brew your perfect playlist</p>
      <SpotifyLoginButton />
    </div>
  );
}