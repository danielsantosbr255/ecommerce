export const PERMISSIONS = {
  ADMIN: {
    PRODUCTS: ["create", "read", "update", "delete"],
    ORDERS: ["read", "update", "delete"],
    USERS: ["create", "read", "update", "delete"],
    REVIEWS: ["read", "update", "delete"],
    CART: ["read", "delete"],
  },
  USER: {
    PRODUCTS: ["read"],
    REVIEWS: ["create", "read", "update", "delete"],
    CART: ["create", "read", "update", "delete"],
    ORDERS: ["create", "read", "cancel"],
  },
};

export const hasPermission = (role: "ADMIN" | "USER", resource: string, action: string) => {
  return PERMISSIONS[role]?.[resource.toUpperCase()]?.includes(action.toLowerCase());
};
