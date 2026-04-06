const supabaseAnon = require("../lib/supabaseAnon");
const errorCodes = require("../constants/errorCodes");

async function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message:
        "Authentification requise : en-tête Authorization Bearer avec un jeton d'accès.",
      code: errorCodes.UNAUTHORIZED,
    });
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return res.status(401).json({
      message: "Jeton d'accès manquant.",
      code: errorCodes.UNAUTHORIZED,
    });
  }

  const {
    data: { user },
    error,
  } = await supabaseAnon.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({
      message: "Jeton invalide ou expiré.",
      code: errorCodes.UNAUTHORIZED,
    });
  }

  req.authUser = user;
  next();
}

module.exports = { authenticate };
