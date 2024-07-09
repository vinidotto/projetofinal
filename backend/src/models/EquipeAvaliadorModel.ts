import pool from "../database/dbConfig";

interface EquipeAvaliador {
  equipe_id: number;
  avaliador_id: number;
}

interface Equipe {
  id?: number;
  nome: string;
}

interface Avaliador {
  id?: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
  firebaseID?: string;
}

class EquipeAvaliadorModel {
  async create(equipeAvaliador: EquipeAvaliador): Promise<EquipeAvaliador> {
    const { equipe_id, avaliador_id } = equipeAvaliador;

    const result = await pool.query(
      "INSERT INTO equipe_avaliador (equipe_id, avaliador_id) VALUES ($1, $2) RETURNING *",
      [equipe_id, avaliador_id]
    );

    return result.rows[0];
  }

  async findByEquipeId(equipe_id: number): Promise<Avaliador[]> {
    const result = await pool.query(
      "SELECT a.* FROM avaliadores a INNER JOIN equipe_avaliador ea ON a.id = ea.avaliador_id WHERE ea.equipe_id = $1",
      [equipe_id]
    );

    return result.rows;
  }

  async findByAvaliadorId(avaliador_id: number): Promise<Equipe[]> {
    const result = await pool.query(
      "SELECT e.* FROM equipes e INNER JOIN equipe_avaliador ea ON e.id = ea.equipe_id WHERE ea.avaliador_id = $1",
      [avaliador_id]
    );

    return result.rows;
  }

  async delete(equipe_id: number, avaliador_id: number): Promise<void> {
    await pool.query(
      "DELETE FROM equipe_avaliador WHERE equipe_id = $1 AND avaliador_id = $2",
      [equipe_id, avaliador_id]
    );
  }
}

export { EquipeAvaliador, EquipeAvaliadorModel };
