import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = Boolean(req.auth?.user);

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.auth?.user?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/account") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
