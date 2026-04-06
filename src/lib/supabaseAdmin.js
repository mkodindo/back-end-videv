const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Configure SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans un fichier .env (voir .env.example)."
  );
}

module.exports = createClient(url, serviceRoleKey);
