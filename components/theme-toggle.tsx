'use client'

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="font-mono text-sm"
    >
      {theme === "light" ? "DARK" : "LIGHT"}
    </Button>
  )
}

