import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const ID_PRODUTO = 'BeeJh5lz3k6kSIzA';
  const EMAIL = 'fulano@qa.com';
  const PASSWORD = 'teste';
  const NOME = `${Math.random()}test`;


  //Login e obter token de acesso
  const loginResponse = http.post(`${BASE_URL}/login`, {
    email: EMAIL,
    password: PASSWORD,
  });

  const token = loginResponse.json('authorization');

  // token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  // Dados do produto a serem atualizados
  const produtoAtualizado = {
    nome: NOME,
    preco: 470,
    descricao: 'Mouse',
    quantidade: 381
  };

  // Enviar o pedido PUT para editar o produto
  const response = http.put(`${BASE_URL}/produtos/${ID_PRODUTO}`, JSON.stringify(produtoAtualizado), { headers });

  console.log('Resposta da requisição:', response.body);

  check(response, {
    'Status code 201 ': (r) => r.status === 201,
    'Registro alterado com sucesso': (r) => JSON.parse(r.body).message === 'Cadastro realizado com sucesso',
  });
}
