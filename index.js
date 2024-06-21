const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/databases/init.database");
const initRoutes = require("./src/routes/init.routes");
const initMiddlewares = require("./src/middlewares/init.mdlwr");
const jwtMdlwr = require("./src/middlewares/jwt.mdlwr");
const checkAdmin = require("./src/middlewares/check-admin.mdlwr");

dotenv.config();

const app = express();

// Connexion à la base de données
connectDB();

// Initialisation des middlewares
initMiddlewares(app);

// Utilisation du middleware JWT pour toutes les routes sauf celles spécifiées
app.use('/api/*', jwtMdlwr);

// Initialisation des routes
initRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
