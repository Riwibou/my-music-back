const jwt = require('jsonwebtoken');

const jwtOptions = { expiresIn: '8h' };
const secret = process.env.JWT_SECRET || 'T0P_S3CRet';

// Middleware pour la vérification du token JWT dans les requêtes
const jwtMdlwr = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authorizationHeader.split(' ')[1];
  const userId = jwtVerify(token);

  if (!userId) return res.status(401).json({ message: 'Token invalide' });

  req.body.userId = userId;
  next();
};

// Fonction pour vérifier et déchiffrer un token JWT
const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.data;
    return userId;
  } catch (err) {
    console.error('jwt.mdlwr.js - jwtVerify - erreur => ', err.message);
    return null;
  }
};

// Fonction pour créer un nouveau token JWT
const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);

module.exports = {
  jwtMdlwr,
  jwtSign
};
