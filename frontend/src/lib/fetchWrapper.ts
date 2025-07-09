import { Session } from "@/types";

const isServer = typeof window === "undefined";

const refreshToken = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
    method: "POST",
  });

  const { session } = (await response.json()) as { session: Session };
  const newToken = session.accessToken;

  if (newToken && !isServer) {
    sessionStorage.setItem("accessToken", newToken);
  }
  return newToken;
};

const customFetch = async (url: string, config: RequestInit = {}) => {
  config["headers"] = {
    ...config["headers"],
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  };

  const res = await fetch(url, config);
  const json = await res.json();

  if (res.status === 401 && !res.url.includes("refresh")) {
    const newAccessToken = await refreshToken();
    
    config["headers"] = {
      ...config["headers"],
      Authorization: `Bearer ${newAccessToken}`,
    };
    return await fetch(url, config);
  }

  return json;
};

export default customFetch;
