import pool from "../database/dbConfig";

interface Avaliador {
  id?: number;
  nome: string;
  login: string;
  senha: string;
}

class AvaliadorModel {
  async create(avaliador: Avaliador): Promise<Avaliador> {
    const { nome, login, senha } = avaliador;

    const result = await pool.query(
      "INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, login, senha]
    );
    console.log("deu pau aqui2");

    return result.rows[0];
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
