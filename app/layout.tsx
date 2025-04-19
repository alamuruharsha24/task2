import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import DynamicBackground from "@/components/DynamicBackground"
import { AuthProvider } from "@/components/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js Firebase Auth",
  description: "Next.js application with Firebase authentication",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DynamicBackground />
          <main className="relative z-10">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'