import React from "react"
import { DialogPanel, DialogTitle, Dialog as HeadlessUIDialog } from "@headlessui/react"
import { Inter } from "next/font/google"
import { IoClose } from "react-icons/io5"

const inter = Inter({
  subsets: ["latin"],
})

export default function Dialog({
  isOpen = false,
  onClose,
  title,
  children,
}: {
  isOpen?: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <HeadlessUIDialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className={`flex fixed inset-0 w-screen h-screen ${inter.className}`}
    >
      <div className="w-full h-full bg-black/60 backdrop-blur-40 flex z-[998] justify-center items-center">
        <DialogPanel className="min-w-fit w-1/3 h-fit rounded-lg z-[999] bg-white p-5">
          <div className="border border-transparent h-full border-b-gray-300 mb-4 pb-3 flex justify-between">
            <DialogTitle as="h3" className="text-xl font-semibold">
              {title}
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-600 rounded-full hover:bg-gray-200 text-xl w-6 h-6
                self-center flex justify-center items-center duration-200"
            >
              <IoClose />
            </button>
          </div>
          <div>{children}</div>
        </DialogPanel>
      </div>
    </HeadlessUIDialog>
  )
}
