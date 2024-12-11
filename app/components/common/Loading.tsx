import { Sofia_Sans } from "next/font/google"
import { FaSpinner } from "react-icons/fa6"

const sofiaSans = Sofia_Sans({
  subsets: ['latin'],
  weight: ['400']
})

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-x-4">
      <FaSpinner className="animate-spin text-3xl" />
      <span className={`${sofiaSans.className} text-xl`}>Loading...</span>
    </div>
  )
}
