import { Request, Response } from 'express';
import AvaliacaoService from '../services/AvaliacaoService';
import {Avaliacao} from '../models/types';


class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<void> {
    try {
      const { avaliador_id, equipe_id, notas } = req.body;

      const validatedNotas = {
        originalidade: Number(notas.originalidade) || 0,
        impacto: Number(notas.impacto) || 0,
        execucao: Number(notas.execucao) || 0,
        apresentacao: Number(notas.apresentacao) || 0,
        viabilidade: Number(notas.viabilidade) || 0,
      };

      const novaAvaliacao = {
        avaliador_id,
        equipe_id,
        notas: validatedNotas,
      };

      const avaliacaoCriada = await AvaliacaoService.createAvaliacao(novaAvaliacao);
      res.status(201).json(avaliacaoCriada);
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      res.status(500).json({ error: 'Erro interno ao criar avaliação' });
    }
  }

  async getAllAvaliacoes(req: Request, res: Response): Promise<void> {
    try {
      const avaliadorId = parseInt(req.query.avaliadorId as string, 10);
      const equipeId = parseInt(req.query.equipeId as string, 10);

      const filters = {
        ...(isNaN(avaliadorId) ? {} : { avaliadorId }),
        ...(isNaN(equipeId) ? {} : { equipeId }),
      };

      const avaliacoes = await AvaliacaoService.getAllAvaliacoes(filters);
      res.json(avaliacoes);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      res.status(500).json({ error: 'Erro interno ao buscar avaliações' });
    }
  }

  async getAvaliacaoById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID da avaliação não fornecido ou inválido' });
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
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID da avaliação não fornecido ou inválido' });
      return;
    }

    const atualizacaoAvaliacao: Partial<Avaliacao> = req.body;

    if (atualizacaoAvaliacao.notas) {
      atualizacaoAvaliacao.notas = {
        originalidade: Number(atualizacaoAvaliacao.notas.originalidade) || 0,
        impacto: Number(atualizacaoAvaliacao.notas.impacto) || 0,
        execucao: Number(atualizacaoAvaliacao.notas.execucao) || 0,
        apresentacao: Number(atualizacaoAvaliacao.notas.apresentacao) || 0,
        viabilidade: Number(atualizacaoAvaliacao.notas.viabilidade) || 0,
      };
    }

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
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID da avaliação não fornecido ou inválido' });
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
