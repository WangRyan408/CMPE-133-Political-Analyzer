import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const id = params.get("user_id");
    
    try {
        const response = await fetch(`http://localhost:8000/users/download/${id}`);

        if (!response.ok) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        const data = await response.text();
        return new NextResponse(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename=user_${id}_info.json`
            }
        });
    } catch (error) {
        console.log("Error downloading user data:", error);
        return NextResponse.json({ error: "Download failed" }, { status: 500 });
    }
}