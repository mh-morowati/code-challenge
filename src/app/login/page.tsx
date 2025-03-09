"use client";
import { Button } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("Shanna@melissa.tv");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Save JWT
      localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
      alert(`user ${data.user.name}`)
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center minh-96 mt-10">
      <form onSubmit={handleLogin} className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-zinc-950">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
                  value={email}
                
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3 border-zinc-900"
        />

        <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}
