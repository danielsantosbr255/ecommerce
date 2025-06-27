const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

async function api<T>(url: string, options: RequestInit): Promise<T> {
  const token = getToken();

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, options);

  if (response.status === 401) {
    const newAuthHeader = response.headers.get("Authorization");

    if (newAuthHeader && newAuthHeader.startsWith("Bearer ")) {
      const newToken = newAuthHeader.split("Bearer ")[1];

      sessionStorage.setItem("accessToken", newToken);
      return response.json();
    }
  }

  return response.json();
}

export default api;
