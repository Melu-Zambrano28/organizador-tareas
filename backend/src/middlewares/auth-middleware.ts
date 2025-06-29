// Este middleware bloquea el acceso si no se envía un token válido:
//✅ Úsalo si quieres proteger rutas que no cualquiera debería tocar, como las de crear, actualizar o borrar frases.

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender Request para incluir el usuario decodificado
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Buscar el token en el header Authorization
  const authHeader = req.headers['authorization'];
  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7) // Remover 'Bearer ' del inicio
      : null;

  if (!token) {
    res.status(401).json({
      error: 'Token de acceso requerido',
      success: false,
    });
    return;
  }

  try {
    // Verificar y decodificar el JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Guardar info del usuario en req
    next(); // Token válido, continuar
  } catch (error) {
    res.status(401).json({
      error: 'Token inválido o expirado',
      success: false,
    });
    return;
  }
};
