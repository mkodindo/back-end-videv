const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

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

// Route d'accueil - Vérification que le serveur est lancé
app.get("/", confirmServerIsRunning);

// Liste tous les utilisateurs
app.get("/users", (req, res) => {
  res.json(users);
});

// Demarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${PORT}`);
});
