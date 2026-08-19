import pool from "../config/db.js";

export const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, firstname, lastname, email, phone, address, role
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, firstname, lastname, email, role
     FROM users
     ORDER BY id DESC`
  );

  return result.rows;
};

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

export const deleteUser = async (id) => {
  await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
};
