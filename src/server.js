const app = require("./app");

const PORT = process.env.PORT || 3456;

const server = app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${PORT}`);
  console.log(
    "Routes : GET /  |  GET/POST /users  |  GET/DELETE /users/:id  |  POST JSON : nom, age, ville"
  );
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Le port ${PORT} est déjà utilisé. Un autre programme (ou une vieille instance du serveur) répond peut-être à la place de cette API — d'où un "Cannot GET /users".`
    );
    console.error(
      "Ferme l'autre application, ou lance celle-ci avec une autre valeur pour PORT."
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
