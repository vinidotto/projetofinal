import pool from "../database/dbConfig";

interface Equipe {
  id?: number;
  nome: string;
}

class EquipeModel {
  async create(Equipe: Equipe): Promise<Equipe> {
    const { nome} =
      Equipe;
    const result = await pool.query(
      "INSERT INTO Equipes (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Equipe[] | null> {
    const result = await pool.query("SELECT * FROM Equipes");
    return result.rows || null;
  }

  async findById(id: number): Promise<Equipe | null> {
    const result = await pool.query("SELECT * FROM Equipes WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async update(id: number, Equipe: Partial<Equipe>): Promise<Equipe | null> {
    console.log(Equipe);
    console.log(id);

    const fields: string[] = [];
    const values: any[] = [];
    let query = "UPDATE Equipes SET ";

    Object.keys(Equipe).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push((Equipe as any)[key]);
    });

    query +=
      fields.join(", ") +
      " WHERE id = $" +
      (fields.length + 1) +
      " RETURNING *";
    values.push(id);

    try {
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error updating Equipe:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM Equipes WHERE id = $1", [id]);
  }
}

export { Equipe, EquipeModel };
