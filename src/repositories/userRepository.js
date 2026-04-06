const supabase = require("../lib/supabaseAdmin");
const errorCodes = require("../constants/errorCodes");

function normalizeUser(row) {
  if (!row) {
    return row;
  }
  return { ...row, id: Number(row.id) };
}

function normalizeUsers(rows) {
  return (rows ?? []).map(normalizeUser);
}

function dbError(error, message) {
  const err = new Error(message);
  err.statusCode = 503;
  err.code = errorCodes.DATABASE_ERROR;
  err.cause = error;
  return err;
}

async function findAllUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, nom, age, ville")
    .order("id", { ascending: true });

  if (error) {
    throw dbError(error, "Erreur lors de la lecture des utilisateurs.");
  }

  return normalizeUsers(data);
}

async function findUsersByVilles(villes) {
  const { data, error } = await supabase
    .from("users")
    .select("id, nom, age, ville")
    .in("ville", villes)
    .order("id", { ascending: true });

  if (error) {
    throw dbError(error, "Erreur lors du filtrage par ville.");
  }

  return normalizeUsers(data);
}

async function findUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("id, nom, age, ville")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw dbError(error, "Erreur lors de la lecture de l'utilisateur.");
  }

  return normalizeUser(data);
}

async function insertUser({ nom, age, ville }) {
  const { data, error } = await supabase
    .from("users")
    .insert({ nom, age, ville })
    .select("id, nom, age, ville")
    .single();

  if (error) {
    throw dbError(error, "Erreur lors de la création de l'utilisateur.");
  }

  return normalizeUser(data);
}

async function updateUserById(id, { nom, age, ville }) {
  const { data, error } = await supabase
    .from("users")
    .update({ nom, age, ville })
    .eq("id", id)
    .select("id, nom, age, ville");

  if (error) {
    throw dbError(error, "Erreur lors de la mise à jour de l'utilisateur.");
  }

  if (!data || data.length === 0) {
    return null;
  }

  return normalizeUser(data[0]);
}

async function deleteUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw dbError(error, "Erreur lors de la suppression de l'utilisateur.");
  }

  return Array.isArray(data) && data.length > 0;
}

module.exports = {
  findAllUsers,
  findUsersByVilles,
  findUserById,
  insertUser,
  updateUserById,
  deleteUserById,
};
