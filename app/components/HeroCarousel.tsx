"use client";

import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
};

const AUTOPLAY_MS = 5500;

function isRemote(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [brokenSrcs, setBrokenSrcs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const visibleSlides = slides.filter((slide) => !brokenSrcs.has(slide.src));
  const count = visibleSlides.length;
  const safeIndex = count > 0 ? index % count : 0;

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  if (count === 0) return null;

  const active = visibleSlides[safeIndex];
  const goTo = (next: number) => setIndex((next + count) % count);
  const markBroken = (src: string) =>
    setBrokenSrcs((current) => new Set(current).add(src));

  return (
    <div
      className="hero-visual"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Créations Janima Fashion"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {visibleSlides.map((slide, i) => {
        const ready = mounted || !isRemote(slide.src);
        return (
          <img
            key={slide.src}
            src={ready ? slide.src : undefined}
            alt={slide.alt}
            className={`hero-slide${i === safeIndex ? " hero-slide-active" : ""}`}
            aria-hidden={i === safeIndex ? undefined : true}
            onError={() => markBroken(slide.src)}
          />
        );
      })}

      <img className="visual-stamp" src="/logo-final.jpeg" alt="Janima Fashion" />

      {count > 1 ? (
        <div className="hero-carousel-controls">
          <button
            type="button"
            className="hero-carousel-arrow"
            onClick={() => goTo(index - 1)}
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            type="button"
            className="hero-carousel-arrow"
            onClick={() => goTo(index + 1)}
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>
      ) : null}

      <div className="visual-caption">
        <span>{active.eyebrow}</span>
        <span>{active.title}</span>
      </div>

      {count > 1 ? (
        <div className="hero-carousel-dots" role="tablist" aria-label="Choisir une image">
          {visibleSlides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Aller à l'image ${i + 1}`}
              className={`hero-carousel-dot${i === safeIndex ? " hero-carousel-dot-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
