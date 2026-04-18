"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { 
  AlertCircle, 
  FileJson,
  CheckCircle2,
  ShieldAlert,
  Database
} from 'lucide-react'
import { api } from "../../lib/api" 

// --- UI COMPONENTS ---
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary',
  size?: 'default' | 'sm' | 'lg' | 'icon'
}>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-bold uppercase tracking-wide ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-orange-600 text-white hover:bg-zinc-900 shadow-sm",
      secondary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
      outline: "border border-zinc-300 bg-transparent hover:bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
      ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-50",
      destructive: "bg-red-600 text-white hover:bg-red-700"
    }
    const sizes = { default: "h-10 px-4 py-2", sm: "h-8 rounded-sm px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10" }
    return <button ref={ref} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`} {...props} />
  }
)
Button.displayName = "Button"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`bg-white dark:bg-zinc-900 rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-950 dark:text-zinc-50 ${className || ""}`} {...props} />
  )
)
Card.displayName = "Card"

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" | "success" }>(
  ({ className, variant = "default", ...props }, ref) => (
    <div ref={ref} role="alert" className={`relative w-full rounded-sm border p-4 pl-12 ${
        variant === "destructive" ? "border-red-500/50 text-red-600 bg-red-50 dark:bg-red-900/10" : 
        variant === "success" ? "border-emerald-500/50 text-emerald-900 bg-emerald-50 dark:bg-emerald-900/10" : 
        "bg-zinc-100"
      } ${className || ""}`} {...props} />
  )
)
Alert.displayName = "Alert"

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDark])
  return (
    <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full border border-zinc-200 dark:border-zinc-800">
      {isDark ? "🌙" : "☀️"}
    </Button>
  )
}

// --- MAIN COMPONENT ---

export default function AdminDashboard() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false) 

  // Vector Store Ingestion States
  const [isVectorStoreUploading, setIsVectorStoreUploading] = useState(false)
  const [vectorStoreProgress, setVectorStoreProgress] = useState(0)
  const [vectorStoreStatusMsg, setVectorStoreStatusMsg] = useState("")
  
  // Alert States
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Security Check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.user.getProfile().catch(() => null);
        if (user && user.role === 'admin') setAuthorized(true);
        else router.push("/");
      } catch (e) { router.push("/login"); }
    };
    checkAuth();
  }, [router]);

  // --- VECTOR STORE FILE INGESTION HANDLER ---
  const handleVectorStoreFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const fileName = file.name.toLowerCase()
    if (!fileName.endsWith(".json") && !fileName.endsWith(".csv") && !fileName.endsWith(".parquet")) {
      setErrorMessage("Only JSON, CSV, or Parquet files are allowed for vector store ingestion.")
      return
    }

    setErrorMessage("")
    setSuccessMessage("")
    setIsVectorStoreUploading(true)
    setVectorStoreProgress(0)
    setVectorStoreStatusMsg("Uploading file...")

    try {
      const result = await api.vectorStore.ingestFile(file)

      if (result.details.success) {
        setVectorStoreProgress(100)
        setVectorStoreStatusMsg("Complete")
        setSuccessMessage(`Successfully ingested ${result.details.ingested} document(s) to the vector store.`)
      } else {
        setErrorMessage(`Ingestion failed: ${result.details.errors?.join(", ") || "Unknown error"}`)
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to ingest file to vector store")
    } finally {
      setIsVectorStoreUploading(false)
      event.target.value = ""
    }
  }

  if (!authorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-zinc-500">
          <ShieldAlert className="h-12 w-12 animate-pulse" />
          <p>Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col p-4 md:p-8 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-sans">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 text-zinc-900 dark:text-white pointer-events-none"
        style={{ backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Header */}
      <div className="relative z-10 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push("/")} className="inline-flex">Back</Button>
          <div className="text-center mx-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Data Management</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Alerts */}
      {errorMessage && (
        <Alert variant="destructive" className="mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 absolute left-4" />
          <span className="ml-2 font-medium">{errorMessage}</span>
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" className="mb-6 flex items-center">
          <CheckCircle2 className="h-5 w-5 absolute left-4" />
          <span className="ml-2 font-medium">{successMessage}</span>
        </Alert>
      )}

      {/* Upload Section */}
      <div className="grid md:grid-cols-1 gap-6 mb-8 relative z-10">
        <Card className={`group relative overflow-hidden transition-all duration-300 ${isVectorStoreUploading ? 'border-blue-500 ring-1 ring-blue-500' : 'hover:border-blue-500'}`}>
          <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${isVectorStoreUploading ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-600'}`} />
          <div className="p-6 md:p-8 pl-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white uppercase">Vector Store Ingest</h2>
            </div>

            <div className="space-y-4">
              {/* File Input */}
              <label className="block">
                <div className={`relative border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${isVectorStoreUploading ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-zinc-300 hover:border-blue-500'}`}>
                  <input type="file" accept=".json,.csv,.parquet" onChange={handleVectorStoreFileUpload} disabled={isVectorStoreUploading} className="hidden" />
                  <FileJson className={`w-12 h-12 mx-auto mb-3 transition-colors ${isVectorStoreUploading ? 'text-blue-500 animate-pulse' : 'text-zinc-400 group-hover:text-blue-500'}`} />
                  <p className="font-bold uppercase text-sm mb-1">{isVectorStoreUploading ? "Processing..." : "JSON, CSV, Parquet"}</p>
                  <p className="text-xs text-zinc-500">Click to upload or drag files</p>
                </div>
              </label>

              {/* Progress */}
              {isVectorStoreUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase">
                    <span>{vectorStoreStatusMsg}</span>
                    <span className="text-blue-600">{Math.round(vectorStoreProgress)}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${vectorStoreProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}