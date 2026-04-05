const express = require("express");

const app = express();
const PORT = process.env.PORT || 3456;

const users = [
  { id: 1, nom: "Alban", age: 25, ville: "Annecy" },
  { id: 2, nom: "Bob", age: 30, ville: "Bordeaux" },
  { id: 3, nom: "Clémence", age: 35, ville: "Caen" },
];

const confirmServerIsRunning = (req, res) => {
  res.json({
    status: "Ok",
    message: "Le serveur est lancé avec succès.",
  });
};

const parseVillesQuery = (query) => {
  const raw = query.ville;
  if (raw === undefined) {
    return null;
  }
  const parts = Array.isArray(raw) ? raw : [raw];
  return parts
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean);
};

const getAllUsers = (req, res) => {
  const villes = parseVillesQuery(req.query);
  if (villes === null) {
    return res.json(users);
  }
  const wanted = new Set(villes);
  const filtered = users.filter((u) => wanted.has(u.ville));
  res.json(filtered);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  res.json(user);
};

// Route d'accueil - Vérification que le serveur est lancé
app.get("/", confirmServerIsRunning);

// Liste les utilisateurs (optionnel : ?ville=X&ville=Y pour filtrer par villes)
app.get("/users", getAllUsers);

// Détail d'un utilisateur par id (ex. GET /users/2)
app.get("/users/:id", getUserById);

// Demarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${PORT}`);
  console.log(
    "Routes : GET /  |  GET /users (?ville=…)  |  GET /users/:id"
  );
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Le port ${PORT} est déjà utilisé. Un autre programme (ou une vieille instance du serveur) répond peut-être à la place de cette API — d'où un "Cannot GET /users".`
    );
    console.error("Ferme l'autre application, ou lance celle-ci avec une autre valeur pour PORT.");
  } else {
    console.error(err);
  }
  process.exit(1);
});
