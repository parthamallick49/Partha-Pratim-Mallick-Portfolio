"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    if (typeof document !== "undefined" && (document as any).startViewTransition) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      (document as any).startViewTransition(() => {
        setTheme(nextTheme);
      }).ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0% at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTheme(nextTheme);
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 rounded-full text-[#1C1B18] dark:text-[#F3E9D2] hover:bg-[#E6DBC2] dark:hover:bg-[#204E4D]"
        aria-label="Toggle palette theme"
      >
        <span className="w-4 h-4 rounded-full bg-current opacity-60" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full text-[#1C1B18] dark:text-[#F3E9D2] hover:bg-[#E6DBC2] dark:hover:bg-[#204E4D] transition-colors"
      title={isDark ? "Switch to Smoked Vanilla (Light)" : "Switch to Rusted Teal (Dark)"}
      aria-label="Toggle palette theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-[#C84630]" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-[#FAF6EC]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
