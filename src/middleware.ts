import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRODUCTION_HOST = "yt-r.vercel.app";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  // Never allow Razorpay checkout to originate from a Vercel preview URL.
  // Redirect preview/deployment hosts to the registered production domain.
  if (hostname && hostname !== PRODUCTION_HOST && hostname.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.hostname = PRODUCTION_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
