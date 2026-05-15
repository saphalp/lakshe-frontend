// components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect cleanup runs synchronously BEFORE React removes DOM nodes,
// which lets GSAP undo its pin-spacer wrapper before React tries removeChild.
// On the server there is no DOM, so fall back to useEffect (no-op there anyway).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Sparkles, Target, FileText, CheckCircle2, Bookmark, LayoutDashboard } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  /* Inherit the app font everywhere inside this component */
  .cinematic-hero-root, .cinematic-hero-root * {
    font-family: var(--font-plus-jakarta-sans), var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  }

  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
    color: var(--color-foreground);
    text-shadow:
      0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
      0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
    background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
      drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-card-silver-matte {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep card — slightly tuned to Lakshe brand blues */
  .premium-depth-card {
    background: linear-gradient(145deg, #132344 0%, #070E1A 100%);
    box-shadow:
      0 40px 100px -20px rgba(0, 0, 0, 0.9),
      0 20px 40px -20px rgba(0, 0, 0, 0.8),
      inset 0 1px 2px rgba(255, 255, 255, 0.12),
      inset 0 -2px 4px rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(79, 128, 245, 0.08);
    position: relative;
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79,128,245,0.07) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* ── Laptop mockup ─────────────────────────────────────── */
  .laptop-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-style: preserve-3d;
  }

  .laptop-lid {
    width: 460px;
    aspect-ratio: 16 / 10;
    background: linear-gradient(170deg, #2D2D2F 0%, #1C1C1E 100%);
    border-radius: 10px 10px 0 0;
    padding: 10px 10px 5px 10px;
    position: relative;
    border: 1px solid rgba(255,255,255,0.06);
    border-bottom: none;
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.9),
      inset 0 1px 0 rgba(255,255,255,0.08),
      0 -30px 60px -10px rgba(0,0,0,0.6);
  }

  .laptop-camera-bump {
    position: absolute;
    top: 4px; left: 50%;
    transform: translateX(-50%);
    width: 6px; height: 6px;
    background: #111;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: inset 0 0 0 1.5px rgba(79,128,245,0.25);
  }

  .laptop-screen-inner {
    width: 100%;
    height: 100%;
    background: #050914;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 20px rgba(0,0,0,0.5);
    position: relative;
  }

  .screen-glare {
    background: linear-gradient(115deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 45%);
    pointer-events: none;
  }

  .laptop-hinge {
    width: 480px;
    height: 4px;
    background: linear-gradient(180deg, #1A1A1C 0%, #141416 100%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .laptop-base {
    width: 500px;
    height: 20px;
    background: linear-gradient(180deg, #3A3A3C 0%, #2A2A2C 60%, #222224 100%);
    border-radius: 0 0 8px 8px;
    border: 1px solid rgba(255,255,255,0.04);
    border-top: none;
    box-shadow:
      0 8px 24px -4px rgba(0,0,0,0.9),
      0 24px 48px -12px rgba(0,0,0,0.7),
      inset 0 1px 0 rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
  }

  .laptop-trackpad-line {
    width: 72px; height: 1px;
    background: rgba(255,255,255,0.07);
    border-radius: 1px;
  }
  /* ─────────────────────────────────────────────────────── */

  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow:
      0 4px 8px rgba(0,0,0,0.25),
      inset 0 1px 1px rgba(255,255,255,0.04),
      inset 0 -1px 1px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.08),
      0 20px 40px -10px rgba(0,0,0,0.8),
      inset 0 1px 1px rgba(255,255,255,0.12),
      inset 0 -1px 1px rgba(0,0,0,0.4);
  }

  .btn-lakshe-primary {
    background: linear-gradient(180deg, #4F80F5 0%, #3365D0 100%);
    color: #FFFFFF;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow:
      0 0 0 1px rgba(79,128,245,0.3), 0 2px 4px rgba(0,0,0,0.4),
      0 12px 24px -4px rgba(79,128,245,0.4),
      inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3);
  }
  .btn-lakshe-primary:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 0 1px rgba(79,128,245,0.4), 0 6px 12px -2px rgba(79,128,245,0.3),
      0 20px 32px -6px rgba(79,128,245,0.5),
      inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.3);
  }
  .btn-lakshe-primary:active { transform: translateY(1px); }

  .btn-lakshe-ghost {
    background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
    color: #EDF2FF;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
  }
  .btn-lakshe-ghost:hover {
    transform: translateY(-2px);
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.15);
  }
  .btn-lakshe-ghost:active { transform: translateY(1px); }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }

  @media (prefers-reduced-motion: reduce) {
    .gsap-reveal { visibility: visible !important; }
    .text-track, .text-days, .main-card, .card-left-text, .card-right-text,
    .mockup-scroll-wrapper, .floating-badge, .phone-widget, .cta-wrapper {
      opacity: 1 !important; visibility: visible !important;
      transform: none !important; filter: none !important;
      clip-path: none !important;
    }
    .progress-ring { stroke-dashoffset: 60; }
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Lakshe",
  tagline1 = "Land your dream job —",
  tagline2 = "faster than ever.",
  cardHeading = "Your AI career engine.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Lakshe</span> scrapes jobs
      from LinkedIn, Indeed, and Glassdoor — then generates tailored,
      ATS-beating resumes and tracks every application in one workspace.
    </>
  ),
  metricValue = 50,
  metricLabel = "Jobs Matched",
  ctaHeading = "Start landing interviews.",
  ctaDescription =
    "Join job seekers using Lakshe to apply smarter, track better, and land faster.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 8,
            rotationX: -yVal * 5,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Hero text blurs out + card rises
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.1, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 1.5 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.2 })
        // Laptop slides in — shorter, less extreme entry
        .fromTo(".mockup-scroll-wrapper",
          { y: 160, z: -200, rotationX: 20, autoAlpha: 0, scale: 0.85 },
          { y: 0, z: 0, rotationX: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1 }, "-=0.6"
        )
        // Screen content fades in
        .fromTo(".phone-widget", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, ease: "power2.out", duration: 0.7 }, "-=0.6")
        // Counter + progress ring
        .to(".progress-ring", { strokeDashoffset: 60, duration: 1.2, ease: "power3.inOut" }, "-=0.5")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.2, ease: "expo.out" }, "-=1.2")
        // Floating badges
        .fromTo(".floating-badge", { y: 50, autoAlpha: 0, scale: 0.8 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.4)", duration: 0.8, stagger: 0.12 }, "-=1")
        // Side text
        .fromTo(".card-left-text",  { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 0.8 }, "-=0.6")
        .fromTo(".card-right-text", { x: 30,  autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 0.8 }, "<")
        // Swap to CTA
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        // Laptop exits quickly, card shrinks to reveal CTA
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          y: -30, autoAlpha: 0, ease: "power2.in", duration: 0.6, stagger: 0.04,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.2,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.2 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.2 });
    }, containerRef);

    return () => {
      // Kill pin-spacer ScrollTriggers first so GSAP restores the DOM
      // structure before React's removeChild runs.
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ctx.revert();
    };
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "cinematic-hero-root relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* Hero taglines */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* Final CTA */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/sign-up"
            className="btn-lakshe-primary flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl font-semibold text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="btn-lakshe-ghost flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl font-medium text-base focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background"
          >
            Log in
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          Free plan available · No credit card required
        </p>
      </div>

      {/* Deep-blue foreground card */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* 3-col grid (stacked on mobile) */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-10 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-6 z-10 py-6 lg:py-0">

            {/* TOP / RIGHT — brand name */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter text-card-silver-matte">
                {brandName}
              </h2>
            </div>

            {/* MIDDLE / CENTER — Laptop mockup */}
            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[320px] lg:h-[520px] flex items-center justify-center z-10"
              style={{ perspective: "1200px" }}
            >
              {/* scale wrapper: 0.55 on mobile, 0.75 on md, 1 on lg */}
              <div className="relative flex items-center justify-center transform scale-[0.55] md:scale-75 lg:scale-100">

                {/* LAPTOP */}
                <div ref={mockupRef} className="laptop-wrapper will-change-transform">

                  {/* Lid / screen */}
                  <div className="laptop-lid">
                    <div className="laptop-camera-bump" aria-hidden="true" />
                    <div className="laptop-screen-inner">
                      <div className="absolute inset-0 screen-glare z-40" aria-hidden="true" />

                      {/* ── Lakshe dashboard UI inside the screen ── */}
                      <div className="relative w-full h-full flex flex-col text-white overflow-hidden text-[11px]">

                        {/* Top bar */}
                        <div className="phone-widget flex items-center justify-between px-3 py-1.5 border-b border-white/5 bg-white/[0.02] flex-shrink-0">
                          <span className="font-bold text-[12px] tracking-tight text-white/90">Lakshe</span>
                          <div className="flex items-center gap-3 text-white/40">
                            <span className="hidden sm:inline">Dashboard</span>
                            <span>Jobs</span>
                            <span>Resume</span>
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[8px] font-bold text-blue-300">SP</div>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 px-3 py-2 overflow-hidden flex flex-col gap-2">

                          {/* Greeting + stats row */}
                          <div className="phone-widget flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-white/90 text-[11px]">Welcome back, Saphal</p>
                              <p className="text-white/35 text-[9px] mt-0.5">3 new job matches today</p>
                            </div>
                            {/* Mini stat cards */}
                            <div className="flex gap-1.5 flex-shrink-0">
                              {[
                                { label: "Saved", val: "12" },
                                { label: "Applied", val: "5" },
                                { label: "Resumes", val: String(metricValue) },
                              ].map((s) => (
                                <div key={s.label} className="widget-depth rounded-md px-2 py-1 flex flex-col items-center min-w-[36px]">
                                  <span className="text-white font-bold text-[10px]">{s.val}</span>
                                  <span className="text-white/30 text-[7px]">{s.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Progress ring + job list row */}
                          <div className="flex gap-2 flex-1 min-h-0">

                            {/* Ring */}
                            <div className="phone-widget widget-depth rounded-lg p-2 flex flex-col items-center justify-center w-[90px] flex-shrink-0">
                              <div className="relative w-14 h-14 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
                                  <circle className="progress-ring" cx="28" cy="28" r="22" fill="none" stroke="#4F80F5" strokeWidth="4" />
                                </svg>
                                <div className="z-10 flex flex-col items-center">
                                  <span className="counter-val text-[13px] font-extrabold text-white leading-none">0</span>
                                  <span className="text-[6px] text-blue-200/40 uppercase tracking-wide mt-0.5">{metricLabel}</span>
                                </div>
                              </div>
                            </div>

                            {/* Job cards */}
                            <div className="flex flex-col gap-1.5 flex-1 min-w-0 overflow-hidden">
                              {[
                                { role: "Frontend Engineer", company: "Stripe", tag: "NEW", tagColor: "text-blue-300 border-blue-400/30 bg-blue-500/10", icon: <Target className="w-2.5 h-2.5 text-blue-400" /> },
                                { role: "Software Engineer", company: "Vercel", tag: "RESUME ✓", tagColor: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10", icon: <FileText className="w-2.5 h-2.5 text-emerald-400" /> },
                                { role: "Full Stack Dev", company: "Linear", tag: "SAVED", tagColor: "text-white/40 border-white/10 bg-white/5", icon: <Bookmark className="w-2.5 h-2.5 text-white/40" /> },
                              ].map((job) => (
                                <div key={job.role} className="phone-widget widget-depth rounded-md px-2 py-1.5 flex items-center gap-2">
                                  <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    {job.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white/80 font-medium truncate text-[9px]">{job.role}</p>
                                    <p className="text-white/30 text-[8px]">{job.company}</p>
                                  </div>
                                  <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${job.tagColor}`}>
                                    {job.tag}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tracker header strip */}
                          <div className="phone-widget flex gap-1.5 mt-auto">
                            {["Saved", "Applied", "Interview", "Offer"].map((col) => (
                              <div key={col} className="widget-depth rounded px-2 py-1 flex-1 text-center">
                                <span className="text-white/25 text-[7px] uppercase tracking-wide">{col}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hinge */}
                  <div className="laptop-hinge" aria-hidden="true" />

                  {/* Base / keyboard */}
                  <div className="laptop-base" aria-hidden="true">
                    <div className="laptop-trackpad-line" />
                  </div>
                </div>

                {/* Floating badge — job matches */}
                <div className="floating-badge absolute flex top-4 left-[-20px] lg:left-[-100px] floating-ui-badge rounded-xl p-3 items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30 flex-shrink-0">
                    <Target className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold tracking-tight">3 New Matches</p>
                    <p className="text-blue-200/50 text-[10px] font-medium">Based on your profile</p>
                  </div>
                </div>

                {/* Floating badge — resume ready */}
                <div className="floating-badge absolute flex bottom-8 right-[-20px] lg:right-[-100px] floating-ui-badge rounded-xl p-3 items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold tracking-tight">Resume Ready</p>
                    <p className="text-blue-200/50 text-[10px] font-medium">Tailored for this role</p>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM / LEFT — heading + description */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-4 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-blue-100/60 text-sm lg:text-base font-normal leading-relaxed max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
