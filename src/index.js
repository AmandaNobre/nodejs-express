const express = require("express");

const app = express();
app.use(express.json);

// request.params retorna os parâmetros
// request,query retorna os query, serve para paginação ou filtro
// request.body retorna o body

app.get("/cursos", (request, response) => {
  return response.json(["curso1", "curso2", "curso3"]);
});

app.post("/cursos", (request, response) => {
  const { body } = request.body;
  return response.json(["curso1", "curso2", "curso3", "curso4"]);
});

app.put("/cursos/:id", (request, response) => {
  return response.json(["curso5", "curso2", "curso3", "curso4"]);
});

app.patch("/cursos/:id", (request, response) => {
  return response.json(["curso5", "curso7", "curso3", "curso4"]);
});

app.delete("/cursos/:id", (request, response) => {
  return response.json(["curso5", "curso2", "curso4"]);
});

app.listen(3333);
