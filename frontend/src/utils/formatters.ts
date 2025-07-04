function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";

  const withDDD = digits.replace(/^(\d{2})(\d)/, "($1) $2");
  return digits.length > 10 ? withDDD.replace(/(\d{5})(\d{4})$/, "$1-$2") : withDDD.replace(/(\d{4})(\d{4})$/, "$1-$2");
}

export { formatPhone };
