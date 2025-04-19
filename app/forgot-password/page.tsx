"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
      toast("Password reset email sent!", "success")
    } catch (error: any) {
      console.error("Password reset error:", error)

      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address.")
          break
        case "auth/invalid-email":
          setError("Invalid email address. Please check your email.")
          break
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.")
          break
        default:
          setError(error.message || "Failed to send password reset email")
      }

      toast("Password reset failed", "destructive")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Reset Password
          </h1>
          <p className="mt-2 text-slate-300">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-500/20 border-red-500 animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <div className="space-y-6">
            <Alert className="bg-green-500/20 border-green-500">
              <AlertDescription>Password reset email sent! Check your inbox for further instructions.</AlertDescription>
            </Alert>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
            >
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="group">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white h-14 pt-4 peer focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder=" "
                />
                <Label
                  htmlFor="email"
                  className="absolute left-3 top-4 text-slate-400 transition-all duration-200 peer-focus:text-sm peer-focus:top-2 peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:top-2"
                >
                  Email
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-600/20"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              {loading ? "Sending..." : "Reset Password"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
