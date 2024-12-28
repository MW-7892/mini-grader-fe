"use client"

import { MdInfoOutline } from "react-icons/md";
import { useSnackbar } from "./SnackbarProvider";
import { useEffect } from "react";
import { setTimeout } from "timers";

export default function Snackbar() {
  const { message, setMessage } = useSnackbar()

  useEffect(() => {
    if (!message) return

    const snackbar = document.getElementById("snackbar")
    new Promise((resolve, _) => {
      snackbar?.classList.toggle("-translate-y-32")
      setTimeout(() => resolve(true), 4000)
    })
      .then(() => new Promise((resolve, _) => {
        snackbar?.classList.toggle("-translate-y-32")
        setTimeout(() => resolve(true), 1000)
      }))
      .then(() => setMessage(null))
      .catch(error => console.log(error))
  }, [message])

  return message && (
    <div
      id="snackbar"
      key={message}
      className={`fixed top-0 left-1/2 translate-x-[-50%] m-10 w-fit h-fit
        cursor-default -translate-y-32 flex
        bg-black/80 rounded-md py-3 px-5 gap-x-3 text-white justify-center
        items-center duration-200 ease-in-out z-100`}
    >
      <MdInfoOutline />
      { message }
    </div>
  )
}
