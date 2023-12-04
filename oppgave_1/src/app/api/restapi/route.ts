import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { type Task } from "@/types"

const tasks: Task[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "9|4",
  },
  {
    id: "134",
    text: "Skriv resultatet av regneoperasjonen",
    type: "divide",
    data: "25|4",
  },
  {
    id: "132",
    text: "Skriv resultatet av regneoperasjonen",
    type: "subtract",
    data: "28|5",
  },
  {
    id: "139",
    text: "Skriv resultatet av regneoperasjonen",
    type: "multiply",
    data: "16|4",
  },

  {
    id: "138",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "25|4",
  },
]


export function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}

export function GET(request: NextRequest) {
  const countString = request.nextUrl.searchParams.get("count");
  if (!countString) {
    return NextResponse.json({ success: false, error: "Invalid count" });
  }
  const count = parseInt(countString);
  if (count < 0 || count > 10) {
    return NextResponse.json({ success: false, error: "Invalid count" });
  }
  return NextResponse.json({ success: true, data: tasks.slice(0, count) }, { status: 200 });
}