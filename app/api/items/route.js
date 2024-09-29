import { NextResponse } from "next/server";

let items = [];

export async function GET() {
  return NextResponse.json(items);
}

export async function POST(request) {
  const newItem = await request.json();
  items.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request) {
  const updatedItem = await request.json();
  items = items.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
  return NextResponse.json(updatedItem);
}

export async function DELETE(request) {
  const { id } = await request.json();
  items = items.filter((item) => item.id !== id);
  return NextResponse.json({ message: "Item deleted" });
}
