import {  Avaliador, AvaliadorModel } from "../models/AvaliadorModel";

class AvaliadorService {
  private AvaliadorModel: AvaliadorModel;

  constructor() {
    this.AvaliadorModel = new AvaliadorModel();
  }

  async createAvaliador(AvaliadorData: Avaliador): Promise<Avaliador> {
    return this.AvaliadorModel.create(AvaliadorData);
  }

  async getAllAvaliadoresByUserId(user_id: number): Promise<Avaliador[]> {
    return this.AvaliadorModel.findAllByUserId(user_id);
  }

  async deleteAvaliador(id: number): Promise<void> {
    return this.AvaliadorModel.delete(id);
  }
}

export default new AvaliadorService();
