// validateTask – Verifica que la tarea tenga los campos correctos
// ✅ Esto se usa justo antes de createTask para asegurarse de que el cuerpo del POST esté bien armado.

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
  if (!Date || typeof Date !== 'string') {
    res
      .status(400)
      .json({ error: "El campo 'Date' es requerido y debe ser string" });
    return;
  }
  next();
};
