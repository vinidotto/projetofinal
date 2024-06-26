import { Request, Response } from 'express';
import AvaliacaoService from '../services/AvaliacaoService';
import { Avaliacao } from '../models/AvaliacaoModel';

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<void> {
    try {
      const novaAvaliacao: Avaliacao = req.body;
      const avaliacaoCriada = await AvaliacaoService.createAvaliacao(novaAvaliacao);
      res.status(201).json(avaliacaoCriada);
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      res.status(500).json({ error: 'Erro interno ao criar avaliação' });
    }
  }

  async getAllAvaliacoes(req: Request, res: Response): Promise<void> {
    try {
      const avaliacoes = await AvaliacaoService.getAllAvaliacoes();
      res.json(avaliacoes);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      res.status(500).json({ error: 'Erro interno ao buscar avaliações' });
    }
  }

  async getAvaliacaoById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'ID da avaliação não fornecido' });
      return;
    }

    try {
      const avaliacao = await AvaliacaoService.getAvaliacaoById(id);
      if (!avaliacao) {
        res.status(404).json({ error: 'Avaliação não encontrada' });
        return;
      }
      res.json(avaliacao);
    } catch (error) {
      console.error('Erro ao buscar avaliação por ID:', error);
      res.status(500).json({ error: 'Erro interno ao buscar avaliação por ID' });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'ID da avaliação não fornecido' });
      return;
    }

    const atualizacaoAvaliacao: Partial<Avaliacao> = req.body;

    try {
      const avaliacaoAtualizada = await AvaliacaoService.updateAvaliacao(id, atualizacaoAvaliacao);
      if (!avaliacaoAtualizada) {
        res.status(404).json({ error: 'Avaliação não encontrada' });
        return;
      }
      res.json(avaliacaoAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      res.status(500).json({ error: 'Erro interno ao atualizar avaliação' });
    }
  }

  async deleteAvaliacao(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'ID da avaliação não fornecido' });
      return;
    }

    try {
      await AvaliacaoService.deleteAvaliacao(id);
      res.status(204).end();
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      res.status(500).json({ error: 'Erro interno ao deletar avaliação' });
    }
  }
}

export default new AvaliacaoController();
