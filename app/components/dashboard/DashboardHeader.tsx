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
      <div>
        <button
          onClick={handleLogout}
          className="flex gap-x-3 items-center rounded-md hover:bg-gray-100 px-5
            py-2 duration-200 active:bg-white"
        >
          <CiLogout />
          Logout
        </button>
      </div>
    </div>
  )
}
