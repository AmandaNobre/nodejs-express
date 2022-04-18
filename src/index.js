const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const contas = [];

//cadastrar conta
// confirm, nome, id, acoes
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

// buscar extrato bancario
app.get("/extrato/:cpf", (request, response) => {
  const { cpf } = request.params;
  const conta = contas.find((conta) => conta.cpf === cpf);

  if (!conta) {
    console.log(contas, "a");
    return response.status(400).json({ error: "Não encontrado" });
  }

  return response.json(conta.acoes);
});

app.listen(3333);
