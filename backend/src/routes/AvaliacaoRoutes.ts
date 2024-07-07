import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController';

const router = Router();

router.post('/', AvaliacaoController.createAvaliacao);
router.get('/', AvaliacaoController.getAllAvaliacoes);
router.get('/:id', AvaliacaoController.getAvaliacaoById);
router.put('/:id', AvaliacaoController.updateAvaliacao);
router.delete('/:id', AvaliacaoController.deleteAvaliacao);

export default router;
