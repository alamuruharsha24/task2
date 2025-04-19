"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ToastProvider = React.createContext<{
  toast: (message: string, variant?: "default" | "destructive" | "success") => void
}>({
  toast: () => {},
})

export const useToast = () => React.useContext(ToastProvider)

const toastVariants = cva(
  "fixed bottom-4 right-4 z-50 flex items-center justify-between gap-2 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 border-gray-200",
        destructive: "bg-red-50 text-red-900 border-red-200",
        success: "bg-green-50 text-green-900 border-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  message: string
  onClose: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, message, onClose, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    )
  },
)
Toast.displayName = "Toast"

export interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastContainer({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<
    Array<{ id: string; message: string; variant?: "default" | "destructive" | "success" }>
  >([])

  const toast = React.useCallback((message: string, variant?: "default" | "destructive" | "success") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, variant }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastProvider.Provider value={{ toast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          style={{
            bottom: `${index * 70 + 16}px`,
            opacity: 1,
            transform: "translateX(0)",
          }}
        />
      ))}
    </ToastProvider.Provider>
  )
}
