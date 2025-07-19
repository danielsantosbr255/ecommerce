import { cookies } from "next/headers";
import { ApiResponse } from "./api/types";
import setCookieParser from "set-cookie-parser";

export async function setCookiesFromResponse(res: ApiResponse) {
  const rawCookies = res.headers.get("set-cookie");
  if (!rawCookies) return;

  const cookieStore = await cookies();

  // 👇 ESSENCIAL: divide corretamente os headers com múltiplos cookies
  const splitCookies = setCookieParser.splitCookiesString(rawCookies);
  const parsedCookies = splitCookies.flatMap((cookieStr) => setCookieParser.parse(cookieStr, { map: false }));

  parsedCookies.forEach(({ name, value, ...options }) => {
    const allowed = ["path", "expires", "httpOnly", "maxAge", "sameSite", "secure", "domain"] as const;
    const filtered = Object.fromEntries(Object.entries(options).filter(([k]) => allowed.includes(k as (typeof allowed)[number])));

    cookieStore.set(name, value, filtered);
  });

  console.log("🚀 [SET COOKIES] - SUCCESS ");
  return parsedCookies;
}
