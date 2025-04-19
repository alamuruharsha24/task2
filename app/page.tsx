import Link from "next/link"
import { Button } from "@/components/ui/button"
import SystemDiagram from "@/components/system-diagram"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Welcome
          </h1>
          <p className="mt-3 text-lg text-slate-300">Next.js application with Firebase authentication</p>
        </div>
        <div className="flex flex-col space-y-4 mt-8">
          <Button
            asChild
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-600/20"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full h-12 border-slate-600 bg-slate-700/50 hover:bg-slate-600/50 text-white transition-colors"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
         
        </div>
      </div>
    </div>
  )
}
