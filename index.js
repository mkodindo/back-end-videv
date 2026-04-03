const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const confirmServerIsRunning = (req, res) => {
  res.json({
    status: "Ok",
    message: "Le serveur est lancé avec succès.",
  });
};

// Route d'accueil - Vérification que le serveur est lancé
app.get("/", confirmServerIsRunning);

// Demarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${PORT}`);
});
