const { Pool } = require("pg");
const path = require("node:path");
const { loadEnvFile } = require("node:process");
const { error } = require("node:console");

try {
  process.loadEnvFile(path.join(__dirname, "../../.env"));
} catch (err) {
  console.log(err);
}

module.exports =  new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
