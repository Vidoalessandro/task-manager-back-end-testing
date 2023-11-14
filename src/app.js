import express from "express";
import { v4 } from "uuid";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.post("/tasks", (req, res) => {
  const { titulo, descripcion } = req.body;

  if(!titulo || !descripcion) return res.sendStatus(400);

  res.json({
    titulo,
    descripcion,
    id: v4(),
  });
});

export default app;
