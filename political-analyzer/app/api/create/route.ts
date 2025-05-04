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
            user_id: data.user_id,
            prediction: data.prediction,
            authors: data.authors,
            date: data.date,
            publisher: data.publisher,
            url: data.url
        })
      });
      
      const responseData = await response.json();
      return NextResponse.json(responseData);
    } catch (error) {
      console.error("Proxy error:", error);
      return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
  }