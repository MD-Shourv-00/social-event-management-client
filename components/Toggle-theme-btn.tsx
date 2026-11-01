"use client"

import { MoonIcon, SunMediumIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ToggleThemeBtn() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <MoonIcon/> : <SunMediumIcon />}
    </button>
  )
}
