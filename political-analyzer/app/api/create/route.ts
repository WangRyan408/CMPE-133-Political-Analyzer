import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    try {
      const data = await request.json();
      
      const response = await fetch("http://localhost:8000/articles/create", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data.title,
            source: data.source,
            url: data.url,
            date: data.date,
            leaning: data.leaning,
            content: data.content,
            user_id: data.id
        })
      });
      
      const responseData = await response.json();
      return NextResponse.json(responseData);
    } catch (error) {
      console.error("Proxy error:", error);
      return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
  }