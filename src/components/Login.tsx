"use client"
import { Alert } from "@mui/material"
import { useState } from "react"


const Login = () => {

  const [email, setEmail] = useState("Shanna@melissa.tv")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.message || "Login failed")

            localStorage.setItem("token", data.token)
            alert(`Welcome, ${data.user.name}!`)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unknown error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

  return (
    <form
      onSubmit={handleLogin}
      className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-sm mx-auto dark:text-zinc-950"
    >
          <h1 className="text-2xl font-bold mb-4 text-zinc-950 dark:text-white">
              
              Login
          
          </h1>

          {
              error && <Alert severity="error" className="mb-3">
              
              {error}
              
          </Alert>
          }

          <input
        className="w-full border p-2 border-zinc-700 rounded mb-5 text-zinc-950"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
          />

          <button
        className="w-full bg-blue-500 p-2 text-lg rounded cursor-pointer"
        type="submit"
        color="primary"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

export default Login
