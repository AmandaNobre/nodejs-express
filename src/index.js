const { request } = require("express");
const { response } = require("express");
const express = require("express");

const app = express();

app.get("/cursos", (request, response) => {
  return response.json(["curso1", "curso2", "curso3"]);
});

app.post("/cursos", (request, response) => {
  return response.json(["curso1", "curso2", "curso3", "curso4"]);
});

app.put("/cursos/:id", (request, response) => {
  return response.json(["curso5", "curso2", "curso3", "curso4"]);
});

app.patch("/cursos/:id", (request, responde) => {
  return response.json(["curso5", "curso7", "curso3", "curso4"]);
});

app.delete("/cursos/:id", (request, response) => {
  return response.json(["curso5", "curso2", "curso4"]);
});

//Porta que inicia o projeto.
app.listen(3333);
