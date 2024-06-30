import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const createAvaliadorValidator = [
  check("nome").exists().withMessage("Nome is required"),
  check("login").exists().withMessage("Login is required"),
  check("senha").exists().withMessage("Senha is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const getAllAvaliadorValidator = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export { createAvaliadorValidator, getAllAvaliadorValidator };
