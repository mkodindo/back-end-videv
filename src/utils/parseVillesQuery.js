function parseVillesQuery(query) {
  const raw = query.ville;
  if (raw === undefined) {
    return null;
  }
  const parts = Array.isArray(raw) ? raw : [raw];
  return parts
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean);
}

module.exports = { parseVillesQuery };
