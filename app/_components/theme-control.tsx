"use client";

import { useEffect } from "react";

type ThemeMode = "auto" | "light" | "dark";

const themeModes: readonly ThemeMode[] = ["auto", "light", "dark"];

function isThemeMode(value: string | null): value is ThemeMode {
  return value !== null && themeModes.includes(value as ThemeMode);
}

function applyTheme(mode: ThemeMode) {
  const isDark =
    mode === "dark" ||
    (mode === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  document.documentElement.dataset.themeMode = mode;
}

export function ThemeControl({
  locale,
  label,
}: {
  locale: "zh-CN" | "en";
  label: string;
}) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if (document.documentElement.dataset.themeMode === "auto") {
        applyTheme("auto");
      }
    };

    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  function cycleTheme() {
    const storedMode = window.localStorage.getItem("starlight-theme");
    const mode = isThemeMode(storedMode) ? storedMode : "auto";
    const currentIndex = themeModes.indexOf(mode);
    const nextMode = themeModes[(currentIndex + 1) % themeModes.length] ?? "auto";
    window.localStorage.setItem("starlight-theme", nextMode);
    applyTheme(nextMode);
  }

  return (
    <button
      className="theme-control"
      type="button"
      aria-label={label}
      title={label}
      onClick={cycleTheme}
    >
      <span aria-hidden="true">◐</span>
      <span>{locale === "zh-CN" ? "主题" : "Theme"}</span>
    </button>
  );
}
