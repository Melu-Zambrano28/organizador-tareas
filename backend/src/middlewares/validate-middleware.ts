import express, { Request, Response, NextFunction } from 'express';

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { id, task, date } = req.body;
  if (!id || typeof id !== 'string') {
    res
      .status(400)
      .json({ error: "El campo 'id' es requerido y debe ser string" });
    return;
  }
  if (!task || typeof task !== 'string') {
    res
      .status(400)
      .json({ error: "El campo 'task' es requerido y debe ser string" });
    return;
  }
  if (!date || typeof date !== 'string') {
    res
      .status(400)
      .json({ error: "El campo 'date' es requerido y debe ser string" });
    return;
  }
  next();
};
