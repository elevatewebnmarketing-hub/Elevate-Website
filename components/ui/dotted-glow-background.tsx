"use client";

import React, { useEffect, useRef, useState } from "react";

type Variant = "light" | "dark" | "auto";

type DottedGlowBackgroundProps = {
  className?: string;
  variant?: Variant;
  /** distance between dot centers in pixels */
  gap?: number;
  /** base radius of each dot in CSS px */
  radius?: number;
  /** dot color (will pulse by alpha) */
  color?: string;
  /** optional dot color for dark mode */
  darkColor?: string;
  /** shadow/glow color for bright dots */
  glowColor?: string;
  /** optional glow color for dark mode */
  darkGlowColor?: string;
  /** optional CSS variable name for light dot color (e.g. --color-zinc-900) */
  colorLightVar?: string;
  /** optional CSS variable name for dark dot color (e.g. --color-zinc-100) */
  colorDarkVar?: string;
  /** optional CSS variable name for light glow color */
  glowColorLightVar?: string;
  /** optional CSS variable name for dark glow color */
  glowColorDarkVar?: string;
  /** global opacity for the whole layer */
  opacity?: number;
  /** background radial fade opacity (0 = transparent background) */
  backgroundOpacity?: number;
  /** minimum per-dot speed in rad/s */
  speedMin?: number;
  /** maximum per-dot speed in rad/s */
  speedMax?: number;
  /** global speed multiplier for all dots */
  speedScale?: number;
};

const VARIANT_PRESETS: Record<
  Variant,
  { color?: string; darkColor?: string; glowColor?: string; darkGlowColor?: string }
> = {
  light: {
    color: "rgba(11,31,58,0.5)",
    glowColor: "rgba(79,156,249,0.7)",
  },
  dark: {
    darkColor: "rgba(241,245,249,0.5)",
    darkGlowColor: "rgba(79,156,249,0.6)",
  },
  auto: {
    color: "rgba(11,31,58,0.55)",
    glowColor: "rgba(79,156,249,0.7)",
    darkColor: "rgba(226,232,240,0.35)",
    darkGlowColor: "rgba(79,156,249,0.5)",
  },
};

export const DottedGlowBackground = ({
  className,
  variant = "auto",
  gap = 12,
  radius = 2,
  color: colorProp,
  darkColor: darkColorProp,
  glowColor: glowColorProp,
  darkGlowColor: darkGlowColorProp,
  colorLightVar,
  colorDarkVar,
  glowColorLightVar,
  glowColorDarkVar,
  opacity = 0.6,
  backgroundOpacity = 0,
  speedMin = 0.4,
  speedMax = 1.3,
  speedScale = 1,
}: DottedGlowBackgroundProps) => {
  const preset = VARIANT_PRESETS[variant];
  const color = colorProp ?? preset.color ?? "rgba(0,0,0,0.7)";
  const darkColor = darkColorProp ?? preset.darkColor;
  const glowColor = glowColorProp ?? preset.glowColor ?? "rgba(0, 170, 255, 0.85)";
  const darkGlowColor = darkGlowColorProp ?? preset.darkGlowColor;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resolvedColor, setResolvedColor] = useState<string>(color);
  const [resolvedGlowColor, setResolvedGlowColor] = useState<string>(glowColor);

  const resolveCssVariable = (
    el: Element,
    variableName?: string
  ): string | null => {
    if (!variableName) return null;
    const normalized = variableName.startsWith("--")
      ? variableName
      : `--${variableName}`;
    const fromEl = getComputedStyle(el as Element)
      .getPropertyValue(normalized)
      .trim();
    if (fromEl) return fromEl;
    const root = document.documentElement;
    const fromRoot = getComputedStyle(root).getPropertyValue(normalized).trim();
    return fromRoot || null;
  };

  const detectDarkMode = (): boolean => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) return true;
    if (root.classList.contains("light")) return false;
    return (
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  useEffect(() => {
    const container = containerRef.current ?? document.documentElement;

    const compute = () => {
      if (variant === "light") {
        setResolvedColor(color);
        setResolvedGlowColor(glowColor);
        return;
      }
      if (variant === "dark") {
        setResolvedColor(darkColor ?? color);
        setResolvedGlowColor(darkGlowColor ?? glowColor);
        return;
      }

      const isDark = detectDarkMode();

      let nextColor: string = color;
      let nextGlow: string = glowColor;

      if (isDark) {
        const varDot = resolveCssVariable(container, colorDarkVar);
        const varGlow = resolveCssVariable(container, glowColorDarkVar);
        nextColor = varDot || darkColor || nextColor;
        nextGlow = varGlow || darkGlowColor || nextGlow;
      } else {
        const varDot = resolveCssVariable(container, colorLightVar);
        const varGlow = resolveCssVariable(container, glowColorLightVar);
        nextColor = varDot || nextColor;
        nextGlow = varGlow || nextGlow;
      }

      setResolvedColor(nextColor);
      setResolvedGlowColor(nextGlow);
    };

    compute();

    const mql = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
    const handleMql = () => compute();
    mql?.addEventListener?.("change", handleMql);

    const mo = new MutationObserver(() => compute());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      mql?.removeEventListener?.("change", handleMql);
      mo.disconnect();
    };
  }, [
    variant,
    color,
    darkColor,
    glowColor,
    darkGlowColor,
    colorLightVar,
    colorDarkVar,
    glowColorLightVar,
    glowColorDarkVar,
  ]);

  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let isVisible = true;

    const dpr = Math.min(Math.max(1, window.devicePixelRatio || 1), 2);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(width * dpr));
      el.height = Math.max(1, Math.floor(height * dpr));
      el.style.width = `${Math.floor(width)}px`;
      el.style.height = `${Math.floor(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let dots: { x: number; y: number; phase: number; speed: number }[] = [];

    const regenDots = () => {
      dots = [];
      const { width, height } = container.getBoundingClientRect();
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const min = Math.min(speedMin, speedMax);
      const max = Math.max(speedMin, speedMax);
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * gap + (j % 2 === 0 ? 0 : gap * 0.5);
          const y = j * gap;
          const phase = Math.random() * Math.PI * 2;
          const span = Math.max(max - min, 0);
          const speed = min + Math.random() * span;
          dots.push({ x, y, phase, speed });
        }
      }
    };

    regenDots();

    let last = performance.now();

    const draw = (now: number) => {
      if (stopped) return;
      if (!isVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;
      const { width, height } = container.getBoundingClientRect();

      ctx.clearRect(0, 0, el.width, el.height);
      ctx.globalAlpha = opacity;

      if (backgroundOpacity > 0) {
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.4,
          Math.min(width, height) * 0.1,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.7
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(
          1,
          `rgba(0,0,0,${Math.min(Math.max(backgroundOpacity, 0), 1)})`
        );
        ctx.fillStyle = grad as unknown as CanvasGradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.fillStyle = resolvedColor;

      const time = (now / 1000) * Math.max(speedScale, 0);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const mod = (time * d.speed + d.phase) % 2;
        const lin = mod < 1 ? mod : 2 - mod;
        const a = 0.25 + 0.55 * lin;

        if (a > 0.6) {
          const glow = (a - 0.6) / 0.4;
          ctx.shadowColor = resolvedGlowColor;
          ctx.shadowBlur = 6 * glow;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = a * opacity;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      regenDots();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    window.addEventListener("resize", handleResize);
    raf = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      ro.disconnect();
    };
  }, [
    gap,
    radius,
    resolvedColor,
    resolvedGlowColor,
    opacity,
    backgroundOpacity,
    speedMin,
    speedMax,
    speedScale,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
};
