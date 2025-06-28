// index.ts
import express, {Application, Request, Response, NextFunction} from "express";
import cors from "cors";
//import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import tasksRoutes from "./src/routes/tasks-routes";
import { authMiddleware } from "./middlewares/auth-middleware";
import { errorMiddleware } from "./middlewares/error-middleware";
import { validateMiddleware } from "./middlewares/validate-middleware";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

// Servir archivos estáticos desde carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Rutas de API
app.use("/api/task", tasksRoutes);


//Middleware para manejar solicitudes a rutas que no existen en la app
//si el usuario hace una solicitud a una ruta no definida, se devuelve un error 404 con un mensaje.
app.use((req: Request, res:Response) => {
    res.status(404).json({error: "Endpoint  no encontrado"});
})


// Ruta principal que sirve el HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(authMiddleware)
app.use(errorMiddleware);
app.use(validateMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});