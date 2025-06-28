// Captura errores inesperados
// ✅ Se coloca al final de todas las rutas en el archivo principal (app.ts) con:


import express, { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error('Error: ', err.message)
    res.status(500).json({error: "Ocurrio un error en el servidor"})   
}