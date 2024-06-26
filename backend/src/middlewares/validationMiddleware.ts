
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const avaliadorSchema = yup.object().shape({
  nome: yup.string().required(),
  login: yup.string().required(),
  senha: yup.string().required().min(6),
});

export default async function avaliadorValidator(req: Request, res: Response, next: NextFunction) {
  try {
    await avaliadorSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}
