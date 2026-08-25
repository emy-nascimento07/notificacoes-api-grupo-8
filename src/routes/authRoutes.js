const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/registrar", AuthController.registrar);
router.post("/login", AuthController.login);

const authMiddleware = require("../middlewares/authMiddleware");
router.post("/registrar", AuthController.registrar);
router.post("/login", AuthController.login);
router.get("/perfil", authMiddleware, AuthController.perfil);

module.exports = router;

