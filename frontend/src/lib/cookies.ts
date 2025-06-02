"use server";

import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

export async function setCookiesFromResponse(res: AxiosResponse) {
  const rawCookies = res.headers["set-cookie"];

  // console.log("🚀 [SET COOKIES] - Raw cookies: ", rawCookies);

  if (!rawCookies) return;

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
