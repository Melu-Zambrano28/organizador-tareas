// index.ts
import express from "express";
import cors from "cors";
//import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import tasksRoutes from "./src/routes/tasks-routes";

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
app.use("/api/tasks", tasksRoutes);

// Ruta principal que sirve el HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});