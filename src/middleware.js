// THIS FILE HAS TO BE IN /src DIRECTORY

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const checkPublicPath = path === "/auth";

  const getCookies = cookies();
  const token = getCookies.get("token")?.value || "";

  // If user is authenticated and trying to get sign-in page, redirect to its private page
  if (checkPublicPath && token !== "") {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  // If user is not authenticated but want to access private path, redirect to auth page
  if (!checkPublicPath && token === "") {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
}

export const config = {
  matcher: ["/auth"],
};
