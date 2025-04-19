"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/toast"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast("Successfully logged in!", "success")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)

      // Handle specific error codes
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          setError("Invalid credentials. Please check your email and password.")
          break
        case "auth/user-not-found":
          setError("Account not found. Please check your email or sign up.")
          break
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.")
          break
        default:
          setError(error.message || "Failed to login")
      }

      toast("Login failed", "destructive")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)
      toast("Successfully logged in with Google!", "success")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Google login error:", error)
      setError(error.message || "Failed to login with Google")
      toast("Google login failed", "destructive")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-300">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-500/20 border-red-500 animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="group">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`bg-slate-700/50 border-slate-600 text-white h-14 pt-4 peer focus:border-indigo-500 focus:ring-indigo-500 ${error.includes("email") ? "border-red-500" : ""}`}
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

          <div className="relative">
            <div className="group">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`bg-slate-700/50 border-slate-600 text-white h-14 pt-4 peer focus:border-indigo-500 focus:ring-indigo-500 ${error.includes("password") ? "border-red-500" : ""}`}
                placeholder=" "
              />
              <Label
                htmlFor="password"
                className="absolute left-3 top-4 text-slate-400 transition-all duration-200 peer-focus:text-sm peer-focus:top-2 peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:top-2"
              >
                Password
              </Label>
            </div>
            <div className="flex justify-end mt-1">
              <Link href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-600/20"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-600 w-full"></div>
            <span className="bg-transparent px-2 text-slate-400 text-sm">or</span>
            <div className="border-t border-slate-600 w-full"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-slate-600 bg-slate-700/50 hover:bg-slate-600/50 text-white transition-colors flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-slate-300">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
