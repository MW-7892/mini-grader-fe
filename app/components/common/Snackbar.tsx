"use client"

import { MdInfoOutline } from "react-icons/md";
import { useSnackbar } from "./SnackbarProvider";
import { useEffect } from "react";

export default function Snackbar() {
  const { message, setMessage } = useSnackbar()

  useEffect(() => {
    const snackbar = document.getElementById("snackbar")
    snackbar?.classList.toggle("opacity-0")
    new Promise(() => setTimeout(() => {
      snackbar?.classList.toggle("opacity-0")
    }, 5000))
      .then(() => setMessage(null))
  }, [message])

  return message && (
    <div
      id="snackbar"
      key={message}
      className={`fixed bottom-0 right-0 m-10 z-100 w-fit h-fit
      bg-black/80 rounded-md py-3 px-5 gap-x-3 text-white justify-center
      items-center ease-in-out flex transition-opacity opacity-0`}
    >
      <MdInfoOutline />
      { message }
    </div>
  )
}
