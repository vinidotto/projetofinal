import { Router } from "express";
import EquipeController from "../controllers/EquipesController";

const router = Router();

router.post("//", EquipeController.createEquipe);
router.get("/equipe/:equipe_id", EquipeController.getEquipesById);
router.delete("/:id", EquipeController.deleteEquipe);

export default router;
