"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CiLogout } from "react-icons/ci"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export default function DashboardHeader({ name }: { name: string }) {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState<boolean>((localStorage.getItem("minigrader-theme") ?? "light") === "dark")
  const handleLogout = () => {
    localStorage.removeItem("minigrader-token")
    router.push("/login")
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.querySelector("html")?.classList.toggle("dark")
    localStorage.setItem("minigrader-theme", isDarkMode ? "dark" : "light")
  }

  return (
    <div className="flex justify-between">
      <div className="grid h-fit mb-6 gap-y-2">
        <div className="text-3xl">
          Hello, <b>{name}</b>!
        </div>
        <div className="font-light text-sm">What tasks are you going to create today?</div>
      </div>
      <div className="flex align-top gap-x-3">
        <button
          onClick={handleToggleDarkMode}
          className="flex text-gray-500 dark:text-white items-center size-10 justify-center rounded-full
            duration-200 active:bg-gray-500 hover:bg-gray-500 hover:text-white bg-gray-200 dark:bg-black mr-3"
        >
          { isDarkMode ? <MdDarkMode className="size-5" /> : <MdLightMode className="size-5" /> }
        </button>
        <button
          onClick={() => router.push("/task/create")}
          className="flex text-white gap-x-3 bg-black items-center rounded-md px-5
            py-2 duration-200 active:bg-gray-500 h-fit hover:bg-gray-800 hover:shadow-lg"
        >
          Create Task
        </button>
        <button
          onClick={handleLogout}
          className="flex gap-x-3 items-center rounded-md bg-white px-5
            py-2 duration-200 active:bg-gray-100 h-fit hover:shadow-lg"
        >
          <CiLogout />
          Logout
        </button>
      </div>
    </div>
  )
}
