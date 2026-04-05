const { users } = require("../data/users");
const { parseVillesQuery } = require("../utils/parseVillesQuery");

function getAllUsers(req, res) {
  const villes = parseVillesQuery(req.query);
  if (villes === null) {
    return res.json(users);
  }
  const wanted = new Set(villes);
  const filtered = users.filter((u) => wanted.has(u.ville));
  res.json(filtered);
}

function getUserById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  res.json(user);
}

module.exports = { getAllUsers, getUserById };
