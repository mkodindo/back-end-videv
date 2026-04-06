const supabaseAnon = require("../lib/supabaseAnon");
const errorCodes = require("../constants/errorCodes");

function validateEmailPassword(body) {
  const { email, password } = body;

  if (typeof email !== "string" || !email.trim().includes("@")) {
    return {
      ok: false,
      message: "Un email valide est requis.",
    };
  }

  if (typeof password !== "string" || password.length < 6) {
    return {
      ok: false,
      message: "Le mot de passe doit contenir au moins 6 caractères.",
    };
  }

  return { ok: true, email: email.trim().toLowerCase(), password };
}

async function signUp(req, res) {
  const parsed = validateEmailPassword(req.body);
  if (!parsed.ok) {
    return res.status(400).json({
      message: parsed.message,
      code: errorCodes.VALIDATION_ERROR,
    });
  }

  const { data, error } = await supabaseAnon.auth.signUp({
    email: parsed.email,
    password: parsed.password,
  });

  if (error) {
    return res.status(400).json({
      message: error.message,
      code: errorCodes.AUTH_ERROR,
    });
  }

  res.status(201).json({
    user: data.user,
    session: data.session,
  });
}

async function signIn(req, res) {
  const parsed = validateEmailPassword(req.body);
  if (!parsed.ok) {
    return res.status(400).json({
      message: parsed.message,
      code: errorCodes.VALIDATION_ERROR,
    });
  }

  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email: parsed.email,
    password: parsed.password,
  });

  if (error) {
    const unauthorized =
      error.message.toLowerCase().includes("invalid") ||
      error.message.toLowerCase().includes("credentials");
    return res.status(unauthorized ? 401 : 400).json({
      message: unauthorized
        ? "Email ou mot de passe incorrect."
        : error.message,
      code: errorCodes.AUTH_ERROR,
    });
  }

  res.json({
    user: data.user,
    session: data.session,
  });
}

module.exports = { signUp, signIn };
