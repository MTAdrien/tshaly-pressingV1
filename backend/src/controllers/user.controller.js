import {
  getUserById,
  getAllUsers,
  updateUserProfile,
  deleteUser,
} from "../services/user.service.js";

export const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await updateUserProfile(
      req.user.id,
      req.body
    );

    res.status(200).json({
      message: "Profil mis à jour",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);

    res.status(200).json({
      message: "Utilisateur supprimé",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
};
