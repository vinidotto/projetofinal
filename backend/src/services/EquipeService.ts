import { Equipe, EquipeModel } from "../models/EquipeModel";

class EquipeService {
  private EquipeModel: EquipeModel;

  constructor() {
    this.EquipeModel = new EquipeModel();
  }

  async createEquipe(EquipeData: Equipe): Promise<Equipe> {
    return this.EquipeModel.create(EquipeData);
  }

  async getAllEquipes(): Promise<Equipe[] | null> {
    return this.EquipeModel.findAll();
  }

  async getEquipeById(id: number): Promise<Equipe | null> {
    return this.EquipeModel.findById(id);
  }

  async updateEquipe(
    id: number,
    updateData: Partial<Equipe>
  ): Promise<Equipe | null> {
    return this.EquipeModel.update(id, updateData);
  }

  async deleteEquipe(id: number): Promise<void> {
    return this.EquipeModel.delete(id);
  }
}

export default new EquipeService();
