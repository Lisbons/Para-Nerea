'use client';

import { useEffect, useState, useRef } from 'react';
import loveConfig from '@/config/loveConfig';
import styles from './ParallaxTimeline.module.css';

interface PhotoItem {
  src: string;
  milestone: typeof loveConfig.milestones[0];
  index: number;
}

export default function ParallaxTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Generate photo items by pairing photos with milestones
  const photoItems: PhotoItem[] = Array.from({ length: loveConfig.photoCount }, (_, i) => ({
    src: `/photos/photo_${i + 1}.jpg`,
    milestone: loveConfig.milestones[i] || {
      title: 'Beautiful Memory',
      date: 'Our Journey',
      description: 'Every moment with you is a treasure.'
    },
    index: i
  }));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section className={styles.timeline}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Lo que siento por ti...</h2>
          <p>Nerea eres mi mundo entero

Me falta el aire cuando pienso en todo lo que me haces sentir. No es solo quererte, es que me tienes completamente loco de amor. Me vuelve loco verte feliz, porque cuando tú estás bien me siento muy feliz

me gusta cuando te pones a cantar y a bailar. Podría quedarme horas solo escuchandote, viendo cómo disfrutas, porque esa energía tuya es la que me mantiene vivo.

Nerea, tu sonrisa es mi debilidad. Es lo más bonito que tienen mis ojos para ver. Si por mí fuera, me pasaría la vida entera haciendo tonterías solo para escuchar tu risa y ver cómo se te ilumina la cara.

Me encanta que tengas ese don para cocer y cocinar. Ver cómo te concentras en tus cosas, cómo creas algo con tus manos me demuestra la clase de mujer increíble y detallista que eres.


Quiero que lo sepas hoy y que no se te olvide nunca, quiero que estés conmigo toda la vida. No quiero a nadie más, no busco nada más. Mi lugar es a tu lado, cuidándote, amándote y viendo cómo cumples cada uno de tus sueños como ser azafata o diseñadora.

Eres la persona con la que quiero compartir cada comida que cocines, cada canción que cantes y cada paso que des. Mi amor por ti no tiene límites

No te quiero para un rato, te quiero para siempre. Eres mi presente y quiero que seas todo mi futuro. Te amo con todo lo que soy, Nerea te amo.</p>
        </div>

        <div className={styles.timelineTrack}>
          {photoItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const isVisible = visibleItems.has(index);
            
            return (
              <div
                key={index}
                ref={el => { itemRefs.current[index] = el; }}
                className={`${styles.timelineItem} ${isVisible ? styles.visible : ''} ${isEven ? styles.left : styles.right}`}
              >
                <div className={styles.itemContent}>
                  {/* Photo */}
                  <div className={styles.photoWrapper}>
                    <div className={styles.photoFrame}>
                      <img 
                        src={item.src} 
                        alt={item.milestone.title}
                        className={styles.photo}
                        loading="lazy"
                      />
                      <div className={styles.photoOverlay}></div>
                    </div>
                    <div className={styles.heartFloat}>💕</div>
                  </div>

                  {/* Milestone info */}
                  <div className={styles.milestoneCard}>
                    <div className={styles.dateTag}>
                      <span className={styles.calendarIcon}>📅</span>
                      {item.milestone.date}
                    </div>
                    <h3 className={styles.milestoneTitle}>{item.milestone.title}</h3>
                    <p className={styles.milestoneDescription}>{item.milestone.description}</p>
                  </div>
                </div>

                {/* Timeline connector */}
                <div className={styles.connector}>
                  <div className={styles.dot}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
