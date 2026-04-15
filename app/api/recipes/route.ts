import { NextResponse } from "next/server";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    switch (type) {
      case "search": {
        const query = searchParams.get("s");
        const response = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query || "")}`);
        const data = await response.json();
        return NextResponse.json(data);
      }
      case "random": {
        const response = await fetch(`${API_BASE}/random.php`);
        const data = await response.json();
        return NextResponse.json(data);
      }
      case "filter": {
        const cat = searchParams.get("c");
        const area = searchParams.get("a");
        const url = cat ? `${API_BASE}/filter.php?c=${encodeURIComponent(cat)}` : `${API_BASE}/filter.php?a=${encodeURIComponent(area || "")}`;
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data);
      }
      case "meal": {
        const id = searchParams.get("i");
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        return NextResponse.json(data);
      }
      case "categories": {
        const response = await fetch(`${API_BASE}/list.php?c=list`);
        const data = await response.json();
        return NextResponse.json(data);
      }
      case "areas": {
        const response = await fetch(`${API_BASE}/list.php?a=list`);
        const data = await response.json();
        return NextResponse.json(data);
      }
      case "ingredients": {
        const response = await fetch(`${API_BASE}/list.php?i=list`);
        const data = await response.json();
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
