import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('user_email');
  const password = searchParams.get('user_password');
  
  try {
    const response = await fetch(`http://localhost:8000/users/login?user_email=${email}&user_password=${password}`);

    if (!response.ok) {
      // Return error response if backend reports failure
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}