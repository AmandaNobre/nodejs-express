const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const contas = [];

//cadastrar conta
// confirm, nome, id, statement
app.post("/conta", (request, response) => {
  const { cpf, nome } = request.body;

  const cpfExiste = contas.some((contas) => contas.cpf === cpf);

  if (cpfExiste) {
    return response.status(400).json({ error: "Cpf já existente" });
  }

  contas.push({
    id: uuidV4(),
    cpf,
    nome,
    acoes: [],
  });

  return response.status(201).send();
});

app.listen(3333);
