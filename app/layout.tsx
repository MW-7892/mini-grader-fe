import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import ApolloWrapper from "@/components/common/ApolloWrapper"
import AuthProvider from "./components/common/auth/AuthProvider"
import { ReactNode } from "react"
import SnackbarProvider from "./components/common/SnackbarProvider"
import Snackbar from "./components/common/Snackbar"
import DarkModeWrapper from "./components/common/DarkModeWrapper"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Mini Grader",
  description: "An auto online judge with a quick setup",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <DarkModeWrapper>
            <SnackbarProvider>
              <ApolloWrapper>{children}</ApolloWrapper>
              <Snackbar />
            </SnackbarProvider>
          </DarkModeWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
