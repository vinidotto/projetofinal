import pool from "../database/dbConfig";

interface Avaliador {
  id?: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
  firebaseID?: string;
}

class AvaliadorModel {
  async create(avaliador: Avaliador): Promise<Avaliador> {
    const { nome, login, senha, email, firebaseID } = avaliador;

    const result = await pool.query(
      "INSERT INTO avaliadores (nome, login, senha, email, firebaseID) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, login, senha, email, firebaseID]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Avaliador[] | null> {
    const result = await pool.query("SELECT id, nome FROM avaliadores");
    return result.rows || null;
  }

  async findAllByUserId(id: number): Promise<Avaliador[]> {
    const result = await pool.query(
      "SELECT * FROM avaliadores WHERE id = $1",
      [id]
    );
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM avaliadores WHERE id = $1", [id]);
  }
}

export { Avaliador, AvaliadorModel };
