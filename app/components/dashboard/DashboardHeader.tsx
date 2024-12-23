"use client"

import { useRouter } from "next/navigation"
import { CiLogout } from "react-icons/ci"

export default function DashboardHeader({ name }: { name: string }) {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("minigrader-token")
    router.push("/login")
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
