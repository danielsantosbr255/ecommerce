const getSearchFilter = (search) => {
  if (!search) return {};

  return {
    OR: [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { brand: { name: { contains: search, mode: "insensitive" } } },
      { category: { name: { contains: search, mode: "insensitive" } } },
      {
        specifications: { some: { value: { contains: search, mode: "insensitive" } } },
      },
    ],
  };
};

const getCategoryIdFilter = (categoryId) => {
  if (!categoryId) return {};
  return { categoryId };
};

const getBrandIdFilter = (brandId) => {
  if (!brandId) return {};
  return { brandId };
};

const getOrderBy = (orderBy, order) => {
  switch (orderBy) {
    case "price":
      return { price: order === "asc" ? "asc" : "desc" };
    case "sold":
      return { salesCount: order === "asc" ? "asc" : "desc" };
    case "rating":
      return { rating: order === "asc" ? "asc" : "desc" };
    case "views":
      return { viewsCount: order === "asc" ? "asc" : "desc" };
    case "title":
      return { title: order === "asc" ? "asc" : "desc" };
    default:
      return { createdAt: "desc" };
  }
};
