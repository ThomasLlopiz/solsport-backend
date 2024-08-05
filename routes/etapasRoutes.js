const express = require("express");
const router = express.Router();
const etapasController = require("../controllers/etapasController");
const {
  verifyToken,
  verifyAdminRole,
} = require("../middlewares/authMiddleware");

router.get("/", verifyToken, etapasController.getAllEtapas);
router.get("/:id", verifyToken, etapasController.getEtapaById);
router.post("/", verifyToken, etapasController.createEtapa);
router.put("/:id", verifyToken, etapasController.updateEtapa);
router.delete("/:id", verifyToken, etapasController.deleteEtapa);

module.exports = router;
