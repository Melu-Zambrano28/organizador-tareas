/*  tasks-controllers.ts 
Este archivo contiene las funciones que ejecutan lo que se necesita hacer con las tareas. */

/* Usas los tipos Request y Response para trabajar con la solicitud y respuesta.
Importas el modelo taskModels, que es quien realmente guarda y maneja las tasks.*/

import { Request, Response } from 'express';
import { tasksModel } from '../models/tasks-models';

// controlador para obtener todas las tareas // Obtiene todas las tareas del modelo y las devuelve como JSON.
export const getAllTasks = (req: Request, res: Response): void => {
  const tasks = tasksModel.getAllTasks();
  res.json(tasks);
};

// Recibe el contenido de una nueva task en el cuerpo (req.body) - La guarda usando tasksModel.addtask - Devuelve la nueva task con código 201 (creado).
export const createTask = (req: Request, res: Response): void => {
  const newTask = tasksModel.addTask(req.body); // llamemos al metodo del modelo para agregar una nueva task con los datos de la solicitud
  res.status(201).json(newTask);
};

// Usa el ID de la URL - Usa los datos del body para actualizar una task
export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedTask = tasksModel.updateTask(id, req.body);

  if (!updatedTask) {
    res.status(404).json({ error: 'Task no encontrada para actualizar' });
    return;
  }

  res.status(200).json(updatedTask);
};

//usar el ID para eliminar una task
export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deletedTask = tasksModel.deleteTask(id);

  if (!deletedTask) {
    res.status(404).json({ error: 'Task no encontrada para ser borrada' });
    return;
  }

  res.status(200).json({ message: 'Task eliminada correctamente' });
};

/* ¿Y cómo se conecta?
Cada una de estas funciones es llamada desde el archivo de rutas (tasks-routes.ts) cuando alguien visita un endpoint.*/
