import { Request, Response } from "express";
import AvaliadorService from "../services/AvaliadorService";

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await AvaliadorService.createAvaliador(req.body);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: "Error creating avaliador" });
    }
  }

  async getAllAvaliadorByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const avaliador = await AvaliadorService.getAllAvaliadoresByUserId(
        Number(req.params.user_id)
      );
      return res.status(200).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching addresses" });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      await AvaliadorService.deleteAvaliador(Number(req.params.id));
      return res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting address" });
    }
  }
}

export default new AvaliadorController();
