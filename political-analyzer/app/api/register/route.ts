import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const response = await fetch("http://localhost:8000/users/register", {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        secret_key: data.secret_key
      })
    });
    
    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}