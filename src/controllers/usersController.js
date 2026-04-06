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

function createUser(req, res) {
  const { nom, age, ville } = req.body;

  if (typeof nom !== "string" || !nom.trim()) {
    return res
      .status(400)
      .json({ message: "Le champ nom est requis (texte non vide)." });
  }

  const ageNum = Number(age);
  if (!Number.isInteger(ageNum) || ageNum < 0 || ageNum > 150) {
    return res.status(400).json({
      message: "Le champ age doit être un entier entre 0 et 150.",
    });
  }

  if (typeof ville !== "string" || !ville.trim()) {
    return res
      .status(400)
      .json({ message: "Le champ ville est requis (texte non vide)." });
  }

  const nextId =
    users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1;

  const user = {
    id: nextId,
    nom: nom.trim(),
    age: ageNum,
    ville: ville.trim(),
  };

  users.push(user);
  res.status(201).json(user);
}

function deleteUser(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  users.splice(index, 1);
  res.sendStatus(204);
}

module.exports = { getAllUsers, getUserById, createUser, deleteUser };
