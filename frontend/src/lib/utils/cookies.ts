import { cookies } from "next/headers";
import { ApiResponse } from "../api/types";
import setCookieParser from "set-cookie-parser";

export async function setCookiesFromResponse(res: ApiResponse) {
  const rawCookies = res.headers.getSetCookie();
  if (!rawCookies || rawCookies.length === 0) return;
  
  const cookieStore = await cookies();
  const parsedCookies = setCookieParser.parse(rawCookies, { map: false });

  parsedCookies.forEach(({ name, value, ...options }) => {
    const allowed = ["path", "expires", "httpOnly", "maxAge", "sameSite", "secure", "domain"] as const;
    const filtered = Object.fromEntries(Object.entries(options).filter(([k]) => allowed.includes(k as (typeof allowed)[number])));

    cookieStore.set(name, value, filtered);
  });

  console.log("🚀 [SET COOKIES] - SUCCESS ");
  return parsedCookies;
}
