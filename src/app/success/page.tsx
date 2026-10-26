'use client'
import { useSearchParams } from "next/navigation";
import { fetchSpotifyPlaylist } from "@/services/playlist-service";
import { useEffect, useState, Suspense } from "react";
import ParticleBackground from "@/components/animations/particle-background";
import parse from 'html-react-parser';
import styles from './page.module.css';

function SuccessContent() {
    const params = useSearchParams();
    const playlistUrl = params.get('playlistUrl');
    const [embed, setEmbed] = useState<string>('');

    // Display embedded playlist
    useEffect(() => {
        if (playlistUrl) {
            fetchSpotifyPlaylist(playlistUrl).then(function(_embedHtml) {
                setEmbed(_embedHtml);
            });
        }
    }, [playlistUrl]);

    return (
        <div className={`flex-column ${styles.container}`}>
            <ParticleBackground />
            <h1>Your Playlist is Ready!</h1>
            <div className={styles.embed}>
                {parse(embed)}
            </div>
            <div><a href='/generate'>Brew another playlist</a></div>
        </div>
    );
}

export default function Success() {
    return (
        <Suspense fallback={<p>Loading your playlist...</p>}>
            <SuccessContent />
        </Suspense>
    )
}