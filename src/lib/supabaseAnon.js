const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Configure SUPABASE_URL et SUPABASE_ANON_KEY dans un fichier .env (voir .env.example)."
  );
}

module.exports = createClient(url, anonKey);
