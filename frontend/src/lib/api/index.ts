// lib/api/index.ts

import { FetchClient } from "./FetchClient";
import { ApiService } from "./ApiService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3001/api";

export const api = new ApiService(new FetchClient(BASE_URL));
