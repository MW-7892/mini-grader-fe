import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloWrapper from "@/components/common/ApolloWrapper";
import AuthProvider from "./components/common/auth/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mini Grader",
  description: "An auto online judge with a quick setup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ApolloWrapper>
            { children }
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
