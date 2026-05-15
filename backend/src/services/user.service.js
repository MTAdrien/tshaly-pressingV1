import pool from "../config/db.js";

// Récupérer un utilisateur par ID

export const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, firstname, lastname, email, phone, address, role
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// Récupérer tous les utilisateurs

export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, firstname, lastname, email, role
     FROM users
     ORDER BY id DESC`
  );

  return result.rows;
};

// Mise à jour profil utilisateur

export const updateUserProfile = async (id, userData) => {
  const { firstname, lastname, phone, address } = userData;

  const result = await pool.query(
    `UPDATE users
     SET firstname = $1,
         lastname = $2,
         phone = $3,
         address = $4
     WHERE id = $5
     RETURNING id, firstname, lastname, email, phone, address`,
    [firstname, lastname, phone, address, id]
  );

  return result.rows[0];
};

// Supprimer utilisateur

export const deleteUser = async (id) => {
  await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
};