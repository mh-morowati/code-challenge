import { NextResponse } from "next/server";
import { User } from "./types";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Fetch users from the API
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await res.json();

    // Find user with matching email
    const user = users.find((u) => u.email === email);

    if (user) {
      // Simulate a JWT token (since jsonplaceholder doesn't provide one)
      const fakeToken = `fake-jwt-token-${user.id}`;
      
      return NextResponse.json({ token: fakeToken, user }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }
  } catch (error) {
      console.error(error)
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
