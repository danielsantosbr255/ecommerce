function buildOrder(orderBy, order) {
  if (!orderBy) return undefined;
  return { [orderBy]: order || "asc" };
}

function buildWhere(search, category, brand) {
  const where = {};

  if (search) {
    where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
  }

  if (category) {
    where.categoryId = category;
  }

  if (brand) {
    where.brandId = brand;
  }

  return where;
}

module.exports = { buildOrder, buildWhere };
