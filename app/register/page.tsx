import RegisterForm from "@/components/login/RegisterForm"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin']
})

export default function Login() {
  return (
    <div
      className={`grid grid-cols-1 justify-items-center gap-y-6
        h-screen content-center ${inter.className}`}
    >
      <div className="bg-white drop-shadow-md w-fit h-fit p-6 rounded-lg">
        <RegisterForm />
      </div>
    </div>
  )
}
