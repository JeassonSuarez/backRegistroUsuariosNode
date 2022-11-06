import express from "express";
import cors from "cors";
import usuariosRoutes from "./Routes/usuarios.routes.js";
import { PORT } from './config.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(usuariosRoutes);

app.listen(PORT | 3000);
console.log('server up port', PORT);