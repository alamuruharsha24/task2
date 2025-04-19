"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export default function DynamicBackground() {
  const [isClient, setIsClient] = useState(false)
  const pointerRef = useRef({ x: 0, y: 0 })
  const gradientRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()

  // Track mouse/touch position
  const handlePointerMove = useCallback((e: PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  // Animation loop with smooth transition
  const animate = useCallback(() => {
    if (gradientRef.current) {
      const { x, y } = pointerRef.current
      gradientRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    requestRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    setIsClient(true)

    // Start animation
    requestRef.current = requestAnimationFrame(animate)

    // Add pointer event listener
    window.addEventListener("pointermove", handlePointerMove)

    // Set initial position to center of screen
    if (typeof window !== "undefined") {
      pointerRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
    }

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [animate, handlePointerMove])

  if (!isClient) {
    return <div className="fixed inset-0 z-0 bg-black" />
  }

  return (
    <>
      {/* Base background - darker black/blue gradient like in the image */}
      <div className="fixed inset-0 z-0 bg-black" />

      {/* Animated gradient that follows cursor - using the vibrant purple/blue colors from the image */}
      <div
        ref={gradientRef}
        className="w-[200vmax] h-[200vmax] absolute top-[-100vmax] left-[-100vmax] opacity-80 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(88, 28, 255, 0.8) 0%, rgba(120, 41, 255, 0.5) 20%, rgba(76, 29, 149, 0.3) 40%, rgba(0, 0, 0, 0) 70%)",
          mixBlendMode: "screen",
          transition: "transform 0.05s ease-out",
        }}
      />

      {/* Secondary static gradient for more depth */}
      <div 
        className="fixed inset-0 z-0 opacity-90 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 50%, rgba(88, 28, 255, 0.4) 0%, rgba(0, 0, 0, 0) 50%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Additional subtle vignette effect */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px rgba(0, 0, 0, 0.8)",
        }}
      />
      
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  )
}