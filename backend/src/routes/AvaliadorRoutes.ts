import { Router } from "express";
import AvaliadorController from "../controllers/avaliadoresController";
import { createAvaliadorValidator, getAllAvaliadorValidator } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/", getAllAvaliadorValidator, AvaliadorController.getAllAvaliador);
router.post("/", createAvaliadorValidator, AvaliadorController.createAvaliador);
router.get("/:user_id", AvaliadorController.getAllAvaliadorByUserId);
router.delete("/:id", AvaliadorController.deleteAvaliador);

export default router;
