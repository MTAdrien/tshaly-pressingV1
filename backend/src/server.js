import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

try {
  await pool.query("SELECT NOW()");

  console.log("PostgreSQL connecté");

  app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
  });
} catch (error) {
  console.error("Erreur connexion PostgreSQL :", error);
}