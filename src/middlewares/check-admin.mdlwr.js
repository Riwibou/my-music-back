const User = require('../databases/user.database');

// Middleware pour vérifier le statut d'administrateur de l'utilisateur
const checkAdmin = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: `Vous n'avez pas les droits d'administrateur` });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};


module.exports = checkAdmin;
