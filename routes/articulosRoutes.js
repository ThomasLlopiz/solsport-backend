const express = require("express");
const router = express.Router();
const articulosController = require("../controllers/articulosController");
const { verifyToken, verifyAdminRole } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, articulosController.getAllArticulos);
router.get("/:id", verifyToken, articulosController.getArticuloById);
router.post("/", verifyToken, articulosController.createArticulo);
router.put("/:id", verifyToken, articulosController.updateArticulo);
router.delete("/:id", verifyToken, articulosController.deleteArticulo);

module.exports = router;
