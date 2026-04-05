function getRoot(req, res) {
  res.json({
    status: "Ok",
    message: "Le serveur est lancé avec succès.",
  });
}

module.exports = { getRoot };
