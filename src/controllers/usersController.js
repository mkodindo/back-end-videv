const { users } = require("../data/users");
const { parseVillesQuery } = require("../utils/parseVillesQuery");

function parseUserBody(body) {
  const { nom, age, ville } = body;

  if (typeof nom !== "string" || !nom.trim()) {
    return { ok: false, message: "Le champ nom est requis (texte non vide)." };
  }

  const ageNum = Number(age);
  if (!Number.isInteger(ageNum) || ageNum < 0 || ageNum > 150) {
    return {
      ok: false,
      message: "Le champ age doit être un entier entre 0 et 150.",
    };
  }

  if (typeof ville !== "string" || !ville.trim()) {
    return { ok: false, message: "Le champ ville est requis (texte non vide)." };
  }

  return {
    ok: true,
    nom: nom.trim(),
    age: ageNum,
    ville: ville.trim(),
  };
}

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
  const parsed = parseUserBody(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ message: parsed.message });
  }

  const nextId =
    users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1;

  const user = {
    id: nextId,
    nom: parsed.nom,
    age: parsed.age,
    ville: parsed.ville,
  };

  users.push(user);
  res.status(201).json(user);
}

function updateUser(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }

  const parsed = parseUserBody(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ message: parsed.message });
  }

  const updated = {
    id,
    nom: parsed.nom,
    age: parsed.age,
    ville: parsed.ville,
  };

  users[index] = updated;
  res.json(updated);
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
