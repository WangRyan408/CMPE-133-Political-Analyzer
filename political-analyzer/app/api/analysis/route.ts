import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const response = await fetch("http://localhost:8000/articles/analyze", {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: data.url
            })
          });

          const responseData = await response.json();
          return NextResponse.json(responseData);
    } catch (error) {
        console.error("Failed to process article", error);
        return NextResponse.json({error: "Article Analysis failed"}, { status: 500 });
    }


}

