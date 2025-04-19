"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/toast"
import { FcGoogle } from "react-icons/fc"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
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

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 1

    // Contains number
    if (/\d/.test(password)) strength += 1

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }, [password])

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 4) return "Medium"
    return "Strong"
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-slate-600"
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (passwordStrength < 3) {
      setError("Please use a stronger password")
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast("Account created successfully!", "success")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Signup error:", error)

      // Handle specific error codes
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already exists. Please use a different email or login.")
          break
        case "auth/invalid-email":
          setError("Invalid email address. Please check your email.")
          break
        case "auth/weak-password":
          setError("Password is too weak. Please use a stronger password.")
          break
        default:
          setError(error.message || "Failed to create an account")
      }

      toast("Sign up failed", "destructive")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError("")
    setLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)
      toast("Account created successfully with Google!", "success")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Google signup error:", error)
      setError(error.message || "Failed to sign up with Google")
      toast("Google sign up failed", "destructive")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Create an account
          </h1>
          <p className="mt-2 text-slate-300">Sign up to get started</p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-500/20 border-red-500 animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
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
            {password && (
              <div className="mt-1">
                <div className="flex justify-between items-center">
                  <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs ml-2 min-w-16 text-right ${
                      passwordStrength <= 2
                        ? "text-red-400"
                        : passwordStrength <= 4
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {getStrengthLabel()}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="group">
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`bg-slate-700/50 border-slate-600 text-white h-14 pt-4 peer focus:border-indigo-500 focus:ring-indigo-500 ${password !== confirmPassword && confirmPassword ? "border-red-500" : ""}`}
                placeholder=" "
              />
              <Label
                htmlFor="confirm-password"
                className="absolute left-3 top-4 text-slate-400 transition-all duration-200 peer-focus:text-sm peer-focus:top-2 peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:top-2"
              >
                Confirm Password
              </Label>
            </div>
            {password !== confirmPassword && confirmPassword && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-600/20"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {loading ? "Creating account..." : "Sign Up"}
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
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
