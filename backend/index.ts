const express = require ("express");
const cors = require ("cors");
const bodyparser = require ("body-parser");
const path = require ("path");
const tasksRoutes = require("./src/routes/tasks-routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
})