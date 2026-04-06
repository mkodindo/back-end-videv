const { users } = require("../data/users");
const errorCodes = require("../constants/errorCodes");
const { parseVillesQuery } = require("../utils/parseVillesQuery");

function parseUserIdParam(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return { ok: false };
  }
  return { ok: true, id };
}

function parseUserBody(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return {
      ok: false,
      message:
        "Le corps doit être un objet JSON avec les propriétés nom, age et ville.",
    };
  }

  const { nom, age, ville } = body;

  if (typeof nom !== "string" || !nom.trim()) {
    return {
      ok: false,
      message: "Le champ nom est requis et doit être un texte non vide.",
    };
  }

  const ageNum = Number(age);
  if (!Number.isInteger(ageNum) || ageNum < 0 || ageNum > 150) {
    return {
      ok: false,
      message: "Le champ age doit être un entier entre 0 et 150.",
    };
  }

  if (typeof ville !== "string" || !ville.trim()) {
    return {
      ok: false,
      message: "Le champ ville est requis et doit être un texte non vide.",
    };
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
  const idResult = parseUserIdParam(req.params.id);
  if (!idResult.ok) {
    return res.status(400).json({
      message:
        "L'identifiant dans l'URL doit être un entier strictement positif (ex. 1, 2, 3).",
      code: errorCodes.INVALID_USER_ID,
    });
  }

  const user = users.find((u) => u.id === idResult.id);
  if (!user) {
    return res.status(404).json({
      message: "Aucun utilisateur ne correspond à cet identifiant.",
      code: errorCodes.USER_NOT_FOUND,
    });
  }

  res.json(user);
}

function createUser(req, res) {
  const parsed = parseUserBody(req.body);
  if (!parsed.ok) {
    return res.status(400).json({
      message: parsed.message,
      code: errorCodes.VALIDATION_ERROR,
    });
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
  const idResult = parseUserIdParam(req.params.id);
  if (!idResult.ok) {
    return res.status(400).json({
      message:
        "L'identifiant dans l'URL doit être un entier strictement positif (ex. 1, 2, 3).",
      code: errorCodes.INVALID_USER_ID,
    });
  }

  const index = users.findIndex((u) => u.id === idResult.id);
  if (index === -1) {
    return res.status(404).json({
      message: "Aucun utilisateur ne correspond à cet identifiant.",
      code: errorCodes.USER_NOT_FOUND,
    });
  }

  const parsed = parseUserBody(req.body);
  if (!parsed.ok) {
    return res.status(400).json({
      message: parsed.message,
      code: errorCodes.VALIDATION_ERROR,
    });
  }

  const updated = {
    id: idResult.id,
    nom: parsed.nom,
    age: parsed.age,
    ville: parsed.ville,
  };

  users[index] = updated;
  res.json(updated);
}

function deleteUser(req, res) {
  const idResult = parseUserIdParam(req.params.id);
  if (!idResult.ok) {
    return res.status(400).json({
      message:
        "L'identifiant dans l'URL doit être un entier strictement positif (ex. 1, 2, 3).",
      code: errorCodes.INVALID_USER_ID,
    });
  }

  const index = users.findIndex((u) => u.id === idResult.id);
  if (index === -1) {
    return res.status(404).json({
      message: "Aucun utilisateur ne correspond à cet identifiant.",
      code: errorCodes.USER_NOT_FOUND,
    });
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
