"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/AuthProvider"
import { Loader2, LogOut, User } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast("Successfully logged out", "success")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast("Failed to logout", "destructive")
    }
  }

  if (loading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Dashboard
          </h1>
          <p className="mt-2 text-slate-300">Welcome to your protected dashboard</p>
        </div>

        <div className="flex items-center justify-center my-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              {user.photoURL ? (
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <User className="h-12 w-12 text-white" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 p-6 rounded-lg space-y-4 border border-slate-600/50">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-slate-400">Email</span>
            <span className="font-medium text-white">{user.email}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-slate-400">User ID</span>
            <span className="font-medium text-sm text-slate-300">{user.uid}</span>
          </div>

          {user.displayName && (
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-slate-400">Name</span>
              <span className="font-medium text-white">{user.displayName}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
