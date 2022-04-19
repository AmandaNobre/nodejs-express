const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const contas = [];

// Midleware
function verifyIfExistsAccount(request, response, next) {
  const { cpf } = request.headers;
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

//Inserir deposito
app.post("/deposito", verifyIfExistsAccount, (request, response) => {
  const { descricao, valor } = request.body;

  const { conta } = request

  const operacao = {
    descricao,
    valor,
    dataCriacao: new Date(),
    tipo: "credito"
  }

  conta.acoes.push(operacao)

  return response.status(200).send()
})

// buscar extrato bancario
app.get("/extrato", verifyIfExistsAccount, (request, response) => {
  const { conta } = request
  return response.json(conta.acoes);
});

// buscar extrato bancario por data
app.get("/extrato/data", verifyIfExistsAccount, (request, response) => {
  const { conta } = request
  const { data } = request.query

  const dataFormat = new Date(data + " 00:00")
  const contaFiltro = conta.acoes.filter(conta => conta.dataCriacao.toDataString() === new Date((dataFormat).toDateString()))
  return response.json(contaFiltro);
});

//buscar conta
app.get("/conta", verifyIfExistsAccount, (request, response) => {
  const { conta } = request
  return response.json(conta)
})

//editar conta
app.put("/conta", verifyIfExistsAccount, (request, response) => {
  const { nome } = request.body
  const { conta } = request

  conta.nome = nome

  return response.status(201).send()
})

//deletar conta
app.delete("/conta", verifyIfExistsAccount, (request, response) => {
  const [conta] = request
  contas.slice(conta, 1)
  response.status(204)
})

// todas as rotas usam o Midleware
// app.use(verifyIfExistsAccount)

app.listen(3333);
