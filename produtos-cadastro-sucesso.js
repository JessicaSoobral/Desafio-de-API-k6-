import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const EMAIL = 'fulano@qa.com';
  const PASSWORD = 'teste';
  const PRODUTO = `${Math.random()}test`;

  //Login e obter token de acesso
  const loginResponse = http.post(`${BASE_URL}/login`, {
    email: EMAIL,
    password: PASSWORD,
  });

  const token = loginResponse.json('authorization');

  //Cadastrar um novo produto

  const payload = {
    nome: PRODUTO,
    preco: 100,
    descricao: 'Descrição do Produto',
    quantidade: 10,
  };

  // Token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const cadastrosucesso = http.post(`${BASE_URL}/produtos`, JSON.stringify(payload), { headers });
  check(cadastrosucesso, {
    'Cadastro status code 201': (r) => r.status === 201,
    'Cadastro sucesso': (r) => r.body.includes("Cadastro realizado com sucesso"),
  });

}