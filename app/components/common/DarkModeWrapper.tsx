"use client"

import { PropsWithChildren, useEffect } from "react";

export default function DarkModeWrapper({ children }: PropsWithChildren) {
  useEffect(() => {
    const htmlClass = document.querySelector("html")?.classList
    const currentTheme = localStorage.getItem("minigrader-theme")
    if (currentTheme === "dark") htmlClass?.add("dark")
  }, [])

  return <>{ children }</>
} 
