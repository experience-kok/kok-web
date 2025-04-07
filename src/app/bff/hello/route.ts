// app/api/hello/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: process.env.NEXT_PUBLIC_KOK_BASE_URL });
}
