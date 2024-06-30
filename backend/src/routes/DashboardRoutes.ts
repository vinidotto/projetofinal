import { Router } from "express";
import pool from "../database/dbConfig"; 

const router = Router();

router.get("/total-equipes", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total FROM equipes");
    const total = result.rows[0].total;
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/total-avaliadores", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total FROM avaliadores");
    const total = result.rows[0].total;
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/total-avaliacoes", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total FROM avaliacoes");
    const total = result.rows[0].total;
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
