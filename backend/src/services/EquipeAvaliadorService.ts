import { EquipeAvaliador, EquipeAvaliadorModel } from "../models/EquipeAvaliadorModel";
import { Avaliador } from "../models/AvaliadorModel";
import { Equipe } from "../models/EquipeModel";

class EquipeAvaliadorService {
  private equipeAvaliadorModel: EquipeAvaliadorModel;

  constructor() {
    this.equipeAvaliadorModel = new EquipeAvaliadorModel();
  }

  async addAvaliadorToEquipe(equipeAvaliador: EquipeAvaliador): Promise<EquipeAvaliador> {
    return this.equipeAvaliadorModel.create(equipeAvaliador);
  }

  async getAvaliadoresByEquipeId(equipe_id: number): Promise<Avaliador[]> {
    return this.equipeAvaliadorModel.findByEquipeId(equipe_id);
  }

  async getEquipesByAvaliadorId(avaliador_id: number): Promise<Equipe[]> {
    return this.equipeAvaliadorModel.findByAvaliadorId(avaliador_id);
  }

  async removeAvaliadorFromEquipe(equipe_id: number, avaliador_id: number): Promise<void> {
    return this.equipeAvaliadorModel.delete(equipe_id, avaliador_id);
  }

}

export default new EquipeAvaliadorService();
