import { Avaliacao, AvaliacaoModel } from "../models/AvaliacaoModel";

class AvaliacaoService {
  private avaliacaoModel: AvaliacaoModel;

  constructor() {
    this.avaliacaoModel = new AvaliacaoModel();
  }

  async createAvaliacao(avaliacaoData: Avaliacao): Promise<Avaliacao> {
    return this.avaliacaoModel.create(avaliacaoData);
  }

  async getAllAvaliacoes(): Promise<Avaliacao[]> {
    return this.avaliacaoModel.findAll();
  }

  async getAvaliacaoById(id: number): Promise<Avaliacao | null> {
    return this.avaliacaoModel.findById(id);
  }

  async updateAvaliacao(id: number, avaliacaoData: Partial<Avaliacao>): Promise<Avaliacao | null> {
    return this.avaliacaoModel.update(id, avaliacaoData);
  }

  async deleteAvaliacao(id: number): Promise<void> {
    await this.avaliacaoModel.delete(id);
  }
}

export default new AvaliacaoService();
