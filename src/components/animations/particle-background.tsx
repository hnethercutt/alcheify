'use client';
import { useEffect, useRef } from 'react';
import './particle-background.css';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) { return };

    const particleCount = 100;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'circle-container';

      const circle = document.createElement('div');
      circle.className = 'circle';

      const size = Math.random() * 9 + 1;
      const startX = Math.random() * 100;
      const endX = Math.random() * 100;
      const startY = Math.random() * 10 + 100;
      const endY = -startY - Math.random() * 30;

      const duration = 20 + Math.random() * 10;
      const delay = Math.random() * 11;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.setProperty('--start-x', `${startX}vw`);
      particle.style.setProperty('--start-y', `${startY}vh`);
      particle.style.setProperty('--end-x', `${endX}vw`);
      particle.style.setProperty('--end-y', `${endY}vh`);
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--delay', `${-delay}s`);

      circle.style.animationDelay = `${Math.random() * 2}s, ${Math.random() * 4}s`;

      particle.appendChild(circle);
      fragment.appendChild(particle);
    }

    container.appendChild(fragment);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="particle-background" aria-hidden="true">
      <div className="particle-container" ref={containerRef} />
    </div>
  );
}
