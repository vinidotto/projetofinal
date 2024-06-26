import { Router } from "express";
import AvaliadorController from "../controllers/avaliadoresController";
import avaliadorValidator, {  } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", avaliadorValidator, AvaliadorController.createAvaliador);
router.get("/:user_id", AvaliadorController.getAllAvaliadorByUserId);
router.delete("/:id", AvaliadorController.deleteAvaliador);

export default router;
