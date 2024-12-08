'use client'

import { Inter, Sofia_Sans } from "next/font/google"
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ['latin']
})

const sofiaSans = Sofia_Sans({
  subsets: ['latin']
})

export default function Home() {
  const router = useRouter()


  return (
    <div
      className={`grid grid-cols-1 justify-items-center gap-y-16
        h-screen content-center ${inter.className}`}
    >
      <div className="row text-center">
        <div
          className={`text-[96px] h-fit font-bold ${sofiaSans.className}`}
        >
          Mini Grader
        </div>
        <div className="text-lg">Quickly generate programming problems</div>
      </div>
      <div className="row flex gap-x-6">
        <button
          disabled={true}
          className="rounded-full bg-transparent border border-gray-300 w-[160px]
            py-2 font-light text-lg tracking-wider text-gray-400"
        >
          Try a demo
        </button>
        <button
          onClick={() => router.push('/login')}
          className="rounded-full bg-black text-white w-[160px] py-2 font-light text-lg
            tracking-wider hover:bg-black/10 hover:text-black active:bg-transparent duration-300"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
