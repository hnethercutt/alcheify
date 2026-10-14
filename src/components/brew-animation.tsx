'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import './brew-animation.css';

export default function BrewAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const particleCount = 180;

    const colors = [
      '#645BFD',
      '#BA76F4',
      '#76DAE3',
      '#E2EF91',
      '#EE7BBA',
      '#1ED760',
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'brew-particle';

      const angle = Math.random() * Math.PI * 2;

      // Much larger burst, spreading across the viewport
      const distance = 150 + Math.random() * 550;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const size = 3 + Math.random() * 9;
      const duration = 2 + Math.random() * 2.5;
      const delay = Math.random() * -4;

      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty(
        '--color',
        colors[Math.floor(Math.random() * colors.length)]
      );

      fragment.appendChild(particle);
    }

    container.appendChild(fragment);

    return () => container.replaceChildren();
  }, []);

  return (
    <div className="brew-loading-overlay" role="status">
      <div
        className="brew-particle-container"
        ref={containerRef}
        aria-hidden="true"
      />

      <div className="brew-loading-content">
        <div className="brew-orb">
          <Image
            src="./potion.svg"
            alt="logo"
            width={48}
            height={48}
            loading="eager"
          ></Image>
        </div>

        <h2>Brewing your playlist</h2>
      </div>
    </div>
  );
}
