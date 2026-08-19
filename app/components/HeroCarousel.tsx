"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  heading: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  eyebrow: string;
  ctaLabel: string;
  ctaHref: string;
};

const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD = 40;

function isRemote(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function HeroCarousel({ slides, eyebrow, ctaLabel, ctaHref }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [brokenSrcs, setBrokenSrcs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

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

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setPaused(true);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setPaused(false);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Créations Janima Fashion"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

      <div className="hero-overlay-copy">
        <p className="hero-overlay-eyebrow">
          <span className="hero-overlay-dash" aria-hidden="true" />
          {eyebrow}
          <span className="hero-overlay-dash" aria-hidden="true" />
        </p>
        <h1 className="hero-overlay-title">{active.heading}</h1>
        <Link className="hero-overlay-cta" href={ctaHref}>
          {ctaLabel}
        </Link>
      </div>

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
