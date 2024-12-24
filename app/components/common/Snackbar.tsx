"use client"

import { MdInfoOutline } from "react-icons/md";
import { useSnackbar } from "./SnackbarProvider";
import { useEffect } from "react";

export default function Snackbar() {
  const { message, setMessage } = useSnackbar()

  useEffect(() => {
    const snackbar = document.getElementById("snackbar")
    snackbar?.classList.toggle("hidden")
    snackbar?.classList.toggle("opacity-0")
    snackbar?.classList.toggle("flex")
    new Promise((resolve, _) => setTimeout(() => {
      snackbar?.classList.toggle("opacity-0")
      // Gotta wait for the animation
      setTimeout(() => resolve(true), 1000)
    }, 5000))
      .then(() => {
        snackbar?.classList.toggle("flex")
        snackbar?.classList.toggle("hidden")
      })
      .then(() => setMessage(null))
      .catch(error => console.log(error))
  }, [message])

  return message && (
    <div
      id="snackbar"
      key={message}
      className={`fixed bottom-0 right-0 m-10 w-fit h-fit cursor-default
      bg-black/80 rounded-md py-3 px-5 gap-x-3 text-white justify-center
      items-center ease-in-out transition-opacity opacity-0 z-100 hidden`}
    >
      <MdInfoOutline />
      { message }
    </div>
  )
}
