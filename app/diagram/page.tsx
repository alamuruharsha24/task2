import SystemDiagram from "@/components/system-diagram"

export default function DiagramPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          System Architecture
        </h1>
        <SystemDiagram />
      </div>
    </div>
  )
}
