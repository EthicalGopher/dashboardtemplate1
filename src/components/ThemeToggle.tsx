"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../lib/utils";

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";
export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    case "top-center":
      return { cx: "20", cy: "0" };
    case "bottom-center":
      return { cx: "20", cy: "40" };
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return { cx: "20", cy: "20" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const positionCoords = getPositionCoords(start);
    if (!positionCoords) return;
    const { cx, cy } = positionCoords;
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === "center") return;
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  if (!positionCoords) return;
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left": return "top left";
    case "top-right": return "top right";
    case "bottom-left": return "bottom left";
    case "bottom-right": return "bottom right";
    case "top-center": return "top center";
    case "bottom-center": return "bottom center";
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left": return "center";
    default: return "center";
  }
};

const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === "rectangle") {
    const getClipPath = (direction: AnimationStart) => {
      switch (direction) {
        case "bottom-up":
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-down":
          return {
            from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "left-right":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "right-left":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-left":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-right":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "bottom-left":
          return {
            from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "bottom-right":
          return {
            from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        default:
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
      }
    };

    const clipPath = getClipPath(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    };
  }

  // Default circle-at-center
  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light${blur ? "-blur" : ""} {
        from {
           clip-path: circle(0% at 50% 50%);
           ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
  };
};

export const ThemeToggle = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;
    const styleId = "theme-transition-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const animation = createAnimation(variant, start, blur);
    updateStyles(animation.css);

    const switchTheme = () => {
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  }, [resolvedTheme, setTheme, variant, start, blur, updateStyles]);

  return (
    <button
      type="button"
      className={cn(
        "size-10 cursor-pointer rounded-full bg-surface-container-lowest p-1.5 transition-all duration-300 active:scale-95 ambient-shadow hover:bg-primary group",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            className={cn("fill-on-surface group-hover:fill-white transition-colors")}
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            className={cn("fill-on-surface group-hover:fill-white transition-colors")}
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          className={cn("fill-on-surface group-hover:fill-white transition-colors")}
        />
      </svg>
    </button>
  );
};
