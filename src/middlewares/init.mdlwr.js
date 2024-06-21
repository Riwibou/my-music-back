const cors = require("cors");
const helmet = require("helmet");
const express = require("express");

// Fonction pour initialiser les middlewares 
const initMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));
  app.use(helmet());
};

module.exports = initMiddlewares;
