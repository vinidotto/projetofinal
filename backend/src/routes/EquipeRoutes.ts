import { Router } from "express";
import EquipeController from "../controllers/EquipesController";

const router = Router();

router.post("/", EquipeController.createEquipe);
router.get("/", EquipeController.getEquipes);
router.get("/:id", EquipeController.getEquipeById);
router.put("/:id", EquipeController.updateEquipe);
router.delete("/:id", EquipeController.deleteEquipe);

export default router;
