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

const getAllUsers = (req, res) => {
  res.json(users);
};

// Route d'accueil - Vérification que le serveur est lancé
app.get("/", confirmServerIsRunning);

// Liste tous les utilisateurs
app.get("/users", getAllUsers);

// Demarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${PORT}`);
  console.log("Routes : GET /  |  GET /users");
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
