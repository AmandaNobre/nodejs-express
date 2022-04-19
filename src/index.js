const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const contas = [];

// Midleware
function verifyIfExistsAccount(request, response, next) {
  const { cpf } = request.params;
  const conta = contas.find((conta) => conta.cpf === cpf);

  if (!conta) {
    return response.status(400).json({ error: "Não encontrado" });
  }

  request.conta = conta
  return next()
}

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
app.get("/extrato/:cpf", verifyIfExistsAccount, (request, response) => {
  const { conta } = request
  return response.json(conta.acoes);
});

// todas as rotas usam o Midleware
// app.use(verifyIfExistsAccount)

app.listen(3333);
