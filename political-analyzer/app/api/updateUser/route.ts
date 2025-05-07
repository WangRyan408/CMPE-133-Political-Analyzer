import { NextRequest, NextResponse } from 'next/server';


export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    try {
      // Get request body data
      const requestData = await request.json();
      
      const response = await fetch(`http://localhost:8000/users/update?user_id=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("Proxy Error:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
  }

  export async function DELETE(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const id = params.get("user_id");

    try {
      const response = await fetch(`http://localhost:8000/users/delete/${id}`, {
        method: 'DELETE', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const data = response.json();
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: "Account deletion failed" }, { status: 500 });
    }

  }