import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes. Replace with DB in production.
let quotes: any[] = [];

export async function GET(req: NextRequest) {
  return NextResponse.json(quotes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newQuote = {
    ...data,
    id: Date.now().toString(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  quotes.unshift(newQuote);
  return NextResponse.json({ success: true, quote: newQuote });
}

export async function PATCH(req: NextRequest) {
  const { id, read } = await req.json();
  const idx = quotes.findIndex(q => q.id === id);
  if (idx !== -1) {
    quotes[idx].read = read;
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  quotes = quotes.filter(q => q.id !== id);
  return NextResponse.json({ success: true });
}
