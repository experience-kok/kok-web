export async function GET() {
  return NextResponse.json({
    baseUrl: process.env.NEXT_PUBLIC_BFF_BASE_URL,
  });
}
