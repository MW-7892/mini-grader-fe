'use client'

import LoginForm from "@/components/login/LoginForm"
import { Inter } from "next/font/google"
import { useRouter } from "next/navigation"

const inter = Inter({
  subsets: ['latin']
})

export default function Login() {
  const router = useRouter()

  return (
    <div
      className={`grid grid-cols-1 justify-items-center gap-y-6
        h-screen content-center ${inter.className}`}
    >
      <div className="bg-white drop-shadow-md w-fit h-fit p-6 rounded-lg">
        <LoginForm />
      </div>
      <div className="text-sm gap-x-3">
        <span className="text-gray-600"> Don't have an account? </span>
        <span
          onClick={() => router.push('/register')}
          className="font-bold underline hover:text-blue-500 hover:cursor-pointer"
        >
          Register now!
        </span>
      </div>
    </div>
  )
}
