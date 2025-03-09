import { ApiService } from "@/services/Services"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    const users = await ApiService.getUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      token: `fake-jwt-token-${user.id}`, 
      user: { id: user.id, name: user.name, email: user.email } 
    })

  } catch (error) {
    console.error("Login API Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
