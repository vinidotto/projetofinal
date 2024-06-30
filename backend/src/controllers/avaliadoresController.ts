import { Request, Response } from "express";
import AvaliadorService from "../services/AvaliadorService";

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await AvaliadorService.createAvaliador(req.body);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await AvaliadorService.getAllAvaliadores();
      return res.status(200).json(avaliadores);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllAvaliadorByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.params;
      const avaliadores = await AvaliadorService.getAllAvaliadoresByUserId(Number(user_id));
      return res.status(200).json(avaliadores);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await AvaliadorService.deleteAvaliador(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new AvaliadorController();
