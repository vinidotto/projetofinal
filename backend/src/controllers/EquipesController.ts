import { Request, Response } from "express";
import EquipeService from "../services/EquipeService";

class EquipeController {
  async createEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await EquipeService.createEquipe(req.body);
      return res.status(201).json(equipe);
    } catch (error) {
      return res.status(500).json({ error: "Error creating equipe" });
    }
  }

  async getEquipes(req: Request, res: Response): Promise<Response> {
    try {
      const equipes = await EquipeService.getAllEquipes();
      if (equipes) {
        return res.status(200).json(equipes);
      }
      return res.status(404).json({ error: "Equipes not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching equipes" });
    }
  }

  async getEquipeById(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await EquipeService.getEquipeById(Number(req.params.id));
      if (equipe) {
        return res.status(200).json(equipe);
      }
      return res.status(404).json({ error: "Equipe not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching equipe" });
    }
  }

  async updateEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await EquipeService.updateEquipe(
        Number(req.params.id),
        req.body
      );
      if (equipe) {
        return res.status(200).json(equipe);
      }
      return res.status(404).json({ error: "Equipe not found" });
    } catch (error) {
      return res.status(500).json({ error: "Error updating equipe" });
    }
  }

  async deleteEquipe(req: Request, res: Response): Promise<Response> {
    try {
      await EquipeService.deleteEquipe(Number(req.params.id));
      return res.status(200).json({ message: "Equipe deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting equipe" });
    }
  }
}

export default new EquipeController();
