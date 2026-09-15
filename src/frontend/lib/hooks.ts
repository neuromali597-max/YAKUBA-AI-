"use client";

import { useEffect, useRef, useState } from "react";

// Révélation au scroll : ajoute is-visible quand l'élément entre dans le viewport.
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Effet machine à écrire : dévoile `text` caractère par caractère quand `active` est vrai.
export function useTypewriter(text: string, active: boolean, speed = 24) {
  const [len, setLen] = useState(0);

  useEffect(() => {
    setLen(0);
    if (!active) return;
    const timer = setInterval(() => {
      setLen((l) => {
        if (l >= text.length) {
          clearInterval(timer);
          return l;
        }
        return l + 2;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [text, active, speed]);

  return { typed: text.slice(0, Math.min(len, text.length)), done: len >= text.length };
}

// Media query réactive (breakpoints du prototype : 960px pour le header).
export function useMediaQuery(query: string, fallback = true) {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);

  return matches;
}
