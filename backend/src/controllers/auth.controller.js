import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(400).json({
        message: "Un utilisateur existe déjà avec cet email",
      });
    }

    const user = await createUser({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la création du compte",
    });
  }
};

// LOGIN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        message: "Identifiants incorrects",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Identifiants incorrects",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la connexion",
    });
  }
};