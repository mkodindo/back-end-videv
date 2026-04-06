const errorCodes = require("../constants/errorCodes");

function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Aucune route ne correspond à ${req.method} ${req.originalUrl}.`,
    code: errorCodes.ROUTE_NOT_FOUND,
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Le corps de la requête n'est pas un JSON valide.",
      code: errorCodes.INVALID_JSON,
    });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      message: "Le corps de la requête dépasse la taille maximale autorisée.",
      code: errorCodes.PAYLOAD_TOO_LARGE,
    });
  }

  console.error(err);
  res.status(500).json({
    message: "Une erreur interne s'est produite.",
    code: errorCodes.INTERNAL_ERROR,
  });
}

module.exports = { notFoundHandler, errorHandler };
