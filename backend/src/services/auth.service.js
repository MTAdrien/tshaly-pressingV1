import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
  const { firstname, lastname, email, password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (firstname, lastname, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, firstname, lastname, email, role`,
    [firstname, lastname, email, hashedPassword]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};