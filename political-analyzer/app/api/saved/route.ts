import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skip = searchParams.get('skip');
  const limit = searchParams.get('limit');
  const userId = searchParams.get('user_id');

  try {
    const response = await fetch(`http://localhost:8000/articles/?skip=${skip}&limit=${limit}&user_id=${userId}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}