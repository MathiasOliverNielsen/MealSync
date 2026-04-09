import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch recipes" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
