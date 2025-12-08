"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    // Check if the View Transitions API is supported
    if (document.startViewTransition) {
      // Get the click position
      const x = event.clientX
      const y = event.clientY

      // Get the distance to the farthest corner
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Start the transition
      document.startViewTransition(() => {
        // This is where the DOM update happens
        setTheme(newTheme);
      }).ready.then(() => {
        // Animate the root element's clip-path
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0% at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            // Specify the pseudo-element for the animation
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      setTheme(newTheme);
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}