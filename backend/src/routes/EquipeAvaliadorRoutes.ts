import express from 'express';
import EquipeAvaliadorService from '../services/EquipeAvaliadorService';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { equipeId, avaliadorId } = req.body;
    
    if (!equipeId || !avaliadorId) {
      return res.status(400).json({ error: 'equipeId and avaliadorId are required' });
    }
  
    try {
      const result = await EquipeAvaliadorService.addAvaliadorToEquipe({
        equipe_id: equipeId,
        avaliador_id: avaliadorId,
      });
      res.status(201).json(result);
    } catch (error) {
      console.error('Erro no backend:', error);
      res.status(500).json({ error: 'Erro ao vincular avaliador e equipe.' });
    }
  });
  

router.get('/equipe/:equipeId', async (req, res) => {
  try {
    const { equipeId } = req.params;
    const avaliadores = await EquipeAvaliadorService.getAvaliadoresByEquipeId(Number(equipeId));
    res.status(200).json(avaliadores);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

router.get('/avaliador/:avaliadorId', async (req, res) => {
  try {
    const { avaliadorId } = req.params;
    const equipes = await EquipeAvaliadorService.getEquipesByAvaliadorId(Number(avaliadorId));
    res.status(200).json(equipes);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

router.delete('/remove', async (req, res) => {
  try {
    const { equipe_id, avaliador_id } = req.body;
    await EquipeAvaliadorService.removeAvaliadorFromEquipe(equipe_id, avaliador_id);
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});


export default router;
